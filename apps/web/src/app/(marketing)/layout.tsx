import { Header } from "@/components/layout/header";
import { cn } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
