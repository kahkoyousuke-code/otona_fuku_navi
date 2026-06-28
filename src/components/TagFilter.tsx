import Link from "next/link";
import { getUsedTagGroups, tagLabel } from "@/lib/articles";

interface Props {
  /** 現在表示中のタグ（タグページで自分を強調するため）。一覧では未指定。 */
  activeTag?: string;
}

export default function TagFilter({ activeTag }: Props) {
  const groups = getUsedTagGroups();

  return (
    <div style={{ marginBottom: 32 }}>
      {groups.map((group) => (
        <div key={group.heading} style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: ".12em",
              color: "var(--ink-faint)",
              marginBottom: 8,
            }}
          >
            {group.heading}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {group.tags.map((tag) => {
              const active = tag === activeTag;
              return (
                <Link
                  key={tag}
                  href={`/articles/tag/${tag}`}
                  style={{
                    fontSize: 13,
                    letterSpacing: ".04em",
                    padding: "6px 12px",
                    borderRadius: 2,
                    border: "1px solid var(--line)",
                    background: active ? "var(--ink)" : "transparent",
                    color: active ? "var(--paper)" : "var(--ink-soft)",
                  }}
                >
                  {tagLabel(tag)}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
