interface MoveTokenProps {
  label: string;
  notation: string;
  side: "white" | "black";
}

export function MoveToken({ label, notation, side }: MoveTokenProps) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px]"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--text-muted)",
        color: "var(--text-strong)",
        fontFamily: "var(--font-mono)",
      }}
    >
      <span
        style={{
          color: "var(--text-muted)",
          fontFamily: "var(--font-body)",
        }}
      >
        {label}
      </span>
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor:
            side === "white" ? "var(--piece-white-fill)" : "var(--piece-black-fill)",
          border: "1px solid var(--piece-stroke)",
        }}
      />
      <span>{notation}</span>
    </span>
  );
}
