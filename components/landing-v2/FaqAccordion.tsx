"use client";

import { useState } from "react";
import { CaretDownIcon } from "@phosphor-icons/react";

/**
 * FAQ — 시안의 openFaq 동작 그대로 한 번에 하나만 열린다.
 * 답변은 faqIn(0.24s)으로 떠오르고, 화살표는 열림 상태에서 180도 돈다.
 */
export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(-1);

  return (
    <div className="flex flex-col">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-b border-[#EFF1F3]">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 rounded-[10px] px-1 py-[19px] text-left transition-colors active:bg-[#F9FAFB]"
            >
              <span className="text-base font-semibold break-keep text-[#191F28]">
                {f.q}
              </span>
              <CaretDownIcon
                size={13}
                className={`shrink-0 text-[#8B95A1] transition-transform duration-200 ease-[cubic-bezier(.23,1,.32,1)] ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <p className="animate-faq-in px-1 pb-5 text-[15px] leading-[23px] text-pretty break-keep text-[#6B7684]">
                {f.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
