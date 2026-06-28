import Link from "next/link";

interface Props {
  message?: string;
}

export default function DiagnosisCta({ message }: Props) {
  return (
    <div
      style={{
        margin: "48px 0 0",
        background: "var(--paper-2)",
        border: "1px solid var(--line)",
        borderRadius: 4,
        padding: "32px 28px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "var(--serif)",
          fontSize: 20,
          fontWeight: 600,
          marginBottom: 12,
          lineHeight: 1.55,
        }}
      >
        {message ?? "あなたに似合う服、診断してみませんか？"}
      </div>
      <p style={{ color: "var(--ink-soft)", fontSize: 14, marginBottom: 24 }}>
        5つの質問に答えるだけ。体型と雰囲気から、具体的な3着をご提案します。
      </p>
      <Link href="/shindan" className="btn btn-primary">
        無料で診断する
      </Link>
    </div>
  );
}
