import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getArticlesByTag,
  getAllUsedTags,
  tagLabel,
  TAG_LABELS,
} from "@/lib/articles";
import ArticleList from "@/components/ArticleList";
import TagFilter from "@/components/TagFilter";
import DiagnosisCta from "@/components/DiagnosisCta";

interface Props {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return getAllUsedTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  if (!TAG_LABELS[tag]) return {};
  const label = tagLabel(tag);
  return {
    title: `${label}の記事`,
    description: `「${label}」に関する40・50代男性向けのファッション記事一覧です。`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  if (!TAG_LABELS[tag]) notFound();

  const label = tagLabel(tag);
  const articles = getArticlesByTag(tag);

  return (
    <div className="wrap" style={{ padding: "40px 24px 56px" }}>
      <div style={{ fontSize: 12, color: "var(--ink-faint)", marginBottom: 8 }}>
        <Link href="/articles" style={{ color: "var(--ink-soft)" }}>
          記事一覧
        </Link>
        {" / タグ"}
      </div>
      <h1
        style={{
          fontFamily: "var(--serif)",
          fontSize: 24,
          fontWeight: 600,
          marginBottom: 8,
          lineHeight: 1.5,
        }}
      >
        「{label}」の記事
      </h1>
      <p style={{ color: "var(--ink-faint)", fontSize: 13, marginBottom: 28 }}>
        全{articles.length}件
      </p>

      <TagFilter activeTag={tag} />

      <ArticleList articles={articles} />

      <DiagnosisCta />
    </div>
  );
}
