import SectionHeading from "@/components/ui/SectionHeading";
import FadeInView from "@/components/ui/FadeInView";

export const metadata = {
  title: "Terms of Service",
  description: "Review the terms and conditions governing the use of Magnat Furniture services and website.",
};

const sections = [
  {
    title: "Acceptance of Terms",
    content: "By accessing and using the Magnat Furniture website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please refrain from using our services. These terms apply to all visitors, users, and anyone who accesses our website or purchases our products.",
  },
  {
    title: "Products & Ordering",
    content: "All products displayed on our website represent our current offerings. While we strive for accuracy, product colors, textures, and dimensions may vary slightly due to photographic limitations and the natural properties of premium materials. Prices are subject to change without prior notice. Custom and bespoke orders are subject to separate design agreements that will be provided at the time of consultation.",
  },
  {
    title: "Custom & Bespoke Orders",
    content: "Bespoke furniture is made-to-order and is non-refundable once production has begun. A design consultation will be conducted before any custom order is confirmed. Production timelines will be communicated clearly, though delays may occur due to material sourcing or design complexity. We maintain transparent communication throughout the entire process to keep you informed.",
  },
  {
    title: "Delivery & Installation",
    content: "Magnat Furniture offers white-glove delivery service for all orders. Delivery timelines depend on product availability and your location. Our delivery team will contact you to schedule a convenient delivery window. You are responsible for ensuring clear and safe access to the delivery location. Any damages discovered at the time of delivery must be reported immediately to our delivery personnel.",
  },
  {
    title: "Returns & Warranty",
    content: "Standard catalogue products may be returned within 7 days of delivery in their original condition. Custom and bespoke items are non-returnable. All Magnat Furniture products come with a 5-year structural warranty against manufacturing defects. The warranty does not cover normal wear and tear, damage from misuse, or alterations made by unauthorized parties. Warranty claims should be submitted with photographs and a detailed description.",
  },
  {
    title: "Intellectual Property",
    content: "All content on this website, including text, graphics, logos, images, product designs, and software, is the exclusive property of Magnat Furniture and is protected by applicable copyright and trademark laws. You may not reproduce, distribute, modify, or create derivative works from any content without our prior written consent.",
  },
  {
    title: "Limitation of Liability",
    content: "Magnat Furniture shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our website or products. Our total liability shall not exceed the amount paid by you for the specific product or service in question. We are not responsible for any third-party website content linked from our site.",
  },
  {
    title: "Governing Law",
    content: "These Terms of Service are governed by the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Kerala, India. We encourage amicable resolution of any disagreements before pursuing legal action.",
  },
];

export default function TermsPage() {
  return (
    <div className="pt-32 pb-32 bg-brand-primary min-h-screen">
      <div className="container mx-auto px-6 lg:px-12 mt-12">
        <SectionHeading
          label="Legal"
          title="Terms of Service"
          subtitle="Please review the following terms carefully before using our website or purchasing Magnat Furniture products."
          className="mb-20 max-w-3xl"
        />

        <div className="max-w-3xl space-y-16">
          {sections.map((section, i) => (
            <FadeInView key={i} delay={i * 0.05}>
              <div className="border-l-2 border-[#C6A969] pl-8">
                <h3 className=" text-2xl font-semibold text-[#1A1A1A] mb-4">
                  {section.title}
                </h3>
                <p className="text-body font-light leading-loose text-sm">
                  {section.content}
                </p>
              </div>
            </FadeInView>
          ))}

          <FadeInView delay={0.4}>
            <div className="bg-[#EFE7DF] border border-brand p-10 mt-16">
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-[#1A1A1A] mb-3">Questions?</h4>
              <p className="text-body font-light text-sm leading-relaxed">
                If you have any questions about these terms, please reach out to us at{" "}
                <a href="mailto:info@magnat.in" className="text-[#8B1E1E] hover:underline">info@magnat.in</a>{" "}
                or visit our showroom for a personal consultation.
              </p>
              <p className="text-[0.65rem] uppercase tracking-widest text-[#C6A969] font-bold mt-6">
                Last Updated: April 2026
              </p>
            </div>
          </FadeInView>
        </div>
      </div>
    </div>
  );
}
