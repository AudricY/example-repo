import { useState, useEffect } from "react";
import { rows } from "../../data/rows";
import { RowDetails } from "./components/RowDetails";

export function Playlist() {
  // WILL BE REMOVED — moves to usePlaylistRowFocus
  const [focusedRowId, setFocusedRowId] = useState<string | null>(null);

  // WILL BE REMOVED — moves to usePlaylistRowFocus
  useEffect(() => {
    if (rows.length > 0) {
      setFocusedRowId(rows[0].id);
    }
  }, []);

  // WILL BE REMOVED — replaced by hook's focusedRow
  const focusedRow = rows.find((r) => r.id === focusedRowId) ?? null;

  return (
    <div>
      <table style={{ borderCollapse: "collapse", width: "100%", maxWidth: 500 }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "6px 12px" }}>Title</th>
            <th style={{ textAlign: "left", padding: "6px 12px" }}>Artist</th>
            <th style={{ textAlign: "right", padding: "6px 12px" }}>Duration</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              // WILL BE REMOVED — replaced by hook's focusRow
              onClick={() => setFocusedRowId(row.id)}
              style={{
                cursor: "pointer",
                // WILL BE REMOVED — replaced by hook's rowStyle
                backgroundColor: row.id === focusedRowId ? "#e0edff" : "transparent",
              }}
            >
              <td style={{ padding: "6px 12px" }}>{row.title}</td>
              <td style={{ padding: "6px 12px" }}>{row.artist}</td>
              <td style={{ padding: "6px 12px", textAlign: "right" }}>{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {focusedRow && <RowDetails row={focusedRow} />}
    </div>
  );
}
