import {getAllCompanions} from "@/lib/actions/companion.actions";
import CompanionCard from "@/components/CompanionCard";
import {getCategoryColor} from "@/constants/categories";
import SearchInput from "@/components/SearchInput";
import CategoryFilter from "@/components/CategoryFilter";

interface SearchParams {
    searchParams: Promise<{
        category?: string;
        subject?: string;
        topic?: string;
    }>;
}

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
    const filters = await searchParams;
    const category = filters.category || '';
    const subject = filters.subject || '';
    const topic = filters.topic || '';

    const companions = await getAllCompanions({ category, subject, topic });

    return (
        <main>
            <section className="flex flex-col gap-6 relative">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-info/5 rounded-full blur-3xl -z-10"></div>
                
                <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-5xl font-bold max-sm:text-3xl">Advisor Library</h1>
                        <p className="text-lg text-muted-foreground">Browse and connect with {companions.length} specialized AI advisors</p>
                    </div>
                    <SearchInput />
                </div>
                
                {/* Category Filter */}
                <CategoryFilter />
            </section>
            
            {companions.length > 0 ? (
                <section className="companions-grid">
                    {companions.map((companion) => (
                        <CompanionCard
                            key={companion.id}
                            {...companion}
                            color={getCategoryColor(companion.category || 'academic')}
                        />
                    ))}
                </section>
            ) : (
                <section className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="text-6xl">🔍</div>
                    <h3 className="text-2xl font-bold">No advisors found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
                </section>
            )}
        </main>
    )
}

export default CompanionsLibrary;
