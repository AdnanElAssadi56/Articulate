'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { useState, useTransition } from "react";
import Logo from "./Logo";

const navItems = [
  { label: 'Advisors', href: '/companions' },
  { label: 'My Journey', href: '/journey' },
  { label: 'Create Advisor', href: '/companions/new' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [clickedLink, setClickedLink] = useState<string | null>(null);

  const handleNavigation = (href: string) => {
    setClickedLink(href);
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <>
      <nav className="navbar sticky top-0 z-50 backdrop-blur-md bg-background/95 border-b border-border/40">
        <div className="flex items-center gap-8">
          <Logo />
          
          <div className="hidden md:flex items-center gap-6">
            {navItems.map(({ label, href }) => (
              <button
                onClick={() => handleNavigation(href)}
                key={label}
                className={cn(
                  'hover:text-primary transition-colors flex items-center gap-2',
                  pathname === href && 'text-primary font-semibold'
                )}
                disabled={isPending && clickedLink === href}
              >
                {isPending && clickedLink === href && (
                  <span className="animate-spin text-xs">⏳</span>
                )}
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="/subscription" 
            className={cn(
              'hidden sm:block hover:text-primary transition-colors',
              pathname === '/subscription' && 'text-primary font-semibold'
            )}
          >
            Pricing
          </Link>
          
          {/* Show Sign In button when logged out */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn-signin">
                <span>Sign In</span>
              </button>
            </SignInButton>
          </SignedOut>
          
          {/* Show User button when logged in */}
          <SignedIn>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10"
                }
              }}
            />
          </SignedIn>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div 
        className={cn(
          'fixed top-0 right-0 h-full w-[280px] bg-card shadow-2xl z-50 md:hidden transition-transform duration-300 ease-in-out',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <Logo />
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <nav className="flex flex-col gap-2">
              {navItems.map(({ label, href }) => (
                <button
                  onClick={() => {
                    handleNavigation(href);
                    setMobileMenuOpen(false);
                  }}
                  key={label}
                  className={cn(
                    'px-4 py-3 rounded-lg hover:bg-muted transition-colors text-left flex items-center gap-2',
                    pathname === href && 'bg-primary/10 text-primary font-semibold'
                  )}
                >
                  {isPending && clickedLink === href && (
                    <span className="animate-spin text-xs">⏳</span>
                  )}
                  {label}
                </button>
              ))}
              <Link 
                href="/subscription" 
                className={cn(
                  'px-4 py-3 rounded-lg hover:bg-muted transition-colors',
                  pathname === '/subscription' && 'bg-primary/10 text-primary font-semibold'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="p-6 border-t border-border">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="btn-signin w-full justify-center">
                  <span>Sign In</span>
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-3 p-3">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10"
                    }
                  }}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Account</span>
                  <span className="text-xs text-muted-foreground">Click avatar for options</span>
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </>
  );
}
