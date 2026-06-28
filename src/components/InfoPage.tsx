import type { ReactNode } from "react";

interface Props {
  title: string;
  lead?: string;
  updated?: string;
  children: ReactNode;
}

/**
 * 運営者情報・お問い合わせ・プライバシーポリシー・広告表記など、
 * 文章主体の固定ページ共通レイアウト。
 */
export default function InfoPage({ title, lead, updated, children }: Props) {
  return (
    <div className="wrap info-page fade" style={{ padding: "40px 24px 56px" }}>
      <h1
        style={{
          fontFamily: "var(--serif)",
          fontSize: 24,
          fontWeight: 600,
          marginBottom: lead ? 10 : 28,
          lineHeight: 1.5,
        }}
      >
        {title}
      </h1>
      {lead && (
        <p style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.9, marginBottom: 28 }}>
          {lead}
        </p>
      )}

      {children}

      {updated && (
        <p style={{ color: "var(--ink-faint)", fontSize: 12, letterSpacing: ".06em", marginTop: 40 }}>
          最終更新日: {updated}
        </p>
      )}

      <style>{`
        .info-page h2 {
          font-family: var(--serif);
          font-size: 17px;
          font-weight: 600;
          margin: 34px 0 12px;
          padding-top: 22px;
          border-top: 1px solid var(--line);
          line-height: 1.5;
        }
        .info-page p {
          font-size: 14px;
          color: var(--ink-soft);
          line-height: 1.95;
          margin-bottom: 14px;
        }
        .info-page ul {
          margin: 0 0 14px;
          padding-left: 1.2em;
        }
        .info-page li {
          font-size: 14px;
          color: var(--ink-soft);
          line-height: 1.9;
          margin-bottom: 6px;
        }
        .info-page a {
          color: var(--accent-dark);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .info-page dl {
          margin: 0;
        }
        .info-page dt {
          font-size: 12px;
          letter-spacing: .08em;
          color: var(--ink-faint);
          margin-top: 18px;
        }
        .info-page dd {
          font-size: 15px;
          color: var(--ink);
          margin: 4px 0 0;
          line-height: 1.7;
        }
        .info-page .note {
          background: var(--paper-2);
          border-radius: 3px;
          padding: 14px 16px;
          font-size: 12px;
          color: var(--ink-faint);
          line-height: 1.8;
          margin: 18px 0;
        }
      `}</style>
    </div>
  );
}
