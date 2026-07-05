import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "オトナ服ナビ | FOR MEN 30–50",
};

export default function TopPage() {
  return (
    <div className="wrap" style={{ maxWidth: 920, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px 24px" }}>
      <div className="fade">
        <div className="hero" style={{ marginBottom: 48 }}>
          <figure className="hero-figure">
            <Image
              src="/images/hero.webp"
              alt="きれいめに装った40代の男性のイラスト"
              width={380}
              height={507}
              priority
              sizes="(min-width: 760px) 380px, 100vw"
            />
          </figure>

          <div className="hero-body">
            <h1 style={{ fontFamily: "var(--serif)", fontSize: 30, fontWeight: 600, lineHeight: 1.55, letterSpacing: ".02em", marginBottom: 20 }}>
              何を着れば正解か、<br />
              <em style={{ fontStyle: "normal", color: "var(--accent-dark)" }}>もう迷わない。</em>
            </h1>
            <p style={{ color: "var(--ink-soft)", fontSize: 15 }}>
              5つの質問に答えるだけ。あなたの体型と雰囲気から、似合う服を具体的にご提案します。
            </p>

            <div className="hero-stats" style={{ display: "flex", justifyContent: "center", gap: 28, margin: "32px 0 36px", color: "var(--ink-faint)", fontSize: 12, letterSpacing: ".1em" }}>
              <span>
                <b style={{ display: "block", fontFamily: "var(--serif)", fontSize: 22, color: "var(--ink)", fontWeight: 600, letterSpacing: 0 }}>5</b>
                つの質問
              </span>
              <span>
                <b style={{ display: "block", fontFamily: "var(--serif)", fontSize: 22, color: "var(--ink)", fontWeight: 600, letterSpacing: 0 }}>30</b>
                秒で完了
              </span>
            </div>

            <Link href="/shindan" className="btn btn-primary">
              診断をはじめる →
            </Link>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--line)", paddingTop: 36 }}>
          <p style={{ fontSize: 12, color: "var(--ink-faint)", textAlign: "center", letterSpacing: ".08em", marginBottom: 16 }}>
            タイプ別に読む
          </p>
          <Link
            href="/articles"
            style={{ display: "block", textAlign: "center", fontSize: 14, color: "var(--ink-soft)", letterSpacing: ".06em", padding: "12px 0" }}
          >
            記事一覧を見る →
          </Link>
        </div>
      </div>
    </div>
  );
}
