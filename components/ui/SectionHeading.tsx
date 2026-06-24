import FadeInView from "./FadeInView";

interface SectionHeadingProps {
  label?: string;
  title?: string;
  titlePart1?: string;
  titlePart2?: string;
  subtitle?: React.ReactNode;
  className?: string;
  light?: boolean;
}

export default function SectionHeading({
  label,
  title,
  titlePart1,
  titlePart2,
  subtitle,
  className = "",
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl text-center mx-auto ${className}`}>
      {(label) && (
        <FadeInView delay={0.1}>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] mb-3 block text-[#C0001A]">
            {label}
          </span>
        </FadeInView>
      )}
      <FadeInView delay={0.2}>
        <h2 className={`text-3xl md:text-5xl font-bold leading-tight ${light ? "text-[#FCFCFC]" : "text-[#111]"}`}>
          {title ? (
            title
          ) : (
            <>
              {titlePart1}{" "}
              <span className="text-[#C0001A] italic">{titlePart2}</span>
            </>
          )}
        </h2>
      </FadeInView>
      {subtitle && (
        <FadeInView delay={0.3}>
          <p className={`text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed ${light ? "text-[#FCFCFC]/80" : "text-gray-500"}`}>
            {subtitle}
          </p>
        </FadeInView>
      )}
    </div>
  );
}
