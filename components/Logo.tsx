import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative">
        {/* Icon */}
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" 
              fill="white"
              opacity="0.3"
            />
            <path 
              d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" 
              fill="white"
            />
            <circle cx="12" cy="12" r="2" fill="white"/>
          </svg>
        </div>
        {/* Pulse effect */}
        <div className="absolute inset-0 w-10 h-10 bg-primary rounded-xl animate-ping opacity-20"></div>
      </div>
      
      {/* Text */}
      <div className="flex flex-col">
        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Articulate
        </span>
        <span className="text-[10px] text-muted-foreground -mt-1 tracking-wider">
          AI ADVISORY
        </span>
      </div>
    </Link>
  );
};

export default Logo;
