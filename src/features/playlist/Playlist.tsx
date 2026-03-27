import { useState, useEffect } from "react";
import { rows } from "../../data/rows";
import { RowDetails } from "./components/RowDetails";
import { usePlaylistRowFocus } from "./hooks/usePlaylistRowFocus";

export function Playlist() {
  // TEMPORARY: state still lives in the component so behavior is preserved.
  // Will be removed once the hook fully owns focus state.
  const [focusedRowId, setFocusedRowId] = useState<string | null>(null);

  // Auto-focus first row on mount
  // TEMPORARY: this effect will move into the hook in the next step.
  useEffect(() => {
    if (rows.length > 0) {
      setFocusedRowId(rows[0].id);
    }
  }, []);

  // TEMPORARY: pass component-owned state into the hook as a bridge.
  // The hook wraps the state it doesn't yet own so that callers
  // can start using the hook API before migration is complete.
  const { focusedRow, focusRow, rowStyle } = usePlaylistRowFocus(
    rows,
    focusedRowId,
    setFocusedRowId
  );

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
            <tr key={row.id} onClick={() => focusRow(row.id)} style={rowStyle(row)}>
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
