import { rows } from "../../data/rows";
import { RowDetails } from "./components/RowDetails";
import { usePlaylistRowFocus } from "./hooks/usePlaylistRowFocus";

export function Playlist() {
  const { focusedRow, focusRow, rowStyle } = usePlaylistRowFocus(rows);

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
