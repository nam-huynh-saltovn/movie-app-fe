"use client";
import { IconHome } from '@/components/icon/Icon';
import Link from 'next/link';
import React from 'react';

export default function MovieBreadcrumbs({ data }) {
  return (
    <div className="flex gap-2 items-center text-gray-300 text-sm mb-4">
        <IconHome />
        <Link href="/" className="text-[12px] sm:text-[14px] 3xl:text-[18px]">Trang chủ</Link>
        <span className="text-[12px] sm:text-[14px] 3xl:text-[18px]">{data?">":''}</span>
        <span className="font-bold text-[12px] sm:text-[14px] 3xl:text-[18px]">{data?data:''}</span>
    </div>
  )
}
