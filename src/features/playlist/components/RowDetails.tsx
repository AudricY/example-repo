import type { Row } from "../../../data/rows";

export function RowDetails({ row }: { row: Row }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 6,
        padding: 16,
        marginTop: 16,
        maxWidth: 360,
      }}
    >
      <h3 style={{ margin: "0 0 8px" }}>{row.title}</h3>
      <p style={{ margin: "4px 0" }}>Artist: {row.artist}</p>
      <p style={{ margin: "4px 0" }}>Duration: {row.duration}</p>
    </div>
  );
}
