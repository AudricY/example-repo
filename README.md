# Skeleton PR Counterexample

## The question

When a change is only a local ownership refactor with minimal interface impact, does requiring a "working skeleton PR" improve review clarity, or does it add temporary glue that obscures the intended design?

This repo compares two skeleton-PR approaches for the same refactor:

- **`design-skeleton`** — a design-first skeleton optimized for reviewing the intended architecture
- **`working-skeleton`** — a skeleton forced to remain working at every step

## Why this example matters

The refactor is intentionally small and local: extracting inline row-focus logic from `Playlist.tsx` into a `usePlaylistRowFocus` hook. There is no meaningful contract change, no rollout complexity, and no migration boundary. Any extra transitional code is therefore process-driven, not technically necessary.

## Branches

| Branch | Purpose |
| --- | --- |
| `main` | Baseline — all focus logic lives inline in `Playlist.tsx` |
| `design-skeleton` | Clean skeleton showing the intended hook boundary |
| `working-skeleton` | Working skeleton with temporary passthrough wiring |
| `final-implementation` | Completed refactor — hook fully owns focus logic |

## How to inspect

```bash
# Design-first skeleton: clean diff showing the intended ownership move
git diff main..design-skeleton

# Working skeleton: noisier diff with temporary glue to preserve behavior
git diff main..working-skeleton

# Shows that the working-skeleton glue was temporary and gets removed
git diff working-skeleton..final-implementation
```

## What to notice

1. **`main..design-skeleton`** — The diff is small and direct. You can immediately see what logic moves into the hook and what the new API looks like. Easy to evaluate the design.

2. **`main..working-skeleton`** — The diff is larger. The hook accepts `externalFocusedRowId` and `externalSetFocusedRowId` as temporary passthrough parameters. The component still owns state and passes it down. Every function in the hook is a wrapper that delegates back to the component. You are reviewing an intermediate state, not the final design.

3. **`working-skeleton..final-implementation`** — The temporary parameters, wrappers, and TEMPORARY comments all disappear. This proves the extra code in `working-skeleton` existed only to satisfy "must keep working" — it was never part of the intended design.

## Running the app

```bash
npm install
npm run dev
```
