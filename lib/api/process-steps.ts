import { createClient } from "@/lib/supabase";
import { ProcessStep } from "@/lib/types";

const FALLBACK_PROCESS_STEPS: ProcessStep[] = [
  {
    id: "1",
    step_number: "01",
    label: "Design & Selection",
    title: "Crafting Your Vision",
    description: "Our designers sit with you to understand your space, lifestyle, and aesthetic — translating ideas into detailed blueprints.",
    tag: "Expert Design",
    image_url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
    sort_order: 0,
  },
  {
    id: "2",
    step_number: "02",
    label: "Material Sourcing",
    title: "Only the Finest Materials",
    description: "Premium timber, imported fabrics and precision hardware — handpicked from trusted global suppliers for every project.",
    tag: "Top Quality",
    image_url: "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?q=80&w=800&auto=format&fit=crop",
    sort_order: 1,
  },
  {
    id: "3",
    step_number: "03",
    label: "Artisan Craftsmanship",
    title: "Built by Master Hands",
    description: "Each piece is hand-cut, joined and finished in our Kondotty workshop — with decades of expertise guiding every detail.",
    tag: "Handcrafted",
    image_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
    sort_order: 2,
  },
  {
    id: "4",
    step_number: "04",
    label: "White Glove Delivery",
    title: "Delivered with Care",
    description: "We deliver, install, and position every piece personally — your satisfaction is the final signature on every project.",
    tag: "5-Star Service",
    image_url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop",
    sort_order: 3,
  },
];

export async function getProcessSteps(): Promise<ProcessStep[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("process_steps")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return FALLBACK_PROCESS_STEPS;
    }
    return data;
  } catch (err) {
    return FALLBACK_PROCESS_STEPS;
  }
}
