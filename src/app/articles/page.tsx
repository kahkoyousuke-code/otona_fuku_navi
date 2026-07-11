import type { Metadata } from "next";
import {
  getArticlePageCount,
  getFeaturedArticleMetas,
  getListedArticleMetasByPage,
} from "@/lib/articles";
import ArticleList from "@/components/ArticleList";
import FeaturedArticle from "@/components/FeaturedArticle";
import TagFilter from "@/components/TagFilter";
import Pagination from "@/components/Pagination";
import DiagnosisCta from "@/components/DiagnosisCta";

export const metadata: Metadata = {
  title: "記事一覧",
  description: "40・50代男性のファッションに関する記事を掲載しています。",
};

export default function ArticlesPage() {
  const featured = getFeaturedArticleMetas();
  const articles = getListedArticleMetasByPage(1);
  const totalPages = getArticlePageCount();

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
        40・50代男性のファッションコラム
      </p>

      <FeaturedArticle articles={featured} />

      <TagFilter />

      <ArticleList articles={articles} />

      <Pagination currentPage={1} totalPages={totalPages} />

      <DiagnosisCta />
    </div>
  );
}
