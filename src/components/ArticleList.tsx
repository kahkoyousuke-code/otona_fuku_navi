import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";
import { tagLabel } from "@/lib/articles";

interface Props {
  articles: ArticleMeta[];
  emptyText?: string;
}

export default function ArticleList({ articles, emptyText }: Props) {
  if (articles.length === 0) {
    return (
      <p style={{ color: "var(--ink-faint)", fontSize: 14 }}>
        {emptyText ?? "記事を準備中です。"}
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {articles.map((article) => (
        <Link
          key={article.slug}
          href={`/articles/${article.slug}`}
          style={{ display: "block", padding: "20px 0", borderTop: "1px solid var(--line)" }}
        >
          <div style={{ fontSize: 11, color: "var(--ink-faint)", letterSpacing: ".1em", marginBottom: 6 }}>
            {article.date}
          </div>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: 17,
              fontWeight: 600,
              marginBottom: 6,
              lineHeight: 1.5,
            }}
          >
            {article.title}
          </div>
          <div style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.7, marginBottom: 10 }}>
            {article.description}
          </div>
          {article.tags && article.tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {article.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 11,
                    letterSpacing: ".04em",
                    color: "var(--ink-faint)",
                    border: "1px solid var(--line)",
                    borderRadius: 2,
                    padding: "2px 8px",
                  }}
                >
                  {tagLabel(t)}
                </span>
              ))}
            </div>
          )}
        </Link>
      ))}
      <div style={{ borderTop: "1px solid var(--line)" }} />
    </div>
  );
}
