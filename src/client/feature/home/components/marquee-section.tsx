import { marqueeValues } from "@/config/data";

export function MarqueeSection({ values = marqueeValues }: { values?: string[] }) {
  const items = [...values, ...values];


  return (
    <section className="bg-charcoal py-5 overflow-hidden border-y border-ivory/10">
      <div className="flex whitespace-nowrap animate-marquee">
        {items.map((value, index) => (
          <div key={index} className="flex items-center">
            <span className="text-ivory/90 font-display italic text-lg lg:text-2xl px-8">
              {value}
            </span>
            <span
              className="w-2 h-2 rounded-full bg-terracotta shrink-0"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
