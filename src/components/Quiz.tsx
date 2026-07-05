"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS } from "@/data/questions";
import type { Answers } from "@/data/questions";
import QuizStart from "./QuizStart";
import QuizQuestion from "./QuizQuestion";

export default function Quiz() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  function handleStart() {
    setStep(1);
    window.scrollTo(0, 0);
  }

  function handleAnswer(value: string) {
    const q = QUESTIONS[step - 1];
    const next = { ...answers, [q.id]: value };
    setAnswers(next);

    if (step < QUESTIONS.length) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      const key = `${next.taikei}-${next.funiki}`;
      const params = new URLSearchParams({
        basho: next.basho ?? "",
        nayami: next.nayami ?? "",
        yosan: next.yosan ?? "",
      });
      router.push(`/result/${key}?${params.toString()}`);
    }
  }

  function handleBack() {
    setStep(step - 1);
    window.scrollTo(0, 0);
  }

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "24px 0 56px",
      }}
    >
      {step === 0 && <QuizStart onStart={handleStart} />}
      {step >= 1 && step <= QUESTIONS.length && (
        <QuizQuestion
          question={QUESTIONS[step - 1]}
          questionIndex={step - 1}
          onAnswer={handleAnswer}
          onBack={handleBack}
        />
      )}
    </div>
  );
}
