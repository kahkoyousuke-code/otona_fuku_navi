"use client";

interface Props {
  total: number;
  ownedCount: number;
}

export default function Tally({ total, ownedCount }: Props) {
  const need = total - ownedCount;

  if (need === 0) {
    return (
      <div
        aria-live="polite"
        style={{
          marginTop: 30,
          background: "var(--accent-dark)",
          color: "var(--paper)",
          borderRadius: 3,
          padding: "18px 22px",
          textAlign: "center",
          fontSize: 14,
          letterSpacing: ".04em",
        }}
      >
        <b style={{ fontFamily: "var(--serif)", fontSize: 18, fontWeight: 600 }}>
          {total}着そろっています。
        </b>
        <br />
        あとは着こなしを磨くだけです。
      </div>
    );
  }

  return (
    <div
      aria-live="polite"
      style={{
        marginTop: 30,
        background: "var(--ink)",
        color: "var(--paper)",
        borderRadius: 3,
        padding: "18px 22px",
        textAlign: "center",
        fontSize: 14,
        letterSpacing: ".04em",
      }}
    >
      完成まで、あと{" "}
      <b style={{ fontFamily: "var(--serif)", fontSize: 18, fontWeight: 600 }}>{need}</b> 着。
      <br />
      買い足すものだけに絞れました。
    </div>
  );
}
