'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const SearchInput = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  // Local state for immediate UI updates
  const [searchValue, setSearchValue] = useState(searchParams.get('topic') || '');

  // Debounce effect - waits 500ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      
      if (searchValue) {
        params.set('topic', searchValue);
      } else {
        params.delete('topic');
      }
      
      // Update URL (triggers server component re-render)
      router.push(`${pathname}?${params.toString()}`);
    }, 500); // 500ms delay
    
    // Cleanup: cancel timer if user types again
    return () => clearTimeout(timer);
  }, [searchValue, searchParams, router, pathname]);

  return (
    <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-gray-200">
      <Image 
        src="/icons/search.svg" 
        alt="search" 
        width={20} 
        height={20}
        className="opacity-50"
      />
      <input
        type="text"
        placeholder="Search by topic or name..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="outline-none bg-transparent flex-1 min-w-[200px]"
      />
      {searchValue && (
        <button 
          onClick={() => setSearchValue('')}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchInput;
