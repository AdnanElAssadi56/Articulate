'use client';

import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';

const PricingSection = () => {
  return (
    <section className="flex flex-col gap-8 py-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that fits your needs. Upgrade or cancel anytime.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
        {/* Free Tier */}
        <div className="bg-card/80 backdrop-blur-sm border-2 border-border rounded-2xl p-6 flex flex-col hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-bold mb-2">Free</h3>
          <div className="mb-6">
            <p className="text-4xl font-bold text-primary">$0</p>
            <p className="text-sm text-muted-foreground">Forever free</p>
          </div>
          <ul className="space-y-3 text-sm mb-6 flex-1">
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span>
              <span>5 sessions per month</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span>
              <span>10 minutes max per session</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span>
              <span>Bookmark up to 3 advisors</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span>
              <span>Last 3 conversations saved</span>
            </li>
          </ul>
          <SignedIn>
            <Link href="/companions">
              <button className="w-full border-2 border-primary text-primary font-bold py-3 rounded-lg hover:bg-primary hover:text-white transition-all">
                Browse Advisors
              </button>
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="w-full border-2 border-primary text-primary font-bold py-3 rounded-lg hover:bg-primary hover:text-white transition-all">
                Get Started Free
              </button>
            </SignInButton>
          </SignedOut>
        </div>

        {/* Pro Tier */}
        <div className="bg-gradient-to-br from-primary to-accent text-white rounded-2xl p-6 shadow-xl relative flex flex-col transform scale-105 hover:scale-110 transition-transform">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-warning text-white px-3 py-1 rounded-full text-xs font-bold">
            MOST POPULAR
          </div>
          <h3 className="text-xl font-bold mb-2">Pro</h3>
          <div className="mb-6">
            <p className="text-4xl font-bold">$12.99</p>
            <p className="text-sm opacity-90">per month</p>
          </div>
          <ul className="space-y-3 text-sm mb-6 flex-1">
            <li className="flex items-center gap-2">
              <span>✓</span>
              <span>50 sessions per month</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✓</span>
              <span>20 minutes max per session</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✓</span>
              <span>Create up to 5 custom advisors</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✓</span>
              <span>Unlimited bookmarks</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✓</span>
              <span>Unlimited conversation history</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✓</span>
              <span>Download transcripts</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✓</span>
              <span>AI conversation insights</span>
            </li>
          </ul>
          <Link href="/subscription">
            <button className="w-full bg-white text-primary font-bold py-3 rounded-lg hover:bg-white/90 transition-colors">
              Upgrade to Pro
            </button>
          </Link>
        </div>

        {/* Premium Tier */}
        <div className="bg-card/80 backdrop-blur-sm border-2 border-warning rounded-2xl p-6 flex flex-col hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-bold mb-2">Premium</h3>
          <div className="mb-6">
            <p className="text-4xl font-bold text-primary">$29.99</p>
            <p className="text-sm text-muted-foreground">per month</p>
          </div>
          <ul className="space-y-3 text-sm mb-6 flex-1">
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span>
              <span>Unlimited sessions</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span>
              <span>30 minutes max per session</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span>
              <span>Unlimited custom advisors</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span>
              <span>Advanced analytics dashboard</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span>
              <span>Usage trends and patterns</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span>
              <span>AI-powered recommendations</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-success">✓</span>
              <span>Early access to new features</span>
            </li>
          </ul>
          <Link href="/subscription">
            <button className="w-full bg-gradient-to-r from-primary to-accent text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all">
              Upgrade to Premium
            </button>
          </Link>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-4">
        All plans include access to our AI advisors. Cancel anytime, no questions asked.
      </p>
    </section>
  );
};

export default PricingSection;
