# Agent Handoff: Build A Minimal Repo To Demonstrate The Skeleton PR Issue

## Goal

Create a tiny standalone git repository that clearly demonstrates this process question:

> When a change is only a local ownership refactor with minimal interface impact, does requiring a "working skeleton PR" improve review clarity, or does it add temporary glue that obscures the intended design?

The repo should make the answer visually obvious by comparing two branches:

- a design-first skeleton branch
- a working-state skeleton branch

The example should show that the working-state skeleton introduces extra indirection and transitional code that is not part of the intended end design.

## Output

init the repo here
The repo should contain:

- a minimal React + TypeScript app
- a small component with local inline row-focus logic
- a target hook extraction refactor
- three comparison branches
- a concise README explaining what each branch is meant to show

## Scenario To Model

Use a small example modeled after a playlist table.

### Baseline behavior

There is a single component called `Playlist.tsx` that currently owns all row-focus behavior inline:

- it stores `focusedRowId`
- clicking a row updates the focused row
- the focused row is highlighted
- a side panel shows the focused row details

This baseline should be simple and fully working.

### Intended end design

The intended refactor is to move focused-row concerns into a dedicated hook:

`usePlaylistRowFocus`

The hook should eventually own:

- focused row state
- `focusRow`
- `rowClassName`
- initial auto-focus of the first row

The important property of the example:

- this is a local ownership refactor
- there is no meaningful external contract change
- there is no rollout complexity
- there is no migration boundary

This is exactly the kind of case where a mandatory "working skeleton" should look unnecessary.

## Branches To Create

### 1. `main`

Represents the current implementation.

Requirements:

- `Playlist.tsx` contains the full inline focused-row logic
- app runs
- highlight + detail panel behavior works

### 2. `design-skeleton`

Represents a skeleton PR optimized for reviewing the intended design.

Requirements:

- introduce `usePlaylistRowFocus.ts`
- move responsibility boundaries toward the target shape
- remove the inline focus logic from `Playlist.tsx`
- leave TODOs or stub internals if needed
- it does not need to be fully functional

Important:

- this branch should make the intended architecture extremely easy to review
- the diff should clearly show what logic is being extracted and where it is going
- avoid fake adapters or temporary passthroughs

### 3. `working-skeleton`

Represents a skeleton PR forced to remain working.

Requirements:

- introduce `usePlaylistRowFocus.ts`
- keep the old working behavior alive
- preserve runtime behavior
- use temporary passthroughs, wrappers, duplicated wiring, or TODO comments as needed

Important:

- this branch should be intentionally more awkward than `design-skeleton`
- it should visibly contain transitional glue whose only purpose is preserving behavior before the real extraction is complete
- the repo should make that extra indirection obvious in code review

### 4. `final-implementation`

Represents the completed refactor.

Requirements:

- `usePlaylistRowFocus.ts` fully owns the focused-row logic
- `Playlist.tsx` is simplified
- app works
- transitional glue from `working-skeleton` disappears

## Implementation Guidance

### Tech stack

Keep it small:

- Vite
- React
- TypeScript

No external state management needed.

### Suggested file structure

```text
src/
  App.tsx
  data/rows.ts
  features/playlist/Playlist.tsx
  features/playlist/hooks/usePlaylistRowFocus.ts
  features/playlist/components/RowDetails.tsx
```

### Baseline UI

Keep the UI minimal:

- a table or list of 5-8 rows
- clicked row is highlighted
- a detail panel shows the currently focused row

Do not spend time on styling beyond what is needed to make focus visible.

## What The Branch Diffs Should Demonstrate

### `main -> design-skeleton`

This diff should feel clean and direct.

A reviewer should be able to say:

- "I can see the intended ownership move."
- "I can evaluate whether this hook boundary makes sense."

### `main -> working-skeleton`

This diff should feel noisier.

A reviewer should be able to say:

- "I see temporary wrappers and duplicated control flow."
- "I am reviewing an intermediate state instead of the final design."
- "This branch works, but it is harder to judge the actual intended architecture."

### `working-skeleton -> final-implementation`

This diff should show that the extra working-skeleton glue was temporary and not part of the final design.

That is the core point of the example.

## README Requirements

Add a short `README.md` at the repo root that includes:

### 1. The question being demonstrated

Explain that the repo compares:

- a design-first skeleton PR
- a working-state skeleton PR

### 2. Why this example matters

State that the change is intentionally small and local, with minimal contract change, so any extra transitional code is process-driven rather than technically necessary.

### 3. How to inspect it

Include commands like:

```bash
git diff main..design-skeleton
git diff main..working-skeleton
git diff working-skeleton..final-implementation
```

### 4. What to notice

The README should explicitly call out:

- where the target design is easiest to review
- where temporary glue appears
- why "must remain working" can add noise in a local refactor

## Commit Guidance

Use small, intentional commits.

Suggested sequence:

1. `init: scaffold vite react ts app`
2. `feat: add baseline playlist focus example`
3. branch `design-skeleton`
4. `refactor: introduce row focus hook skeleton`
5. branch `working-skeleton` from `main`
6. `refactor: introduce working hook scaffold with temporary passthrough wiring`
7. branch `final-implementation` from `design-skeleton` or `main`, whichever makes the final story clearest
8. `refactor: complete row focus hook extraction`

## Acceptance Criteria

The demo is successful if:

- a reviewer can understand the whole repo in under 5 minutes
- `design-skeleton` is clearly easier to review as intended architecture
- `working-skeleton` clearly contains extra code that exists only to satisfy "must keep working"
- `final-implementation` proves that the extra working-skeleton glue was temporary
- the example does not depend on domain-specific knowledge from the harmony codebase

## Non-Goals

- do not mirror the full harmony codebase
- do not add tests unless they help make the example clearer
- do not over-engineer the app
- do not add unrelated refactors

## Deliverables

When done, provide:

- repo path
- branch list
- a short explanation of what each branch demonstrates
- the 3 most useful `git diff` commands to inspect the example
