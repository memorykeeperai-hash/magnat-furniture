"use client";

import { usePathname } from "next/navigation";

interface MainContentWrapperProps {
  children: React.ReactNode;
}

/**
 * A wrapper component that applies conditional top padding to the main content area.
 * It removes the padding on admin routes to prevent an unwanted white gap.
 */
export default function MainContentWrapper({ children }: MainContentWrapperProps) {
  const pathname = usePathname();

  // Check if we are on an admin route
  const isAdmin = pathname?.startsWith("/admin");

  // Padding is only needed for public pages to clear the fixed navbar
  const paddingClasses = isAdmin ? "" : "pt-[136px] md:pt-[80px]";

  return (
    <main className={`flex-1 ${paddingClasses}`}>
      {children}
    </main>
  );
}
