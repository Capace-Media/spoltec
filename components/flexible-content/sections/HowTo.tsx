"use client";

import type { ServiceHowToBlock } from "@lib/types/service";

export default function HowTo({ data }: { data: ServiceHowToBlock }) {
  const { intro, listItem } = data;

  return (
    <>
      <section className="contain-outer section">
        <div className="contain">
          <div className="pb-4">
            <h2>{intro.title}</h2>
            {intro.text && <p>{intro.text}</p>}
          </div>
          <ol className="grid md:grid-cols-3 gap-5">
            {listItem.map((s, i) => (
              <li key={s.title} className="rounded-lg border bg-white p-4">
                <h3 className="text-lg text-brand-orange">
                  {s.title}{" "}
                  <span className="block text-xs text-gray-500">
                    Steg {i + 1}
                  </span>
                </h3>
                <p className="mt-2 text-sm">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
