import { CSSProperties } from "react";
import type { Row } from "../../../data/rows";

/**
 * Hook that will eventually own all row-focus concerns.
 *
 * TEMPORARY: For now, this hook does NOT own the focus state itself.
 * The component still manages focusedRowId and passes it in so that
 * existing behavior is preserved while we migrate incrementally.
 *
 * Once migration is complete, the state will move inside this hook
 * and the component will no longer need to pass focusedRowId.
 */
export function usePlaylistRowFocus(
  rows: Row[],
  /** TEMPORARY — passed in from the component to keep behavior working */
  externalFocusedRowId: string | null,
  /** TEMPORARY — passed in from the component to keep behavior working */
  externalSetFocusedRowId: (id: string) => void
) {
  // TEMPORARY: delegate to the external state passed from the component.
  // In the final version, state will live here instead.
  const focusedRow = rows.find((r) => r.id === externalFocusedRowId) ?? null;

  // TEMPORARY: wrapper that forwards to the external setter.
  // This exists only so consumers can start calling hook.focusRow()
  // before the hook actually owns the state.
  const focusRow = (id: string) => externalSetFocusedRowId(id);

  // TEMPORARY: style helper that reads from the external state.
  const rowStyle = (row: Row): CSSProperties => ({
    cursor: "pointer",
    backgroundColor: row.id === externalFocusedRowId ? "#e0edff" : "transparent",
  });

  return { focusedRow, focusRow, rowStyle };
}
