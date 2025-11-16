import {getCompanion} from "@/lib/actions/companion.actions";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getCategoryLightColor, getCategoryColor, getCategoryById} from "@/constants/categories";
import Image from "next/image";
import CompanionComponent from "@/components/CompanionComponent";

interface CompanionSessionPageProps {
    params: Promise<{ id: string}>;
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
    const { id } = await params;
    const companion = await getCompanion(id);
    const user = await currentUser();

    const { name, subject, topic, duration, category, voice } = companion;

    if(!user) redirect('/sign-in');
    if(!name) redirect('/companions')

    const lightColor = getCategoryLightColor(category || 'academic');
    const categoryColor = getCategoryColor(category || 'academic');
    const categoryInfo = getCategoryById(category || 'academic');
    
    // Get avatar icon
    const avatarIcon = voice === 'female' || voice?.includes('female') 
        ? '/icons/female-avatar.svg' 
        : '/icons/male-avatar.svg';

    return (
        <main>
            <article className="flex rounded-border justify-between p-6 max-md:flex-col bg-card/80 backdrop-blur-sm shadow-lg">
                <div className="flex items-center gap-4">
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

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <p className="font-bold text-2xl">
                                {name}
                            </p>
                            <div 
                                className="category-badge max-sm:hidden" 
                                style={{ backgroundColor: categoryColor }}
                            >
                                {categoryInfo?.icon} {categoryInfo?.name.split(' ')[0]}
                            </div>
                        </div>
                        <p className="text-base text-muted-foreground">{topic}</p>
                        <div className="subject-badge w-fit">{subject}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xl max-md:hidden text-muted-foreground">
                    <Image src="/icons/clock.svg" alt="duration" width={20} height={20} />
                    {duration} minutes
                </div>
            </article>

            <CompanionComponent
                {...companion}
                companionId={id}
                userName={user.firstName!}
                userImage={user.imageUrl!}
            />
        </main>
    )
}

export default CompanionSession