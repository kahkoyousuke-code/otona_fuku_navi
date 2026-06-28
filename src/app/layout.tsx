import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "オトナ服ナビ | FOR MEN 30–50",
    template: "%s | オトナ服ナビ",
  },
  description:
    "5つの質問に答えるだけ。体型と雰囲気から、あなたに似合う服を具体的にご提案します。40・50代男性向けファッション診断。",
  openGraph: {
    siteName: "オトナ服ナビ",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <header className="site-header">
          <div className="site-mark">オトナ服ナビ</div>
          <div className="site-sub">F O R &nbsp; M E N &nbsp; 3 0 – 5 0</div>
        </header>

        <main style={{ flex: 1 }}>{children}</main>

        <footer className="site-footer">
          <nav className="footer-nav">
            <Link href="/about">運営者情報</Link>
            <Link href="/contact">お問い合わせ</Link>
            <Link href="/privacy">プライバシーポリシー</Link>
            <Link href="/disclosure">広告表記</Link>
          </nav>
          <div className="footer-note">本ページは広告（アフィリエイト）を含みます</div>
          <div className="footer-copy">© {new Date().getFullYear()} オトナ服ナビ</div>
        </footer>

        <style>{`
          .site-header {
            text-align: center;
            padding: 36px 0 8px;
            border-bottom: 1px solid var(--line);
          }
          .site-mark {
            font-family: var(--serif);
            font-weight: 600;
            font-size: 20px;
            letter-spacing: .18em;
          }
          .site-sub {
            font-size: 11px;
            letter-spacing: .32em;
            color: var(--ink-faint);
            margin-top: 4px;
          }
          .site-footer {
            text-align: center;
            padding: 28px 24px 34px;
            border-top: 1px solid var(--line);
          }
          .footer-nav {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px 20px;
            margin-bottom: 16px;
          }
          .footer-nav a {
            font-size: 12px;
            letter-spacing: .08em;
            color: var(--ink-soft);
          }
          .footer-nav a:hover {
            color: var(--accent-dark);
          }
          .footer-note {
            font-size: 11px;
            letter-spacing: .14em;
            color: var(--ink-faint);
          }
          .footer-copy {
            font-size: 10px;
            letter-spacing: .2em;
            color: var(--ink-faint);
            margin-top: 10px;
          }
        `}</style>
      </body>
    </html>
  );
}
