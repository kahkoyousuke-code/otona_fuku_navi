import type { Metadata } from "next";
import Quiz from "@/components/Quiz";

export const metadata: Metadata = {
  title: "診断",
  description: "5つの質問で、あなたに似合う服のタイプを診断します。",
};

export default function ShindanPage() {
  return (
    <div className="wrap" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Quiz />
    </div>
  );
}
