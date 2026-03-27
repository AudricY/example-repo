import { CSSProperties } from "react";
import type { Row } from "../../../data/rows";

/**
 * Owns all row-focus concerns for the playlist.
 *
 * API:
 *   focusedRow  – the currently focused Row or null
 *   focusRow    – callback to focus a row by id
 *   rowStyle    – returns highlight styles for a given row
 */
export function usePlaylistRowFocus(_rows: Row[]) {
  // TODO: focused row state (useState)
  // TODO: auto-focus first row on mount (useEffect)

  const focusedRow: Row | null = null; // TODO: derive from state

  const focusRow = (_id: string) => {
    // TODO: update focused row state
  };

  const rowStyle = (_row: Row): CSSProperties => ({
    cursor: "pointer",
    // TODO: highlight when row.id matches focused row
  });

  return { focusedRow, focusRow, rowStyle };
}
