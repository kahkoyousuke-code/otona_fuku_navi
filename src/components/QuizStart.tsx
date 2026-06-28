"use client";

interface Props {
  onStart: () => void;
}

export default function QuizStart({ onStart }: Props) {
  return (
    <div className="fade" style={{ textAlign: "center", padding: "24px 0" }}>
      <div style={{ fontFamily: "var(--serif)", fontSize: 30, fontWeight: 600, lineHeight: 1.55, letterSpacing: ".02em" }}>
        何を着れば正解か、<br />
        <em style={{ fontStyle: "normal", color: "var(--accent-dark)" }}>もう迷わない。</em>
      </div>
      <p style={{ color: "var(--ink-soft)", fontSize: 15, marginTop: 20 }}>
        5つの質問に答えるだけ。あなたの体型と雰囲気から、<br />
        似合う服を具体的にご提案します。
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: 28, margin: "32px 0 36px", color: "var(--ink-faint)", fontSize: 12, letterSpacing: ".1em" }}>
        <span>
          <b style={{ display: "block", fontFamily: "var(--serif)", fontSize: 22, color: "var(--ink)", fontWeight: 600, letterSpacing: 0 }}>5</b>
          つの質問
        </span>
        <span>
          <b style={{ display: "block", fontFamily: "var(--serif)", fontSize: 22, color: "var(--ink)", fontWeight: 600, letterSpacing: 0 }}>30</b>
          秒で完了
        </span>
      </div>

      <button className="btn btn-primary" onClick={onStart}>
        診断をはじめる
      </button>
    </div>
  );
}
