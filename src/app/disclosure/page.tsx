import type { Metadata } from "next";
import Link from "next/link";
import InfoPage from "@/components/InfoPage";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "広告表記",
  description: `${SITE.name}における広告（アフィリエイト）の表記についてご説明します。`,
};

export default function DisclosurePage() {
  return (
    <InfoPage
      title="広告表記について"
      lead="消費者庁の景品表示法（ステルスマーケティング規制）に基づき、当サイトの広告について明示します。"
    >
      <h2>アフィリエイト広告について</h2>
      <p>
        当サイトの診断結果ページなどに掲載している「ZOZOTOWNで探す」などのリンクには、
        アフィリエイトプログラムによる広告が含まれます。これらのリンク経由で商品が購入されると、
        当サイトが販売店から成果報酬を受け取ることがあります。
      </p>
      <p>当サイトが参加している主なアフィリエイトプログラムは以下のとおりです。</p>
      <ul>
        {SITE.affiliatePrograms.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>

      <h2>商品紹介の方針</h2>
      <p>
        報酬の有無にかかわらず、当サイトは「体型・雰囲気に本当に似合うか」を基準に商品を選んでいます。
        また、すでにお持ちのアイテムは「持ってる」ボタンで除外でき、必要な買い足しだけに絞れるようにしています。
        押し売りをせず、読者の信頼を第一に運営しています。
      </p>

      <h2>価格・在庫について</h2>
      <p>
        掲載している価格はあくまで目安です。実際の価格・在庫・仕様は、リンク先の販売店の情報が最新かつ正確です。
        ご購入前に必ず販売店でご確認ください。
      </p>

      <p style={{ marginTop: 24 }}>
        個人情報やCookieの取り扱いについては、<Link href="/privacy">プライバシーポリシー</Link>をご覧ください。
      </p>
    </InfoPage>
  );
}
