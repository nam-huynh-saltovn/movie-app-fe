"use client";
import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

export default function VideoPlayer({ videoUrl }) {
    const videoRef = useRef(null);
    const [qualityLevels, setQualityLevels] = useState([]);
    const [selectedQuality, setSelectedQuality] = useState(null);
    const hlsRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videoUrl);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                const levels = hls.levels.map(level => ({
                    bitrate: level.bitrate,
                    label: `${(level.bitrate / 1000).toFixed(0)} kbps`,
                }));
                setQualityLevels(levels);
                setSelectedQuality(levels[levels.length - 1]); // Set to highest quality by default
            });

            hlsRef.current = hls;

            // Cleanup
            return () => {
                hls.destroy();
            };
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoUrl;
        }
    }, [videoUrl]);

    const playVideo = () => {
        const video = videoRef.current;
        if (video) {
            video.play().catch(error => {
                console.error("Error trying to play video:", error);
            });
        }
    };

    const changeQuality = (bitrate) => {
        if (hlsRef.current) {
            const levelIndex = hlsRef.current.levels.findIndex(level => level.bitrate === bitrate);
            if (levelIndex !== -1) {
                hlsRef.current.currentLevel = levelIndex; // Change quality
                setSelectedQuality(qualityLevels[levelIndex]);
            }
        }
    };

    return (
        <video className='rounded-md border bg-black min-h-[210px] md:min-h-[310px] xl:md:min-h-[510px]' 
        ref={videoRef} autoPlay={true} controls  width="100%" height="100%"/>
    );
}
