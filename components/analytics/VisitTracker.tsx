"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const logVisit = async () => {
      // Don't track admin pages or local development if desired
      if (pathname.startsWith("/admin")) return;
      
      try {
        await supabase.from("site_visits").insert({
          path: pathname,
          user_agent: window.navigator.userAgent,
        });
      } catch (error) {
        console.error("Error logging visit:", error);
      }
    };

    logVisit();
  }, [pathname]);

  return null; // Invisible component
}
