import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { RESULTS } from "@/data/results";
import { getAllArticleMetas, getAllUsedTags, getArticlePageCount } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticleMetas();
  const latestArticleDate = articles[0]?.date;

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/shindan`, changeFrequency: "monthly", priority: 0.9 },
    {
      url: `${SITE.url}/articles`,
      lastModified: latestArticleDate ? new Date(latestArticleDate) : undefined,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    { url: `${SITE.url}/about`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/contact`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/disclosure`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const resultPages: MetadataRoute.Sitemap = Object.keys(RESULTS).map((key) => ({
    url: `${SITE.url}/result/${key}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE.url}/articles/${a.slug}`,
    lastModified: a.date ? new Date(a.date) : undefined,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const tagPages: MetadataRoute.Sitemap = getAllUsedTags().map((tag) => ({
    url: `${SITE.url}/articles/tag/${tag}`,
    changeFrequency: "weekly",
    priority: 0.4,
  }));

  // 記事一覧の2ページ目以降（1ページ目は /articles として上に含む）。
  const pageCount = getArticlePageCount();
  const listPages: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, pageCount - 1) },
    (_, i) => ({
      url: `${SITE.url}/articles/page/${i + 2}`,
      changeFrequency: "weekly" as const,
      priority: 0.4,
    })
  );

  return [...staticPages, ...resultPages, ...articlePages, ...tagPages, ...listPages];
}
