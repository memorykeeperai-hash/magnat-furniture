// Force route refresh
import { createClient } from "@/lib/supabase-server";
import { ShoppingBag, Eye, MessageSquare, Users, ArrowUpRight, ArrowDownRight } from "lucide-react";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch stats in parallel
  const [
    { count: productCount },
    { count: inquiryCount },
    { count: testimonialCount },
    { count: visitCount },
    { data: recentInquiries }
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("inquiries").select("*", { count: "exact", head: true }),
    supabase.from("testimonials").select("*", { count: "exact", head: true }),
    supabase.from("site_visits").select("*", { count: "exact", head: true }),
    supabase.from("inquiries").select("*").order("created_at", { ascending: false }).limit(4)
  ]);

  const stats = [
    { label: "Total Products", value: productCount || 0, icon: "ShoppingBag", change: "Live", isPositive: true },
    { label: "Total Inquiries", value: inquiryCount || 0, icon: "MessageSquare", change: "Live", isPositive: true },
    { label: "Client Views", value: visitCount ? (visitCount >= 1000 ? `${(visitCount / 1000).toFixed(1)}k` : visitCount) : 0, icon: "Eye", change: "Live", isPositive: true },
    { label: "Testimonials", value: testimonialCount || 0, icon: "Users", change: "Live", isPositive: true },
  ];

  return <AdminDashboardClient stats={stats} recentInquiries={recentInquiries || []} />;
}
