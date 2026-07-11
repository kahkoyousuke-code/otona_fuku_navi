import Link from "next/link";

interface Props {
  currentPage: number;
  totalPages: number;
}

/** 1ページ目は /articles、2ページ目以降は /articles/page/n を指す。 */
function hrefForPage(page: number): string {
  return page <= 1 ? "/articles" : `/articles/page/${page}`;
}

const linkStyle: React.CSSProperties = {
  minWidth: 40,
  padding: "8px 12px",
  textAlign: "center",
  border: "1px solid var(--line)",
  borderRadius: 2,
  fontSize: 14,
  color: "var(--ink-soft)",
  textDecoration: "none",
};

const currentStyle: React.CSSProperties = {
  ...linkStyle,
  borderColor: "var(--accent)",
  color: "var(--accent-dark)",
  fontWeight: 600,
};

const disabledStyle: React.CSSProperties = {
  ...linkStyle,
  color: "var(--ink-faint)",
  opacity: 0.4,
};

export default function Pagination({ currentPage, totalPages }: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const prev = currentPage - 1;
  const next = currentPage + 1;

  return (
    <nav
      aria-label="記事一覧のページ送り"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        justifyContent: "center",
        marginTop: 40,
      }}
    >
      {currentPage > 1 ? (
        <Link href={hrefForPage(prev)} rel="prev" style={linkStyle} aria-label="前のページ">
          ← 前へ
        </Link>
      ) : (
        <span style={disabledStyle} aria-hidden="true">
          ← 前へ
        </span>
      )}

      {pages.map((page) =>
        page === currentPage ? (
          <span key={page} style={currentStyle} aria-current="page">
            {page}
          </span>
        ) : (
          <Link key={page} href={hrefForPage(page)} style={linkStyle} aria-label={`${page}ページ目`}>
            {page}
          </Link>
        )
      )}

      {currentPage < totalPages ? (
        <Link href={hrefForPage(next)} rel="next" style={linkStyle} aria-label="次のページ">
          次へ →
        </Link>
      ) : (
        <span style={disabledStyle} aria-hidden="true">
          次へ →
        </span>
      )}
    </nav>
  );
}
