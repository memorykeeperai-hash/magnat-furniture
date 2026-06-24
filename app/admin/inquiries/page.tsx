import { createClient } from "@/lib/supabase-server";
import InquiriesDashboard from "./InquiriesDashboard";

export default async function AdminInquiriesPage() {
  const supabase = await createClient();
  const { data: inquiries } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-4 md:p-10 font-inter max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-2xl font-playfair font-black text-[#111] tracking-tight">Customer Inquiries</h2>
          <p className="text-[10px] text-[#C0001A] uppercase tracking-[0.2em] mt-2 font-bold">Manage and orchestrate all incoming leads</p>
        </div>
      </div>

      <InquiriesDashboard initialInquiries={inquiries || []} />
    </div>
  );
}
