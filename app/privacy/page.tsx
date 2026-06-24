import SectionHeading from "@/components/ui/SectionHeading";
import FadeInView from "@/components/ui/FadeInView";

export const metadata = {
  title: "Privacy Policy",
  description: "Learn how Magnat Furniture collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "Information We Collect",
    content: "When you visit our website or showroom, we may collect personal information such as your name, email address, phone number, and delivery address. This information is collected when you submit an inquiry form, place an order, subscribe to our newsletter, or contact us directly. We may also collect non-personal information such as browser type, pages visited, and time spent on our site to improve your browsing experience.",
  },
  {
    title: "How We Use Your Information",
    content: "Your personal information is used to process and fulfill your orders, respond to your inquiries, provide customer support, send order updates and delivery notifications, and with your consent, share information about our new collections and exclusive offers. We never sell, trade, or rent your personal information to third-party marketers.",
  },
  {
    title: "Data Protection",
    content: "We implement robust security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. All sensitive data is transmitted via Secure Socket Layer (SSL) technology and stored within encrypted databases accessible only by authorized personnel who are required to keep the information confidential.",
  },
  {
    title: "Cookies & Tracking",
    content: "Our website uses cookies and similar technologies to enhance your browsing experience, remember your preferences, and analyze site traffic. You can choose to disable cookies through your browser settings; however, this may affect certain features of the website. We use analytics tools to understand how visitors interact with our site, helping us improve our services and user experience.",
  },
  {
    title: "Third-Party Services",
    content: "We may engage trusted third-party services for payment processing, delivery logistics, and website analytics. These partners are contractually obligated to handle your data securely and in accordance with applicable privacy laws. We ensure that any data shared is limited to what is necessary for the service being provided.",
  },
  {
    title: "Your Rights",
    content: "You have the right to access, update, or request deletion of your personal information at any time. You may also opt out of marketing communications by clicking the unsubscribe link in our emails or contacting us directly. If you have any concerns about how we handle your data, please reach out to our team.",
  },
  {
    title: "Changes to This Policy",
    content: "We may update this Privacy Policy from time to time to reflect changes in our practices or applicable regulations. Any significant changes will be communicated via email or through a prominent notice on our website. We encourage you to review this page periodically.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-32 bg-brand-primary min-h-screen">
      <div className="container mx-auto px-6 lg:px-12 mt-12">
        <SectionHeading
          label="Legal"
          title="Privacy Policy"
          subtitle="Your privacy is important to us. This policy outlines how Magnat Furniture handles and protects your personal information."
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
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-[#1A1A1A] mb-3">Contact Us About Privacy</h4>
              <p className="text-body font-light text-sm leading-relaxed">
                For any questions regarding this privacy policy, please contact us at{" "}
                <a href="mailto:info@magnat.in" className="text-[#8B1E1E] hover:underline">info@magnat.in</a>{" "}
                or call us at{" "}
                <a href="tel:+919074477358" className="text-[#8B1E1E] hover:underline">+91 9074477358</a>.
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
