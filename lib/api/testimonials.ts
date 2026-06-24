import { createClient } from "@/lib/supabase";
import { Testimonial } from "@/lib/types";

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    client_name: "Abdul Rahman",
    client_role: "Kondotty",
    quote: "The signature sofa we commissioned has become the heart of our home. The craftsmanship and attention to structural detail is exceptional.",
    rating: 5,
    is_active: true,
    sort_order: 0,
    created_at: new Date().toISOString(),
    client_image: null,
  },
  {
    id: "2",
    client_name: "Sana Fathima",
    client_role: "Calicut",
    quote: "Working with Magnat for our full interior project was a masterclass in professional design. Their curtains collection is truly premier.",
    rating: 5,
    is_active: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
    client_image: null,
  },
  {
    id: "3",
    client_name: "Rishi Kumar",
    client_role: "Malappuram",
    quote: "A 25-year legacy you can truly feel in the product. The quality is a cut above any international brand I've seen in Kerala.",
    rating: 5,
    is_active: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
    client_image: null,
  },
  {
    id: "4",
    client_name: "Faisal Mohammed",
    client_role: "Kozhikode",
    quote: "Every piece is crafted with intention. Our dining set is a statement of elegance that our guests consistently admire.",
    rating: 5,
    is_active: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
    client_image: null,
  },
  {
    id: "5",
    client_name: "Priya Nair",
    client_role: "Thrissur",
    quote: "Magnat's design team understood our vision immediately. The curtains transformed our living space beyond expectation.",
    rating: 5,
    is_active: true,
    sort_order: 4,
    created_at: new Date().toISOString(),
    client_image: null,
  },
  {
    id: "6",
    client_name: "Arjun Menon",
    client_role: "Kochi",
    quote: "The attention to detail in every stitch and joint is remarkable. Truly furniture built to be passed down generations.",
    rating: 5,
    is_active: true,
    sort_order: 5,
    created_at: new Date().toISOString(),
    client_image: null,
  },
];

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return FALLBACK_TESTIMONIALS;
    }
    return data;
  } catch (err) {
    return FALLBACK_TESTIMONIALS;
  }
}
