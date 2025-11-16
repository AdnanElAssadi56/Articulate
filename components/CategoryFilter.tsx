'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { CATEGORIES } from '@/constants/categories';
import { cn } from '@/lib/utils';

const CategoryFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const currentCategory = searchParams.get('category') || 'all';

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (category && category !== 'all') {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-3 flex-wrap">
      <button
        onClick={() => handleCategoryChange('all')}
        className={cn(
          'px-5 py-2.5 rounded-lg border-2 transition-all font-medium text-sm',
          currentCategory === 'all'
            ? 'bg-primary text-white border-primary shadow-md'
            : 'bg-card border-border hover:border-primary hover:shadow-sm'
        )}
      >
        All Categories
      </button>
      {CATEGORIES.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryChange(category.id)}
          className={cn(
            'px-5 py-2.5 rounded-lg border-2 transition-all flex items-center gap-2 font-medium text-sm',
            currentCategory === category.id
              ? 'text-white border-transparent shadow-md'
              : 'bg-card border-border hover:shadow-sm'
          )}
          style={{
            backgroundColor: currentCategory === category.id ? category.color : undefined,
            borderColor: currentCategory === category.id ? category.color : undefined,
          }}
        >
          <span className="text-base">{category.icon}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
