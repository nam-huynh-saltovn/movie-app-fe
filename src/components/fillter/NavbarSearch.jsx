"use client";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function NavbarSearch() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query')||'');

  return (
    <div className="ml-[10px] rounded-lg">
      <form method="GET" action="/movie/search">
        <input
          id="search"
          name="query"
          type="text"
          placeholder="Tìm kiếm phim..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          className="w-[200px] sm:w-[400px] block rounded-3xl border-0 py-[4px] 3xl:py-[10px] px-5 sm:px-7 bg-[#374151] text-white placeholder:text-gray-400 text-[10px] sm:text-[14px] xl:text-[15px] 3xl:text-[20px] sm:leading-6"
        />
        <input type="hidden" value={1} name="page" />
      </form>
    </div>
  );
}
