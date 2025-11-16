import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  getUserCompanions,
  getUserSessions,
  getBookmarkedCompanions,
} from "@/lib/actions/companion.actions";
import Image from "next/image";
import CompanionsList from "@/components/CompanionsList";
import AdvancedAnalytics from "@/components/AdvancedAnalytics";
import SavedConversations from "@/components/SavedConversations";

const Profile = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getUserSessions(user.id);
  const bookmarkedCompanions = await getBookmarkedCompanions(user.id);

  return (
    <main className="min-lg:w-3/4">
      <section className="flex justify-between gap-4 max-sm:flex-col items-center">
        <div className="flex gap-4 items-center">
          <Image
            src={user.imageUrl}
            alt={user.firstName!}
            width={110}
            height={110}
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
        <div className="flex gap-4 max-sm:w-full">
          <div className="border-2 border-border rounded-xl p-4 gap-2 flex flex-col h-fit bg-card shadow-sm hover:shadow-md transition-shadow flex-1">
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Image
                  src="/icons/check.svg"
                  alt="checkmark"
                  width={20}
                  height={20}
                />
              </div>
              <p className="text-3xl font-bold text-primary">{sessionHistory.length}</p>
            </div>
            <div className="text-sm text-muted-foreground font-medium">Sessions completed</div>
          </div>
          <div className="border-2 border-border rounded-xl p-4 gap-2 flex flex-col h-fit bg-card shadow-sm hover:shadow-md transition-shadow flex-1">
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Image src="/icons/cap.svg" alt="cap" width={20} height={20} />
              </div>
              <p className="text-3xl font-bold text-primary">{companions.length}</p>
            </div>
            <div className="text-sm text-muted-foreground font-medium">Advisors created</div>
          </div>
        </div>
      </section>
      {/* Premium Features */}
      <section className="space-y-6">
        <AdvancedAnalytics />
        <SavedConversations />
      </section>

      <Accordion type="multiple">
        <AccordionItem value="bookmarks">
          <AccordionTrigger className="text-2xl font-bold">
            Bookmarked Advisors {`(${bookmarkedCompanions.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList
              companions={bookmarkedCompanions as any}
              title="Bookmarked Advisors"
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="recent">
          <AccordionTrigger className="text-2xl font-bold">
            Recent Sessions
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList
              title="Recent Sessions"
              companions={sessionHistory}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="companions">
          <AccordionTrigger className="text-2xl font-bold">
            My Advisors {`(${companions.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList title="My Advisors" companions={companions} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
};
export default Profile;