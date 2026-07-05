import type { Item } from "@/data/results";

/**
 * Yahoo!ショッピングの「ZOZOTOWN Yahoo!店」店内検索URLを生成する。
 * 例: zozoStoreSearchUrl("メンズ テーラードジャケット 紺")
 *
 * store.shopping.yahoo.co.jp/zozo は shopping.yahoo.co.jp のサブドメインなので、
 * バリューコマースの LinkSwitch を導入すれば、このリンクも自動で
 * アフィリエイトリンクに変換される（URLの書き換え不要）。
 * ZOZO店内には女性向け商品も含まれるため、keyword には「メンズ」を残す。
 * 特定商品へ直接リンクしたい場合は Item.affiliateUrl を設定する（そちらが優先）。
 */
export function zozoStoreSearchUrl(keyword: string): string {
  return `https://store.shopping.yahoo.co.jp/zozo/search.html?p=${encodeURIComponent(keyword)}`;
}

/**
 * アイテムの購入リンクを決める。
 * affiliateUrl があればそれを、なければ keyword から ZOZO店内検索URLを返す。
 */
export function itemBuyUrl(item: Item): string | undefined {
  if (item.affiliateUrl) return item.affiliateUrl;
  if (item.keyword) return zozoStoreSearchUrl(item.keyword);
  return undefined;
}
