"use client";

import { useState } from "react";
import type { Item } from "@/data/results";
import { itemBuyUrl } from "@/lib/affiliate";

const ICONS: Record<string, string> = {
  jacket: `<svg viewBox="0 0 24 24" width="34" height="34" stroke="currentColor" stroke-width="1.1" fill="none"><path d="M8 3l4 3 4-3 4 4-3 3v11H7V10L4 7z"/><path d="M12 6v15"/></svg>`,
  shirt: `<svg viewBox="0 0 24 24" width="34" height="34" stroke="currentColor" stroke-width="1.1" fill="none"><path d="M7 4l5 3 5-3 3 3-2 3v9H6v-9L4 7z"/></svg>`,
  pants: `<svg viewBox="0 0 24 24" width="34" height="34" stroke="currentColor" stroke-width="1.1" fill="none"><path d="M7 3h10l-1 18h-4l-1-9-1 9H5z"/></svg>`,
  shoe: `<svg viewBox="0 0 24 24" width="34" height="34" stroke="currentColor" stroke-width="1.1" fill="none"><path d="M3 16h13l4 2v2H3z"/><path d="M3 16v-5l4-1 2 3h4"/></svg>`,
  knit: `<svg viewBox="0 0 24 24" width="34" height="34" stroke="currentColor" stroke-width="1.1" fill="none"><path d="M6 5h12l2 4-3 2v9H7v-9L4 9z"/><path d="M9 5c0 2 6 2 6 0"/></svg>`,
};

interface Props {
  item: Item;
  price: string;
  onOwnedChange: (owned: boolean) => void;
}

export default function ItemCard({ item, price, onOwnedChange }: Props) {
  const [owned, setOwned] = useState(false);
  const buyUrl = itemBuyUrl(item);

  function toggle() {
    const next = !owned;
    setOwned(next);
    onOwnedChange(next);
  }

  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        borderTop: "1px solid var(--line)",
        padding: "20px 0",
        opacity: owned ? 0.55 : 1,
        transition: ".3s",
      }}
    >
      <div
        style={{
          width: 72,
          height: 88,
          flexShrink: 0,
          border: "1px solid var(--line)",
          background: "var(--white)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--ink-faint)",
          position: "relative",
        }}
      >
        <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[item.icon] }} />
        {owned && (
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(154,123,79,.16)",
              color: "var(--accent-dark)",
              fontSize: 26,
            }}
          >
            ✓
          </span>
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 3 }}>{item.nm}</div>
        <div style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.65, marginBottom: 8 }}>{item.why}</div>

        {!owned && (
          <div style={{ fontFamily: "var(--serif)", fontSize: 13, color: "var(--ink-faint)", marginBottom: 10 }}>
            目安 {price}
          </div>
        )}
        {owned && (
          <div style={{ fontSize: 13, color: "var(--accent-dark)", marginBottom: 10 }}>
            すでにお持ちですね。
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {!owned && buyUrl && (
            <a
              href={buyUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              style={{
                fontSize: 13,
                letterSpacing: ".08em",
                color: "var(--ink)",
                borderBottom: "1px solid var(--accent)",
                paddingBottom: 2,
                transition: ".2s",
              }}
            >
              ZOZOTOWNで探す <span style={{ color: "var(--accent)" }}>↗</span>
            </a>
          )}
          {!owned && !buyUrl && (
            <span style={{ fontSize: 13, color: "var(--ink-faint)" }}>リンク準備中</span>
          )}

          <button
            onClick={toggle}
            aria-pressed={owned}
            aria-label={`${item.nm}を持ってる`}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 12,
              color: owned ? "var(--accent-dark)" : "var(--ink-faint)",
              letterSpacing: ".06em",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <span
              style={{
                width: 13,
                height: 13,
                border: `1px solid ${owned ? "var(--accent)" : "var(--ink-faint)"}`,
                borderRadius: 2,
                display: "inline-block",
                background: owned ? "var(--accent)" : "transparent",
                flexShrink: 0,
              }}
            />
            持ってる
          </button>
        </div>
      </div>
    </div>
  );
}
