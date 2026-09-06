import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE } from "@/data/site";
import { getArticle, getAllArticleMetas, getRelatedArticles } from "@/lib/articles";
import { getArticleItems } from "@/data/articleItems";
import ArticleItems from "@/components/ArticleItems";
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
    alternates: { canonical: `/articles/${slug}` },
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
  const inline = (s: string) =>
    s
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");

  const out: string[] = [];
  let items: string[] = [];

  const flushList = () => {
    if (items.length === 0) return;
    out.push(`<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`);
    items = [];
  };

  for (const raw of md.split("\n")) {
    const line = raw.trim();
    const heading = /^(#{1,3}) (.+)$/.exec(line);

    if (line.startsWith("- ")) {
      items.push(inline(line.slice(2)));
      continue;
    }
    flushList();

    if (!line) continue;
    if (heading) {
      const level = heading[1].length;
      out.push(`<h${level}>${inline(heading[2])}</h${level}>`);
    } else {
      out.push(`<p>${inline(line)}</p>`);
    }
  }
  flushList();

  return out.join("");
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const html = markdownToHtml(article.body);
  const items = getArticleItems(slug);
  const related = getRelatedArticles(slug, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    inLanguage: "ja",
    mainEntityOfPage: `${SITE.url}/articles/${slug}`,
    author: { "@type": "Organization", name: SITE.operator },
    publisher: { "@type": "Organization", name: SITE.operator },
  };

  return (
    <div className="wrap" style={{ padding: "40px 24px 56px" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
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

      <ArticleItems items={items} />

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
