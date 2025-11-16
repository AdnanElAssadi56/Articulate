import Link from 'next/link';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { label: 'Advisors', href: '/companions' },
      { label: 'Create Advisor', href: '/companions/new' },
      { label: 'My Journey', href: '/journey' },
    ],
    categories: [
      { label: 'Career', href: '/companions?category=career' },
      { label: 'Wellness', href: '/companions?category=wellness' },
      { label: 'Spiritual', href: '/companions?category=spiritual' },
      { label: 'Academic', href: '/companions?category=academic' },
    ],
  };

  return (
    <footer className="bg-card/80 backdrop-blur-sm border-t-2 border-border mt-20">
      <div className="max-w-[1400px] mx-auto px-14 py-12 max-sm:px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Logo />
            <p className="text-muted-foreground mt-4 max-w-md">
              Your personal AI advisory council. Get expert guidance across career, wellness, spiritual, and academic domains through natural voice conversations.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-bold mb-4">Product</h3>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              {links.categories.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Articulate. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
