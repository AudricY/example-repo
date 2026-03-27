import { useState, useEffect, CSSProperties } from "react";
import type { Row } from "../../../data/rows";

/**
 * Owns all row-focus concerns for the playlist.
 */
export function usePlaylistRowFocus(rows: Row[]) {
  const [focusedRowId, setFocusedRowId] = useState<string | null>(null);

  useEffect(() => {
    if (rows.length > 0) {
      setFocusedRowId(rows[0].id);
    }
  }, [rows]);

  const focusedRow = rows.find((r) => r.id === focusedRowId) ?? null;

  const focusRow = (id: string) => setFocusedRowId(id);

  const rowStyle = (row: Row): CSSProperties => ({
    cursor: "pointer",
    backgroundColor: row.id === focusedRowId ? "#e0edff" : "transparent",
  });

  return { focusedRow, focusRow, rowStyle };
}
