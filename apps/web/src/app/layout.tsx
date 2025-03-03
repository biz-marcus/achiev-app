import type { Metadata, Viewport } from "next";
import { Toaster } from "@/components/ui/sonner";
import { geistMono, geistSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Providers } from "@/providers/providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "Achiev - AI Career Coach",
  description: "Your AI-powered career strategist for professional growth and development.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#10b981", // Emerald 500
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={cn(
          "min-h-screen bg-white font-sans antialiased",
          geistMono.variable,
          geistSans.variable,
        )}
      >
        <Providers attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
