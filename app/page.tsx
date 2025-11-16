import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AnimatedStats from "@/components/AnimatedStats";
import HowItWorks from "@/components/HowItWorks";
import RecentAdvisors from "@/components/RecentAdvisors";
import PricingSection from "@/components/PricingSection";
import {getAllCompanions, getRecentSessions} from "@/lib/actions/companion.actions";
import {getCategoryColor} from "@/constants/categories";
import Link from "next/link";
import { Companion } from "@/types";

const Page = async () => {
    const companionsData = await getAllCompanions({ limit: 3 });
    const companions = (Array.isArray(companionsData) ? companionsData : []) as Companion[];
    const recentSessionsData = await getRecentSessions(10);
    // Flatten the array if it's nested
    const recentSessionsCompanions = (Array.isArray(recentSessionsData) 
      ? recentSessionsData.flat().filter(Boolean) 
      : []) as Companion[];

  return (
    <main>
      {/* Hero Section with Visual Elements */}
      <section className="relative flex flex-col gap-8 py-16 max-sm:py-8 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-highlight/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="flex flex-col gap-6 max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full w-fit text-sm font-semibold border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            AI-Powered Voice Conversations
          </div>
          
          <h1 className="text-7xl font-bold max-sm:text-4xl leading-tight">
            Your Personal
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              AI Advisory Council
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl max-sm:text-base leading-relaxed">
            Connect with specialized AI advisors across <span className="font-semibold" style={{ color: '#2563eb' }}>Career</span>, <span className="font-semibold" style={{ color: '#16a34a' }}>Wellness</span>, <span className="font-semibold" style={{ color: '#9333ea' }}>Spiritual</span>, and <span className="font-semibold" style={{ color: '#ea580c' }}>Academic</span> domains. 
            Get personalized guidance through natural voice conversations.
          </p>
          
          <div className="flex gap-4 mt-4 max-sm:flex-col max-sm:w-full">
            <Link href="/companions" className="max-sm:w-full">
              <button className="btn-primary text-base px-8 py-4 max-sm:w-full max-sm:justify-center shadow-lg hover:shadow-xl">
                <span>Explore Advisors</span>
                <span className="text-xl">→</span>
              </button>
            </Link>
            <Link href="/companions/new" className="max-sm:w-full">
              <button className="border-2 border-primary rounded-lg px-8 py-4 text-base font-medium hover:bg-primary hover:text-white transition-all duration-200 max-sm:w-full shadow-md hover:shadow-lg">
                Create Your Own
              </button>
            </Link>
          </div>
        </div>

        {/* Animated Stats Section */}
        <AnimatedStats />
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Category Showcase */}
      <section className="flex flex-col gap-6">
        <div className="flex justify-between items-end max-sm:flex-col max-sm:items-start max-sm:gap-2">
          <div>
            <h2 className="text-3xl font-bold">Featured Advisors</h2>
            <p className="text-muted-foreground mt-1">Start your journey with our top-rated advisors</p>
          </div>
          <Link href="/companions" className="text-accent font-medium hover:underline flex items-center gap-1">
            View All <span>→</span>
          </Link>
        </div>
        <div className="companions-grid">
            {companions.map((companion) => (
                <CompanionCard
                    key={companion.id}
                    {...companion}
                    color={getCategoryColor(companion.category || 'academic')}
                    bookmarked={companion.bookmarked || false}
                />
            ))}
        </div>
      </section>

      {/* Recent Advisors & Sessions */}
      <section className="grid md:grid-cols-3 gap-6">
        <RecentAdvisors />
        {recentSessionsCompanions.length > 0 && (
          <div className="md:col-span-2">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Recent Sessions</h2>
              <p className="text-muted-foreground text-sm mt-1">Continue where you left off</p>
            </div>
            <CompanionsList
                title=""
                companions={recentSessionsCompanions}
                classNames="w-full"
            />
          </div>
        )}
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <CTA />
    </main>
  )
}

export default Page