import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";
import QuickActions from "@/components/QuickActions";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Articulate - Your AI Advisory Council",
  description: "Connect with specialized AI advisors for career, wellness, spiritual, and academic guidance through natural voice conversations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${bricolage.variable} antialiased`}>
          <ScrollProgress />
          <Navbar />
          {children}
          <Footer />
          <QuickActions />
        </body>
      </html>
    </ClerkProvider>
  );
}
