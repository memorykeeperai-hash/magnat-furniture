"use client";

import { usePathname } from "next/navigation";

interface AdminExclusionWrapperProps {
  children: React.ReactNode;
}

/**
 * A wrapper component that hides its children if the current route is an admin route.
 * This ensures public UI elements (Navbar, Footer, Widgets) don't leak into the Admin Dashboard.
 */
export default function AdminExclusionWrapper({ children }: AdminExclusionWrapperProps) {
  const pathname = usePathname();
  
  // Do not render children on any admin route
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  
  return <>{children}</>;
}
