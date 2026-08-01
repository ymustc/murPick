# Research summary: personal productivity / habit-tracker apps

## Open-source

- **Super Productivity** (~21k★, Angular/Electron): to-dos + sub-tasks, pomodoro, time tracking, Jira/GitHub sync, local-first with optional WebDAV sync.
- **Beaver Habit Tracker** (~1.8k★, Python): minimalist "no-goal" check-ins, streak heatmap, REST API, self-host in one container, iOS PWA.
- **Loop Habit Tracker** (~10k★, Android): habit strength score (decays when you miss, instead of hard streak reset), flexible frequencies, widgets, fully offline.
- **Habitica** (~14k★, Node/Vue): RPG gamification — XP, gold, gear, party boss fights; habits/dailies/to-dos.
- **Memos** (~62k★, Go/React): timeline quick-capture notes, tags, markdown, self-hosted, REST + gRPC API.
- **Donetick** (~2.4k★, Go/React): natural-language task creation ("remind me every second Tuesday"), points system, NFC tag check-ins, Home Assistant integration.

## Commercial

- **TickTick**: all-in-one — tasks, calendar, pomodoro, habits; every-platform sync.
- **Notion**: template-driven free-form workspace; databases with multiple views; habit trackers built from templates; weak on mobile quick check-in.
- **Forest**: single strong metaphor — focus sessions grow a tree, leaving the app kills it; coins unlock tree species; real trees planted.
- **Streaks** (Apple): design-award minimalist habit tracker, HealthKit auto-completes step-count habits.
- **Structured**: vertical day timeline, drag tasks into time blocks.

## Cross-cutting capabilities

Task management, habit check-ins, pomodoro/focus timer, statistics dashboards (day/week/month), numeric goal tracking (water, weight), quick-capture inbox, natural-language/voice entry, gamified rewards, multi-device sync, template systems, daily/weekly review.

## Notes from the field

- Streak mechanics are controversial: hard streak resets cause "streak anxiety" and abandonment; monthly-completion-rate views and decay-based scores are the emerging alternatives.
- Local-first storage with optional sync is the architecture the self-hosting community consistently converges on.
- Features that demo well but require manual data entry (full expense tracking, mood graphs) are the most-abandoned category.
