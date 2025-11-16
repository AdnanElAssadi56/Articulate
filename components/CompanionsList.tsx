import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { getCategoryLightColor } from "@/constants/categories";
import Link from "next/link";
import Image from "next/image";
import { Companion } from "@/types";

interface CompanionsListProps {
  title: string;
  companions?: Companion[];
  classNames?: string;
}

const CompanionsList = ({ title, companions, classNames }: CompanionsListProps) => {
  return (
    <article className={cn('companion-list', classNames)}>
      {/* Section Title */}
      <h2 className="font-bold text-3xl">{title}</h2>
      
      {/* Table with companions */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg w-2/3">Advisor</TableHead>
            <TableHead className="text-lg">Specialty</TableHead>
            <TableHead className="text-lg text-right">Duration</TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {companions?.map(({ id, subject, name, topic, duration, category, voice }) => {
            const avatarIcon = voice === 'female' || voice?.includes('female') 
              ? '/icons/female-avatar.svg' 
              : '/icons/male-avatar.svg';
            const lightColor = getCategoryLightColor(category || 'academic');
            
            return (
              <TableRow key={id}>
                {/* Advisor Column - Shows avatar, name, and topic */}
                <TableCell>
                  <Link href={`/companions/${id}`}>
                    <div className="flex items-center gap-3">
                      {/* Avatar with soft category color background */}
                      <div 
                        className="size-[72px] flex items-center justify-center rounded-2xl max-md:hidden shadow-sm" 
                        style={{ backgroundColor: lightColor }}
                      >
                        <Image
                          src={avatarIcon}
                          alt={name}
                          width={48}
                          height={48}
                          className="rounded-full opacity-90"
                        />
                      </div>
                      
                      {/* Advisor Name & Topic */}
                      <div className="flex flex-col gap-2">
                        <p className="font-bold text-2xl">{name}</p>
                        <p className="text-lg opacity-80">{topic}</p>
                      </div>
                    </div>
                  </Link>
                </TableCell>
                
                {/* Subject Column - Badge on desktop, avatar on mobile */}
                <TableCell>
                  {/* Desktop: Text badge */}
                  <div className="subject-badge w-fit max-md:hidden">
                    {subject}
                  </div>
                  
                  {/* Mobile: Avatar only */}
                  <div 
                    className="flex items-center justify-center rounded-xl w-fit p-2 md:hidden shadow-sm" 
                    style={{ backgroundColor: lightColor }}
                  >
                    <Image
                      src={avatarIcon}
                      alt={name}
                      width={28}
                      height={28}
                      className="rounded-full opacity-90"
                    />
                  </div>
                </TableCell>
                
                {/* Duration Column */}
                <TableCell>
                  <div className="flex items-center gap-2 w-full justify-end">
                    <p className="text-2xl">
                      {duration} <span className="max-md:hidden">mins</span>
                    </p>
                    {/* Mobile: Clock icon instead of "mins" text */}
                    <Image 
                      src="/icons/clock.svg" 
                      alt="minutes" 
                      width={14} 
                      height={14} 
                      className="md:hidden" 
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </article>
  );
};

export default CompanionsList;
