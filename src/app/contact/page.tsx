import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: `${SITE.name}へのお問い合わせ方法をご案内します。`,
};

export default function ContactPage() {
  return (
    <InfoPage
      title="お問い合わせ"
      lead="ご意見・ご質問、掲載内容に関するお問い合わせは、下記のお問い合わせフォームよりお願いいたします。"
    >
      <h2>お問い合わせフォーム</h2>
      <p>
        下記のフォームに、お問い合わせ内容をご記入のうえお送りください。
        内容を確認のうえ、順次ご対応いたします。
      </p>
      <p>
        {SITE.contactFormUrl.startsWith("（") ? (
          <span>{SITE.contactFormUrl}</span>
        ) : (
          <a href={SITE.contactFormUrl} target="_blank" rel="noopener noreferrer">
            お問い合わせフォームを開く
          </a>
        )}
      </p>

      <div className="note">
        ・ご返信・ご対応には数日いただく場合があります。<br />
        ・診断結果や商品提案は、あくまで一般的な目安です。最終的なご購入は、ご自身の判断でお願いいたします。<br />
        ・商品の在庫・価格・配送に関するお問い合わせは、各販売店へ直接お願いいたします。
      </div>
    </InfoPage>
  );
}
