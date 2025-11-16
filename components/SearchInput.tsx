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
    <div className="flex items-center gap-3 bg-card rounded-lg px-4 py-2.5 border-2 border-border hover:border-accent transition-colors shadow-sm">
      <Image 
        src="/icons/search.svg" 
        alt="search" 
        width={18} 
        height={18}
        className="opacity-60"
      />
      <input
        type="text"
        placeholder="Search advisors..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="outline-none bg-transparent flex-1 min-w-[200px] text-sm placeholder:text-muted-foreground"
      />
      {searchValue && (
        <button 
          onClick={() => setSearchValue('')}
          className="text-muted-foreground hover:text-foreground transition-colors font-bold"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchInput;
