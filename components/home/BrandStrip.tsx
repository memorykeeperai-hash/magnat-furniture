"use client";

const brands = [
  "Natuzzi",
  "Flexform",
  "Minotti",
  "Cassina",
  "Poliform",
  "Walter Knoll",
  "B&B Italia",
  "Roche Bobois",
  "Poltrona Frau",
  "Molteni&C",
  "Giorgetti",
  "Arketipo",
];

// Duplicate for seamless infinite loop
const tickerItems = [...brands, ...brands];

export default function BrandStrip() {
  return (
    <section className="bg-[#1e1e1e] py-4 overflow-hidden border-y border-white/8">
      <div className="relative flex items-center">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[#1e1e1e] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[#1e1e1e] to-transparent pointer-events-none" />

        <div className="brand-ticker-track">
          {tickerItems.map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="flex items-center gap-0 shrink-0"
            >
              <span
                className="text-white/60 text-[10px] font-semibold tracking-[0.35em] uppercase px-10 hover:text-[#c9a96e] transition-colors duration-300 cursor-default"
                
              >
                {brand}
              </span>
              {/* Divider dot */}
              <span className="text-[#c9a96e]/40 text-[6px]">◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
