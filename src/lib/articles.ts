import fs from "fs";
import path from "path";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
  /** 通常コラムと分けて一覧上部に特集表示する記事。frontmatter の featured: true で指定。 */
  featured?: boolean;
}

export interface Article extends ArticleMeta {
  body: string;
}

function parseFrontmatter(raw: string): { meta: Record<string, string | string[]>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };

  const meta: Record<string, string | string[]> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const val = line.slice(colon + 1).trim();
    if (val.startsWith("[") && val.endsWith("]")) {
      meta[key] = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""));
    } else {
      meta[key] = val.replace(/^["']|["']$/g, "");
    }
  }
  return { meta, body: match[2] };
}

export function getAllArticleMetas(): ArticleMeta[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), "utf8");
      const { meta } = parseFrontmatter(raw);
      return {
        slug,
        title: String(meta.title ?? slug),
        description: String(meta.description ?? ""),
        date: String(meta.date ?? ""),
        tags: Array.isArray(meta.tags) ? meta.tags : undefined,
        featured: meta.featured === "true",
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** 特集記事（featured: true）を新しい順で返す。 */
export function getFeaturedArticleMetas(): ArticleMeta[] {
  return getAllArticleMetas().filter((a) => a.featured);
}

/** 通常コラム一覧に載せる記事（特集を除く）を新しい順で返す。 */
export function getListedArticleMetas(): ArticleMeta[] {
  return getAllArticleMetas().filter((a) => !a.featured);
}

/** タグの日本語ラベル。表示・タグページの見出しに使う。 */
export const TAG_LABELS: Record<string, string> = {
  // 体型
  gasshiri: "がっしり体型",
  hyojun: "標準体型",
  onaka: "お腹まわり",
  kyasha: "細身体型",
  // 雰囲気
  kireime: "きれいめ",
  casual: "カジュアル",
  // 場面
  work: "仕事の日",
  off: "休日",
  // 悩み
  fit: "似合うものが分からない",
  young: "若作りが心配",
  tedious: "服選びが面倒",
  // 予算
  low: "〜1万円",
  mid: "1〜3万円",
  high: "3万円以上",
};

/** 絞り込みUIで「体型から探す／悩みから探す」とグループ表示するための分類。 */
export const TAG_GROUPS: { heading: string; tags: string[] }[] = [
  { heading: "体型から探す", tags: ["gasshiri", "hyojun", "onaka", "kyasha"] },
  { heading: "雰囲気から探す", tags: ["kireime", "casual"] },
  { heading: "悩みから探す", tags: ["fit", "young", "tedious"] },
  { heading: "場面・予算から探す", tags: ["work", "off", "low", "mid", "high"] },
];

export function tagLabel(tag: string): string {
  return TAG_LABELS[tag] ?? tag;
}

/** 記事が一つでも持っているタグだけを、グループ構造を保ったまま返す。 */
export function getUsedTagGroups(): { heading: string; tags: string[] }[] {
  const used = new Set<string>();
  for (const a of getAllArticleMetas()) {
    a.tags?.forEach((t) => used.add(t));
  }
  return TAG_GROUPS.map((g) => ({
    heading: g.heading,
    tags: g.tags.filter((t) => used.has(t)),
  })).filter((g) => g.tags.length > 0);
}

/** 指定タグを含む記事を新しい順で返す。 */
export function getArticlesByTag(tag: string): ArticleMeta[] {
  return getAllArticleMetas().filter((a) => a.tags?.includes(tag));
}

/** すべての使用中タグ（タグページの静的生成に使う）。 */
export function getAllUsedTags(): string[] {
  const used = new Set<string>();
  for (const a of getAllArticleMetas()) {
    a.tags?.forEach((t) => used.add(t));
  }
  return [...used];
}

/**
 * 関連記事：同じタグを多く共有する記事を、共有数の多い順に最大 limit 件返す。
 * 自分自身は除外する。
 */
export function getRelatedArticles(slug: string, limit = 3): ArticleMeta[] {
  const all = getAllArticleMetas();
  const current = all.find((a) => a.slug === slug);
  if (!current?.tags?.length) return [];
  const currentTags = new Set(current.tags);

  return all
    .filter((a) => a.slug !== slug && a.tags?.length)
    .map((a) => ({
      meta: a,
      shared: a.tags!.filter((t) => currentTags.has(t)).length,
    }))
    .filter((x) => x.shared > 0)
    .sort((a, b) => b.shared - a.shared || b.meta.date.localeCompare(a.meta.date))
    .slice(0, limit)
    .map((x) => x.meta);
}

export function getArticle(slug: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { meta, body } = parseFrontmatter(raw);
  return {
    slug,
    title: String(meta.title ?? slug),
    description: String(meta.description ?? ""),
    date: String(meta.date ?? ""),
    tags: Array.isArray(meta.tags) ? meta.tags : undefined,
    featured: meta.featured === "true",
    body,
  };
}
