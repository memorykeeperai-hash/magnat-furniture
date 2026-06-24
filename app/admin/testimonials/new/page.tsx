import TestimonialForm from "../TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <div className="p-10 max-w-7xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl  font-bold text-[#1A1A1A]">New Client Review</h2>
        <p className="text-xs text-body uppercase tracking-[0.2em] mt-2">Add a new testimonial to showcase on your homepage</p>
      </div>
      
      <TestimonialForm />
    </div>
  );
}
