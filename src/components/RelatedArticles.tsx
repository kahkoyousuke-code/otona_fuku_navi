import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";

interface Props {
  articles: ArticleMeta[];
}

export default function RelatedArticles({ articles }: Props) {
  if (articles.length === 0) return null;

  return (
    <div style={{ marginTop: 48 }}>
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
        あわせて読みたい
      </h2>
      {articles.map((article) => (
        <Link
          key={article.slug}
          href={`/articles/${article.slug}`}
          style={{ display: "block", padding: "16px 0", borderBottom: "1px solid var(--line)" }}
        >
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: 15,
              fontWeight: 600,
              lineHeight: 1.5,
              marginBottom: 4,
            }}
          >
            {article.title}
          </div>
          <div style={{ fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.6 }}>
            {article.description}
          </div>
        </Link>
      ))}
    </div>
  );
}
