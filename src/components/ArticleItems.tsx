import type { ArticleItem } from "@/data/articleItems";
import { zozoStoreSearchUrl } from "@/lib/affiliate";

interface Props {
  items: ArticleItem[];
}

/**
 * 記事末尾の購入導線。
 * 結果ページのアイテムカードより軽い見せ方にして、診断結果を主役のままにする。
 */
export default function ArticleItems({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <section style={{ marginTop: 48 }}>
      <h2
        style={{
          fontFamily: "var(--serif)",
          fontSize: 18,
          fontWeight: 600,
          marginBottom: 4,
          paddingBottom: 8,
          borderBottom: "1px solid var(--line)",
        }}
      >
        この記事で選ぶなら
      </h2>

      {items.map((item) => (
        <div
          key={item.nm}
          style={{ padding: "16px 0", borderBottom: "1px solid var(--line)" }}
        >
          <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>{item.nm}</div>
          <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.7, marginBottom: 10 }}>
            {item.why}
          </p>
          <a
            href={zozoStoreSearchUrl(item.keyword)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            style={{
              fontSize: 13,
              letterSpacing: ".08em",
              color: "var(--ink)",
              borderBottom: "1px solid var(--accent)",
              paddingBottom: 2,
            }}
          >
            ZOZOTOWNで探す <span style={{ color: "var(--accent)" }}>↗</span>
          </a>
        </div>
      ))}

      <p
        style={{
          fontSize: 11,
          color: "var(--ink-faint)",
          letterSpacing: ".04em",
          lineHeight: 1.7,
          marginTop: 14,
        }}
      >
        ※「ZOZOTOWNで探す」は広告（アフィリエイト）リンクです。
      </p>
    </section>
  );
}
