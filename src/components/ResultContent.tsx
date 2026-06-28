"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Result } from "@/data/results";
import type { SceneType, NayamiType, YosanType } from "@/data/questions";
import { PRICE, NAYAMI_LINE, SCENE_LABEL } from "@/data/questions";
import ItemCard from "./ItemCard";
import Tally from "./Tally";

interface Props {
  resultKey: string;
  result: Result;
  basho: SceneType;
  nayami: NayamiType;
  yosan: YosanType;
}

export default function ResultContent({ resultKey, result, basho, nayami, yosan }: Props) {
  const price = PRICE[yosan] ?? PRICE.mid;
  const nayamiLine = NAYAMI_LINE[nayami] ?? "";
  const sceneLabel = SCENE_LABEL[basho] ?? "";

  const [ownedCount, setOwnedCount] = useState(0);
  const [imgError, setImgError] = useState(false);

  const handleOwnedChange = useCallback((idx: number, owned: boolean) => {
    setOwnedCount((prev) => prev + (owned ? 1 : -1));
  }, []);

  return (
    <div className="fade">
      {/* 結果名 */}
      <div style={{ textAlign: "center", padding: "8px 0 22px" }}>
        <div style={{ fontSize: 12, letterSpacing: ".3em", color: "var(--ink-faint)" }}>YOUR TYPE</div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 30, fontWeight: 700, margin: "12px 0 14px", lineHeight: 1.4, letterSpacing: ".02em" }}>
          {result.name}
        </div>
        <div style={{ color: "var(--accent-dark)", fontSize: 14, letterSpacing: ".1em" }}>{result.tagline}</div>
      </div>

      {/* イラスト */}
      <div
        style={{
          width: "100%",
          aspectRatio: "3 / 4",
          background: "var(--paper-2)",
          border: "1px solid var(--line)",
          borderRadius: 4,
          overflow: "hidden",
          marginBottom: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {!imgError ? (
          <Image
            src={`/images/${resultKey}.webp`}
            alt={`${result.name}の完成コーデ`}
            fill
            style={{ objectFit: "cover" }}
            onError={() => setImgError(true)}
            priority
          />
        ) : (
          <div style={{ textAlign: "center", color: "var(--ink-faint)", fontSize: 13, lineHeight: 1.9, padding: 24 }}>
            <span style={{ fontFamily: "var(--serif)", fontSize: 15, color: "var(--ink-soft)", display: "block", marginBottom: 8 }}>
              完成コーデのイラスト
            </span>
            images/{resultKey}.webp<br />を入れるとここに表示されます
          </div>
        )}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(33,30,25,.62)",
            color: "var(--paper)",
            fontSize: 12,
            letterSpacing: ".08em",
            textAlign: "center",
            padding: 8,
          }}
        >
          これが、あなたの目指す完成形です
        </div>
      </div>

      {/* 判定理由 */}
      <div
        style={{
          background: "var(--paper-2)",
          borderRadius: 3,
          padding: "22px 24px",
          fontSize: 15,
          color: "var(--ink-soft)",
          lineHeight: 1.9,
          marginBottom: 36,
        }}
      >
        {result.reason}
        {nayamiLine && (
          <span
            style={{
              display: "block",
              color: "var(--ink)",
              fontSize: 14,
              marginTop: 14,
              paddingTop: 14,
              borderTop: "1px solid var(--line)",
            }}
          >
            {nayamiLine}
          </span>
        )}
      </div>

      {/* アイテム一覧 */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: 19, fontWeight: 600 }}>あなたに似合う3着</h2>
        {sceneLabel && (
          <span
            style={{
              fontSize: 11,
              letterSpacing: ".14em",
              color: "var(--ink-faint)",
              border: "1px solid var(--line)",
              borderRadius: 2,
              padding: "2px 8px",
            }}
          >
            {sceneLabel}
          </span>
        )}
      </div>
      <div style={{ fontSize: 12, color: "var(--ink-faint)", marginBottom: 18 }}>
        すでに持っているものは「持ってる」を押してください。買い足すものだけに絞れます。
      </div>

      {result.items.map((item, idx) => (
        <ItemCard
          key={idx}
          item={item}
          price={price}
          onOwnedChange={(owned) => handleOwnedChange(idx, owned)}
        />
      ))}

      <Tally total={result.items.length} ownedCount={ownedCount} />

      {/* 次のアクション */}
      <div style={{ margin: "30px 0 0", display: "flex", flexDirection: "column", gap: 10 }}>
        <Link href="/shindan" className="btn-ghost">
          もう一度、診断する
        </Link>
        <Link href="/articles" className="btn-ghost">
          このタイプ向けの記事を読む
        </Link>
      </div>

      <div style={{ textAlign: "center", fontSize: 11, color: "var(--ink-faint)", marginTop: 26, letterSpacing: ".04em", lineHeight: 1.7 }}>
        ※「Yahoo!ショッピングで探す」は広告（アフィリエイト）リンクです。
      </div>
    </div>
  );
}
