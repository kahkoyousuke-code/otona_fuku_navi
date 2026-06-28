import type { Metadata } from "next";
import Link from "next/link";
import InfoPage from "@/components/InfoPage";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "運営者情報",
  description: `${SITE.name}の運営者情報です。`,
};

export default function AboutPage() {
  return (
    <InfoPage
      title="運営者情報"
      lead={`${SITE.name}は、30〜50代の男性が「自分に似合う服」を迷わず選べることを目指したファッション診断サイトです。`}
    >
      <h2>このサイトについて</h2>
      <p>
        体型と雰囲気から、あなたに似合う服を具体的に提案します。流行を追うのではなく、
        大人の落ち着きと上質感を大切に、長く着られる定番を中心にご紹介しています。
      </p>
      <p>
        おすすめアイテムには広告（アフィリエイト）リンクを含みますが、
        「すでに持っているものはすすめない」方針で、本当に必要な買い足しだけに絞れるようにしています。
      </p>

      <h2>運営情報</h2>
      <dl>
        <dt>サイト名</dt>
        <dd>{SITE.name}</dd>
        <dt>運営者</dt>
        <dd>{SITE.operator}</dd>
        <dt>開設</dt>
        <dd>{SITE.since}</dd>
        <dt>お問い合わせ</dt>
        <dd>
          <Link href="/contact">お問い合わせページ</Link>よりご連絡ください。
        </dd>
      </dl>

      <h2>関連ページ</h2>
      <ul>
        <li>
          <Link href="/privacy">プライバシーポリシー</Link>
        </li>
        <li>
          <Link href="/disclosure">広告表記について</Link>
        </li>
        <li>
          <Link href="/contact">お問い合わせ</Link>
        </li>
      </ul>
    </InfoPage>
  );
}
