import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { PricingTable } from '@clerk/nextjs';

const SubscriptionPage = async () => {
  const user = await currentUser();
  
  if (!user) redirect('/sign-in');

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold border border-primary/20">
              💎 Premium Plans
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock unlimited advisors and sessions with our premium plans
          </p>
        </div>

        <div className="clerk-pricing-wrapper">
          <PricingTable 
            for="user"
            ctaPosition="bottom"
            collapseFeatures={false}
            newSubscriptionRedirectUrl="/companions"
            appearance={{
              elements: {
                rootBox: 'w-full max-w-7xl mx-auto',
                pricingCardContainer: 'grid grid-cols-1 md:grid-cols-3 gap-6 w-full',
              card: 'relative bg-card/90 backdrop-blur-sm border-2 border-border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 p-6 flex flex-col overflow-visible',
                cardPriceText: 'text-4xl font-bold text-primary',
                cardPriceCurrency: 'text-primary text-xl',
                cardButton: 'w-full bg-primary text-white font-bold py-3 px-5 rounded-xl hover:bg-primary-dark hover:shadow-xl transition-all duration-200 hover:scale-105 mt-auto',
                cardButtonText: 'font-semibold text-sm',
                badge: 'absolute -top-3 left-1/2 -translate-x-1/2 bg-warning text-white font-bold px-3 py-1.5 rounded-full text-xs shadow-lg z-10',
                featureListItem: 'text-foreground py-1.5 flex items-center gap-2 text-sm hover:text-primary transition-colors',
                featureListItemIcon: 'text-success text-base flex-shrink-0',
                featureListItemText: 'flex-1 text-sm',
                planName: 'text-xl font-bold text-foreground mb-2',
                planDescription: 'text-muted-foreground text-xs mb-4',
                planPrice: 'mb-4',
                featureList: 'flex flex-col space-y-1 mb-6 flex-1',
                cardHeader: 'relative',
              },
              variables: {
                colorPrimary: '#0ea5e9',
                colorBackground: '#ffffff',
                colorText: '#0f172a',
                colorTextSecondary: '#64748b',
                colorSuccess: '#10b981',
                colorDanger: '#ef4444',
                colorWarning: '#f59e0b',
                borderRadius: '1rem',
                fontFamily: '"Bricolage Grotesque", sans-serif',
                fontSize: '16px',
              }
            }}
            checkoutProps={{
              appearance: {
                variables: {
                  colorPrimary: '#0ea5e9',
                  fontFamily: '"Bricolage Grotesque", sans-serif',
                }
              }
            }}
          />
        </div>

        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm">
          <div className="flex items-center gap-2 bg-success/5 px-4 py-2 rounded-lg border border-success/20">
            <span className="text-success text-xl">✓</span>
            <span className="text-foreground font-medium">Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-lg border border-primary/20">
            <span className="text-primary text-xl">🔒</span>
            <span className="text-foreground font-medium">Secure payments</span>
          </div>
          <div className="flex items-center gap-2 bg-accent/5 px-4 py-2 rounded-lg border border-accent/20">
            <span className="text-accent text-xl">⚡</span>
            <span className="text-foreground font-medium">Instant access</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SubscriptionPage;
