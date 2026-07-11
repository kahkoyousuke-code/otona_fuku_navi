import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getArticlePageCount,
  getListedArticleMetasByPage,
} from "@/lib/articles";
import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagination";
import DiagnosisCta from "@/components/DiagnosisCta";

interface Props {
  params: Promise<{ page: string }>;
}

/** "2" のような有効なページ番号（2以上・総ページ数以内）だけを返す。無効なら null。 */
function parsePage(raw: string, totalPages: number): number | null {
  if (!/^\d+$/.test(raw)) return null;
  const page = Number(raw);
  // 1ページ目は /articles が正。ここでは 2 以降のみ扱う。
  if (page < 2 || page > totalPages) return null;
  return page;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  const totalPages = getArticlePageCount();
  const current = parsePage(page, totalPages);
  if (current === null) return {};

  return {
    title: `記事一覧（${current}／${totalPages}ページ）`,
    description: "40・50代男性のファッションに関する記事を掲載しています。",
    alternates: { canonical: `/articles/page/${current}` },
  };
}

export function generateStaticParams() {
  const totalPages = getArticlePageCount();
  // 1ページ目は /articles が担当するため 2 以降だけを静的生成する。
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    page: String(i + 2),
  }));
}

export default async function ArticlesPagedPage({ params }: Props) {
  const { page } = await params;
  const totalPages = getArticlePageCount();
  const current = parsePage(page, totalPages);
  if (current === null) notFound();

  const articles = getListedArticleMetasByPage(current);

  return (
    <div className="wrap" style={{ padding: "40px 24px 56px" }}>
      <h1
        style={{
          fontFamily: "var(--serif)",
          fontSize: 24,
          fontWeight: 600,
          marginBottom: 8,
        }}
      >
        記事一覧
      </h1>
      <p style={{ color: "var(--ink-faint)", fontSize: 13, marginBottom: 28 }}>
        40・50代男性のファッションコラム（{current}／{totalPages}ページ）
      </p>

      <ArticleList articles={articles} />

      <Pagination currentPage={current} totalPages={totalPages} />

      <DiagnosisCta />
    </div>
  );
}
