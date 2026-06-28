import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { RESULTS } from "@/data/results";
import type { ResultKey } from "@/data/questions";
import ResultContent from "@/components/ResultContent";
import type { SceneType, NayamiType, YosanType } from "@/data/questions";

interface Props {
  params: Promise<{ key: string }>;
  searchParams: Promise<{ basho?: string; nayami?: string; yosan?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { key } = await params;
  const result = RESULTS[key as ResultKey];
  if (!result) return {};

  return {
    title: `診断結果: ${result.name}`,
    description: result.reason.slice(0, 80) + "…",
    openGraph: {
      title: `診断結果: ${result.name} | オトナ服ナビ`,
      description: result.reason.slice(0, 80) + "…",
      images: [{ url: `/images/${key}.webp`, width: 600, height: 800 }],
    },
  };
}

export function generateStaticParams() {
  return Object.keys(RESULTS).map((key) => ({ key }));
}

export default async function ResultPage({ params, searchParams }: Props) {
  const { key } = await params;
  const sp = await searchParams;

  const result = RESULTS[key as ResultKey];
  if (!result) notFound();

  const basho = (sp.basho as SceneType) || "both";
  const nayami = (sp.nayami as NayamiType) || "fit";
  const yosan = (sp.yosan as YosanType) || "mid";

  return (
    <div className="wrap" style={{ padding: "24px 24px 56px" }}>
      <ResultContent
        resultKey={key}
        result={result}
        basho={basho}
        nayami={nayami}
        yosan={yosan}
      />
    </div>
  );
}
