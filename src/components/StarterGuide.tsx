import Link from "next/link";
import { getStarterGuide, tagLabel } from "@/lib/articles";

/** 記事一覧上部の「まずはこれ」枠。体型別に最初に読む記事を案内する。 */
export default function StarterGuide() {
  const { pillar, groups } = getStarterGuide();
  if (groups.length === 0) return null;

  return (
    <section aria-labelledby="starter-guide-heading" style={{ marginBottom: 40 }}>
      <h2
        id="starter-guide-heading"
        style={{ fontFamily: "var(--serif)", fontSize: 19, fontWeight: 600, marginBottom: 6 }}
      >
        まずはこれ。体型別の最初の2本
      </h2>
      <p style={{ color: "var(--ink-soft)", fontSize: 13, marginBottom: 18 }}>
        記事が多くて迷ったら、ご自分の体型の2本から読んでください。
      </p>

      <div className="starter-grid">
        {groups.map((group) => (
          <div
            key={group.tag}
            style={{
              border: "1px solid var(--line)",
              borderRadius: 4,
              padding: "16px 18px 14px",
              background: "var(--paper-2)",
            }}
          >
            <div
              style={{
                fontSize: 12,
                letterSpacing: ".12em",
                color: "var(--accent-dark)",
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              {tagLabel(group.tag)}
            </div>
            <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {group.articles.map((article, i) => (
                <li key={article.slug} style={{ borderTop: i ? "1px solid var(--line)" : "none" }}>
                  <Link
                    href={`/articles/${article.slug}`}
                    style={{
                      display: "flex",
                      gap: 10,
                      padding: "10px 0",
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: "var(--ink)",
                    }}
                  >
                    <span style={{ fontFamily: "var(--serif)", color: "var(--ink-faint)" }}>{i + 1}</span>
                    <span>{article.title}</span>
                  </Link>
                </li>
              ))}
            </ol>
            <Link
              href={`/articles/tag/${group.tag}`}
              style={{ display: "inline-block", marginTop: 6, fontSize: 12, color: "var(--accent-dark)" }}
            >
              {tagLabel(group.tag)}の記事をすべて見る →
            </Link>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 16 }}>
        {pillar && (
          <>
            体型より先に考え方を知りたい方は「
            <Link href={`/articles/${pillar.slug}`} style={{ color: "var(--accent-dark)", textDecoration: "underline" }}>
              {pillar.title}
            </Link>
            」へ。
          </>
        )}
        自分のタイプが分からなければ、
        <Link href="/shindan" style={{ color: "var(--accent-dark)", textDecoration: "underline" }}>
          30秒の診断
        </Link>
        で確かめられます。
      </p>
    </section>
  );
}
