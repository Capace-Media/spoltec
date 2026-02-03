"use client";

import type { ServiceHowToBlock } from "@lib/types/service";
import type { HowToBlock } from "@lib/types/page";

export default function HowTo({
  data,
}: {
  data: ServiceHowToBlock | HowToBlock;
}) {
  const { intro, listItem } = data;

  if (!intro.title || !listItem || listItem.length === 0) return null;

  return (
    <>
      <section className="contain-outer section">
        <div className="">
          <div className="pb-4">
            <h2>{intro.title}</h2>
            {intro.text && <p>{intro.text}</p>}
          </div>
          <ol className="grid md:grid-cols-3 gap-5">
            {listItem.map((s, i) => (
              <li key={s.title} className="rounded-lg border bg-card p-4">
                <div className="pb-2">
                  <h3 className="text-lg text-heading mb-0 ">{s.title}</h3>
                  <span className="block text-xs text-brand-orange contrast-more:text-[#363636]">
                    Steg {i + 1}
                  </span>
                </div>
                <p className="mt-2 text-sm">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
