/**
 * サイト共通の運営情報。
 * 公開前に「★要編集」の値を実際の情報に書き換えてください。
 */
export const SITE = {
  name: "オトナ服ナビ",
  // 公開URL（OGP画像のベースURL等に使用）。独自ドメインは取らない方針。
  // ★要編集：Vercelデプロイ後に割り当てられる https://◯◯◯.vercel.app を入れる
  url: "https://otona-fuku-navi.example.com",
  // 運営者名（個人名 or 屋号）。
  operator: "オトナ服ナビ編集部",
  // 問い合わせフォームのURL（Googleフォーム等）。★要編集（フォーム作成後に差し替える）
  contactFormUrl: "（お問い合わせフォームのURL）",
  // サイト開設日。
  since: "2026年6月",
  // 利用しているアフィリエイトプログラム（審査が通ったものを記載）
  affiliatePrograms: [
    "Amazonアソシエイト・プログラム",
    "楽天アフィリエイト",
    "Yahoo!ショッピング（ZOZOTOWN等を含む）",
  ],
} as const;
