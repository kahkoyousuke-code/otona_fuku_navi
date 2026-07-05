import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ページが見つかりません",
};

export default function NotFound() {
  return (
    <div
      className="wrap fade"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        padding: "64px 24px",
      }}
    >
      <div style={{ fontSize: 12, letterSpacing: ".3em", color: "var(--ink-faint)" }}>404</div>
      <h1
        style={{
          fontFamily: "var(--serif)",
          fontSize: 26,
          fontWeight: 600,
          lineHeight: 1.6,
          margin: "14px 0 12px",
        }}
      >
        お探しのページが
        <br />
        見つかりませんでした。
      </h1>
      <p style={{ color: "var(--ink-soft)", fontSize: 14, marginBottom: 36 }}>
        移動または削除された可能性があります。
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 360, margin: "0 auto", width: "100%" }}>
        <Link href="/" className="btn btn-primary" style={{ textAlign: "center" }}>
          トップページへ戻る
        </Link>
        <Link href="/shindan" className="btn-ghost">
          診断をはじめる
        </Link>
      </div>
    </div>
  );
}
