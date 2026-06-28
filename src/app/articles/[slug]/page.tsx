import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticle, getAllArticleMetas, getRelatedArticles } from "@/lib/articles";
import DiagnosisCta from "@/components/DiagnosisCta";
import RelatedArticles from "@/components/RelatedArticles";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export function generateStaticParams() {
  return getAllArticleMetas().map((a) => ({ slug: a.slug }));
}

function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[hul])/gm, "")
    .replace(/^(.+)$/gm, (line) => {
      if (/^<[hul]/.test(line)) return line;
      return `<p>${line}</p>`;
    })
    .replace(/<p><\/p>/g, "");
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const html = markdownToHtml(article.body);
  const related = getRelatedArticles(slug, 3);

  return (
    <div className="wrap" style={{ padding: "40px 24px 56px" }}>
      <div style={{ marginBottom: 8, fontSize: 11, color: "var(--ink-faint)", letterSpacing: ".1em" }}>
        {article.date}
      </div>
      <h1
        style={{
          fontFamily: "var(--serif)",
          fontSize: 26,
          fontWeight: 700,
          lineHeight: 1.5,
          marginBottom: 24,
        }}
      >
        {article.title}
      </h1>

      <div
        className="article-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <RelatedArticles articles={related} />

      <DiagnosisCta message="自分のタイプが気になりますか？診断してみましょう。" />

      <style>{`
        .article-body {
          font-size: 15px;
          line-height: 1.9;
          color: var(--ink-soft);
        }
        .article-body h2 {
          font-family: var(--serif);
          font-size: 20px;
          font-weight: 600;
          color: var(--ink);
          margin: 36px 0 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--line);
        }
        .article-body h3 {
          font-family: var(--serif);
          font-size: 17px;
          font-weight: 600;
          color: var(--ink);
          margin: 24px 0 8px;
        }
        .article-body p {
          margin-bottom: 16px;
        }
        .article-body ul {
          margin: 0 0 16px 20px;
        }
        .article-body li {
          margin-bottom: 6px;
        }
        .article-body strong {
          color: var(--ink);
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}
