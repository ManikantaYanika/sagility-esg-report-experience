import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Markdown — dependency-free renderer for assistant replies.
 * Supports headings, bold, italic, inline code, links, ordered/unordered
 * lists, GFM pipe tables, and paragraphs. Raw HTML is never interpreted, so
 * model output cannot inject markup. (No external package required.)
 */
const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*\n]+\*)/g;

function renderInline(text: string, kp: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  let m: RegExpExecArray | null;
  INLINE.lastIndex = 0;
  while ((m = INLINE.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    const key = `${kp}-${i++}`;
    if (tok.startsWith("**")) {
      out.push(<strong key={key} className="font-semibold text-ink-strong">{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith("`")) {
      out.push(<code key={key} className="rounded bg-neutral-100 px-1 py-0.5 font-mono text-[0.85em]">{tok.slice(1, -1)}</code>);
    } else if (tok.startsWith("[")) {
      const mm = /\[([^\]]+)\]\(([^)]+)\)/.exec(tok);
      const label = mm ? mm[1] : tok;
      const url = mm && /^https?:\/\//i.test(mm[2]) ? mm[2] : undefined;
      out.push(
        url ? (
          <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-tealMid underline decoration-brand-mint underline-offset-2 hover:text-brand-teal">{label}</a>
        ) : (
          <span key={key}>{label}</span>
        ),
      );
    } else {
      out.push(<em key={key}>{tok.slice(1, -1)}</em>);
    }
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const cells = (row: string) => row.replace(/^\s*\|/, "").replace(/\|\s*$/, "").split("|").map((c) => c.trim());
const isTableSep = (l: string) => /^\s*\|?[\s:|-]+\|[\s:|-]*$/.test(l) && l.includes("-");

export function Markdown({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let b = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") { i++; continue; }

    // Table
    if (/^\s*\|.*\|\s*$/.test(line) && i + 1 < lines.length && isTableSep(lines[i + 1])) {
      const header = cells(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i])) { rows.push(cells(lines[i])); i++; }
      blocks.push(
        <div key={`b${b++}`} className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-[0.8125rem]">
            <thead><tr>{header.map((h, k) => <th key={k} className="border-b border-neutral-100 px-2 py-1.5 font-semibold text-ink-strong">{renderInline(h, `th${b}-${k}`)}</th>)}</tr></thead>
            <tbody>{rows.map((r, ri) => <tr key={ri}>{r.map((c, ci) => <td key={ci} className="border-b border-neutral-100 px-2 py-1.5 align-top">{renderInline(c, `td${b}-${ri}-${ci}`)}</td>)}</tr>)}</tbody>
          </table>
        </div>,
      );
      continue;
    }

    // Heading
    const h = /^(#{1,6})\s+(.*)$/.exec(line);
    if (h) {
      blocks.push(<p key={`b${b++}`} className="font-display text-body font-semibold text-ink-strong">{renderInline(h[2], `h${b}`)}</p>);
      i++;
      continue;
    }

    // Unordered list
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) { items.push(lines[i].replace(/^\s*[-*]\s+/, "")); i++; }
      blocks.push(<ul key={`b${b++}`} className="ml-4 list-disc space-y-1">{items.map((it, k) => <li key={k}>{renderInline(it, `ul${b}-${k}`)}</li>)}</ul>);
      continue;
    }

    // Ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) { items.push(lines[i].replace(/^\s*\d+\.\s+/, "")); i++; }
      blocks.push(<ol key={`b${b++}`} className="ml-4 list-decimal space-y-1">{items.map((it, k) => <li key={k}>{renderInline(it, `ol${b}-${k}`)}</li>)}</ol>);
      continue;
    }

    // Paragraph (join consecutive plain lines)
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() !== "" && !/^\s*[-*]\s+/.test(lines[i]) && !/^\s*\d+\.\s+/.test(lines[i]) && !/^(#{1,6})\s+/.test(lines[i]) && !/^\s*\|.*\|\s*$/.test(lines[i])) {
      para.push(lines[i]); i++;
    }
    blocks.push(<p key={`b${b++}`}>{renderInline(para.join(" "), `p${b}`)}</p>);
  }

  return <div className={cn("space-y-2.5 text-body-s leading-relaxed text-ink")}>{blocks}</div>;
}
