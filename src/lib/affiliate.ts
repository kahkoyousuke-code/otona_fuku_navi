import type { Item } from "@/data/results";

/**
 * Yahoo!ショッピングのキーワード検索URLを生成する。
 * 例: yahooShoppingSearchUrl("メンズ テーラードジャケット 紺")
 *
 * ZOZOTOWN は Yahoo!ショッピング内に「ZOZOTOWN Yahoo!店」を出店しているため、
 * Yahoo!ショッピング検索ならその商品も結果に含まれる。
 * バリューコマースの LinkSwitch を導入すれば、ページ内の
 * shopping.yahoo.co.jp リンクは自動でアフィリエイトリンクに変換される
 * （URLの書き換え不要）。
 * 特定商品へ直接リンクしたい場合は Item.affiliateUrl を設定する（そちらが優先）。
 */
export function yahooShoppingSearchUrl(keyword: string): string {
  return `https://shopping.yahoo.co.jp/search?p=${encodeURIComponent(keyword)}`;
}

/**
 * アイテムの購入リンクを決める。
 * affiliateUrl があればそれを、なければ keyword から Yahoo!ショッピング検索URLを返す。
 */
export function itemBuyUrl(item: Item): string | undefined {
  if (item.affiliateUrl) return item.affiliateUrl;
  if (item.keyword) return yahooShoppingSearchUrl(item.keyword);
  return undefined;
}
