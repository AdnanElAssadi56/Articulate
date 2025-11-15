'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const navItems = [
  { label: 'Coaches', href: '/companions' },
  { label: 'My Journey', href: '/journey' },
  { label: 'Create Coach', href: '/new' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-2xl font-bold hover:text-primary transition-colors">
          Articulate
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          {navItems.map(({ label, href }) => (
            <Link
              href={href}
              key={label}
              className={cn(
                'hover:text-primary transition-colors',
                pathname === href && 'text-primary font-semibold'
              )}
            >
              {label}
            </Link>
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
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        <button className="md:hidden p-2 hover:text-primary transition-colors">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
}
