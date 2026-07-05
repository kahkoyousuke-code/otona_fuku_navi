import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";

interface Props {
  articles: ArticleMeta[];
  /** カード上部に出すラベル。既定は「特集」。 */
  label?: string;
}

/** 通常コラムと分けて、一覧上部に目立たせて表示する特集枠。 */
export default function FeaturedArticle({ articles, label = "特集" }: Props) {
  if (articles.length === 0) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 36 }}>
      {articles.map((article) => (
        <Link
          key={article.slug}
          href={`/articles/${article.slug}`}
          style={{
            display: "block",
            background: "var(--paper-2)",
            border: "1px solid var(--accent)",
            borderRadius: 4,
            padding: "24px 24px 26px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              fontSize: 11,
              letterSpacing: ".12em",
              color: "var(--paper)",
              background: "var(--accent-dark)",
              borderRadius: 2,
              padding: "3px 10px",
              marginBottom: 14,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: 20,
              fontWeight: 600,
              lineHeight: 1.5,
              marginBottom: 8,
            }}
          >
            {article.title}
          </div>
          <div style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.75, marginBottom: 14 }}>
            {article.description}
          </div>
          <span style={{ fontSize: 13, color: "var(--accent-dark)", letterSpacing: ".04em" }}>
            読んでみる →
          </span>
        </Link>
      ))}
    </div>
  );
}
