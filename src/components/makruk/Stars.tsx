interface StarsProps {
  count: 1 | 2 | 3;
  size?: number;
}

export function Stars({ count, size = 22 }: StarsProps) {
  const stars: ("filled" | "empty")[] = [
    count >= 1 ? "filled" : "empty",
    count >= 2 ? "filled" : "empty",
    count >= 3 ? "filled" : "empty",
  ];
  return (
    <span
      style={{
        display: "inline-flex",
        gap: 4,
        alignItems: "center",
        verticalAlign: "middle",
      }}
      aria-label={`${count} ze 3 hvězdiček`}
    >
      {stars.map((s, i) => (
        <Star key={i} filled={s === "filled"} size={size} />
      ))}
    </span>
  );
}

function Star({ filled, size }: { filled: boolean; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      style={{ display: "block" }}
    >
      <path
        d="M12 2 L14.6 8.4 L21.4 9 L16.3 13.5 L17.8 20.2 L12 16.7 L6.2 20.2 L7.7 13.5 L2.6 9 L9.4 8.4 Z"
        fill={filled ? "var(--accent)" : "transparent"}
        stroke={filled ? "var(--accent)" : "var(--text-muted)"}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}
