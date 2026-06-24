import { createClient } from "@/lib/supabase";
import { ClientLogo } from "@/lib/types";

const FALLBACK_CLIENT_LOGOS: ClientLogo[] = [
  { id: "1", name: "PRESTIGE INTERIORS", logo_url: "", sort_order: 0, is_active: true },
  { id: "2", name: "HILTON GROUP", logo_url: "", sort_order: 1, is_active: true },
  { id: "3", name: "OBEROI HOTELS", logo_url: "", sort_order: 2, is_active: true },
  { id: "4", name: "KOCHI METRO", logo_url: "", sort_order: 3, is_active: true },
  { id: "5", name: "LULU MALL", logo_url: "", sort_order: 4, is_active: true },
  { id: "6", name: "GRAND HYATT", logo_url: "", sort_order: 5, is_active: true },
  { id: "7", name: "MARRIOTT INTERNATIONAL", logo_url: "", sort_order: 6, is_active: true },
];

export async function getClientLogos(): Promise<ClientLogo[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("client_logos")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return FALLBACK_CLIENT_LOGOS;
    }
    return data;
  } catch (err) {
    return FALLBACK_CLIENT_LOGOS;
  }
}
