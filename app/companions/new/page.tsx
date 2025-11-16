import CompanionForm from "@/components/CompanionForm";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {newCompanionPermissions} from "@/lib/actions/companion.actions";
import Link from "next/link";

const NewCompanion = async () => {
    const { userId } = await auth();
    if(!userId) redirect('/sign-in');

    const canCreateCompanion = await newCompanionPermissions();

    return (
        <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
            {canCreateCompanion ? (
                <article className="w-full gap-4 flex flex-col">
                    <h1>Create Your AI Advisor</h1>
                    <p className="text-muted-foreground">Design a personalized AI advisor with custom voice, personality, and expertise.</p>

                    <CompanionForm />
                </article>
            ) : (
                <article className="w-full flex flex-col items-center gap-8 py-12 max-w-2xl mx-auto">
                    {/* Icon */}
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <span className="text-6xl">🔒</span>
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold text-sm shadow-lg">
                            0
                        </div>
                    </div>

                    {/* Message */}
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold">Limit Reached</h1>
                        <p className="text-lg text-muted-foreground max-w-md">
                            You've reached your custom advisor limit. Upgrade your plan to create more personalized AI advisors.
                        </p>
                    </div>

                    {/* What You're Missing */}
                    <div className="w-full bg-card/50 backdrop-blur-sm border-2 border-primary/20 rounded-2xl p-8 space-y-6">
                        <h3 className="text-xl font-semibold text-center">Unlock Custom Advisors</h3>
                        <div className="grid gap-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <span className="text-xl">🎨</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Personalize Everything</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Choose voice, personality, expertise, and conversation style
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                                    <span className="text-xl">🧠</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Specialized Knowledge</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Create advisors for niche topics and specific use cases
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
                                    <span className="text-xl">🚀</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Share Your Creations</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Share your custom advisors with others or keep them private
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col gap-4 w-full">
                        <Link href="/subscription" className="w-full">
                            <button className="btn-primary w-full justify-center text-base">
                                Upgrade to Create Custom Advisors
                            </button>
                        </Link>
                        <Link href="/companions" className="w-full">
                            <button className="w-full justify-center text-base border-2 border-border hover:border-primary bg-transparent hover:bg-muted text-foreground rounded-xl px-6 py-3 font-semibold transition-all flex items-center gap-2">
                                <span>←</span>
                                <span>Continue with Pre-Built Advisors</span>
                            </button>
                        </Link>
                    </div>

                    <p className="text-xs text-muted-foreground text-center">
                        Free: 5 advisors • Pro: 20 advisors • Premium: Unlimited
                    </p>
                </article>
            )}
        </main>
    )
}

export default NewCompanion
