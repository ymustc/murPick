# Example: one full murPick round trip

A real end-to-end run (research about personal productivity / habit-tracker
apps — all public open-source and commercial products), showing every stage:

| File | Stage | What it is |
|---|---|---|
| [research-summary.md](research-summary.md) | input | The research the menu was built from |
| [feature-menu.html](feature-menu.html) | 2 | The generated menu — 60 checkable features across 11 product cards + cross-cutting capabilities. Open it in a browser and try checking things |
| [feature-menu-checked.html](feature-menu-checked.html) | 2→3 | What comes back after the user picks: 18 checked items and a free-text note, burned into the file via "Save checked copy" |
| [selection-report-v1.html](selection-report-v1.html) | 3 | The selection report: scope by module, a selected-but-deferred tension called out, explicit boundaries from all 42 unchecked items, pure-CSS architecture diagram, honest risk table, full id-level traceability |

The user's note in this example — *"Sync can wait until the habit sticks. No
gamification — I know myself."* — is why the report defers sync to v1.x instead
of silently including or dropping it. Unchecked items aren't discarded either:
they become the "what v1 is not" section.
