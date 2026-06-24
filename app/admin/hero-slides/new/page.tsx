import HeroSlideForm from "../HeroSlideForm";

export default function NewHeroSlidePage() {
  return (
    <div className="p-10 max-w-7xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl  font-bold text-[#1A1A1A]">Add New Hero Slide</h2>
        <p className="text-xs text-body uppercase tracking-[0.2em] mt-2">Create a new cinematic entry for your homepage</p>
      </div>
      
      <HeroSlideForm />
    </div>
  );
}
