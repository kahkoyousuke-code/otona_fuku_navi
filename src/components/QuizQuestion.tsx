"use client";

import { QUESTIONS } from "@/data/questions";
import type { Question } from "@/data/questions";

interface Props {
  question: Question;
  questionIndex: number;
  onAnswer: (value: string) => void;
  onBack: () => void;
}

export default function QuizQuestion({ question, questionIndex, onAnswer, onBack }: Props) {
  const total = QUESTIONS.length;

  return (
    <div className="fade">
      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={questionIndex + 1}
        aria-label={`質問 ${questionIndex + 1} / ${total}`}
        style={{ display: "flex", gap: 6, marginBottom: 30 }}
      >
        {QUESTIONS.map((_, idx) => (
          <i
            key={idx}
            style={{
              height: 2,
              flex: 1,
              background: idx <= questionIndex ? "var(--accent)" : "var(--line)",
              borderRadius: 2,
              transition: ".4s",
              display: "block",
            }}
          />
        ))}
      </div>

      <div style={{ fontSize: 12, letterSpacing: ".2em", color: "var(--ink-faint)", marginBottom: 10 }}>
        QUESTION {questionIndex + 1} / {total}
      </div>

      <div style={{ fontFamily: "var(--serif)", fontSize: 23, fontWeight: 600, lineHeight: 1.6, marginBottom: 28 }}>
        {question.title}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {question.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onAnswer(opt.value)}
            style={{
              background: "var(--white)",
              border: "1px solid var(--line)",
              borderRadius: 3,
              padding: "18px 20px",
              textAlign: "left",
              fontSize: 15,
              color: "var(--ink)",
              cursor: "pointer",
              transition: ".2s",
              display: "flex",
              alignItems: "center",
              gap: 14,
              width: "100%",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.background = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--line)";
              e.currentTarget.style.background = "var(--white)";
            }}
          >
            <span style={{ fontFamily: "var(--serif)", color: "var(--accent)", fontSize: 14, width: 18, flexShrink: 0 }}>
              {opt.k}
            </span>
            <span>{opt.label}</span>
          </button>
        ))}
      </div>

      {questionIndex > 0 && (
        <button
          onClick={onBack}
          style={{
            marginTop: 26,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--ink-faint)",
            fontSize: 13,
            letterSpacing: ".06em",
          }}
        >
          ← ひとつ戻る
        </button>
      )}
    </div>
  );
}
