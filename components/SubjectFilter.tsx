'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { SUBJECTS } from '@/constants';

const SubjectFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const currentSubject = searchParams.get('subject') || '';

  const handleSubjectChange = (subject: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (subject && subject !== 'all') {
      params.set('subject', subject);
    } else {
      params.delete('subject');
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      value={currentSubject}
      onChange={(e) => handleSubjectChange(e.target.value)}
      className="px-4 py-2 rounded-lg border border-gray-200 bg-white outline-none cursor-pointer"
    >
      <option value="all">All Subjects</option>
      {SUBJECTS.map((subject) => (
        <option key={subject} value={subject}>
          {subject}
        </option>
      ))}
    </select>
  );
};

export default SubjectFilter;
