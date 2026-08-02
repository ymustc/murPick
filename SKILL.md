---
name: murpick
description: Use when the user shares reference materials (screenshots, screen recordings, links, or a local folder) about products they like and wants competitive research or feature selection before building something similar; when they ask for a "feature menu", "à la carte" picking, or say they want to choose which features to build; when they send back a checked/filled menu file and want the selection report; or during pre-project discovery research.
---

# murPick: research materials → interactive feature menu → tailored report

The user gives you reference materials (or a path to them) plus a topic. You run
the full pipeline; they only have to pick. Their picks — and their non-picks —
both become decisions.

## Scope rules (read first)

- **Default = full pipeline** (stages 0 → 1 → 2; stage 3 runs after the user
  returns their checked menu).
- Extra requests from the user are **additions**, never replacements for the
  default stages.
- Trim stages only when the user explicitly says so. If the materials don't fit
  a stage (e.g. pure UI mood shots of a single product can't drive a feature
  menu), adapt that stage's form (e.g. a "design element menu") or suggest
  skipping it — but your final summary MUST state which default stages were not
  run, why, and whether to run them now. Never trim silently.

## Stage 0 · Digest the materials (do this first, don't skip)

1. Inspect every item: Read images directly; extract video frames with ffmpeg
   (`fps=1/8` to start, denser for long videos); fetch links with your web
   tool (WebFetch or equivalent); `ls` local folders before anything else.
2. **Rename in place** (`mv`, not a copy) to descriptive names:
   `source-product-screen.ext`. Videos and other non-image files get renamed
   too. Keep account names and domains in their original spelling; only use a
   real person's name if the page itself states it — never guess a name from a
   username. Dedupe by md5; prefix only true content duplicates with
   `DUPLICATE-` (`rm` is often blocked by permissions; don't force-delete).
3. Identify what product/trend each item represents, one line each.
   **Never infer a person's name from usernames or filenames.**

## Stage 1 · Online research

- Cover three angles: **open-source counterparts** (features, stack,
  architecture, activity), **leading commercial products** (which school of
  thought each represents), and a **category overview**.
- Be honest: which features are real value vs demo value (pretty but needing
  manual data entry — those get abandoned); name the real-world barriers of
  external dependencies (platform API credentials, ToS/anti-scraping, no
  end-to-end solution exists).
- Attach Sources links to conclusions.

## Stage 2 · The menu (interactive, self-contained single HTML file)

Sections: user's reference products / open-source counterparts / commercial
products / cross-cutting category capabilities / **product-feature requests the
user made in this task (confirmed ones pre-checked; naming or workflow
preferences are not features — leave them out)** / a free-comment textarea at
the end.

One card per product: source meta (with links), "traits" list, "features" list —
**every item its own checkbox** (stable unique id, e.g. `prod-f1`), plus a
"select all" per card. Every card is collapsible — tapping its title toggles a
`data-collapsed` attribute (default expanded) — so 100+ item menus stay
scannable on a phone.

Interaction hard requirements (implement and self-test them all):

- Floating bottom bar: live selection count + the two buttons below; checked
  rows highlight; auto-save via localStorage.
- **"Save as checked copy"**: burn checked state into HTML attributes (add a
  `data-burned` marker; restore logic prefers burned values over localStorage)
  and download the page's outerHTML.
- **"Export JSON"**: checked item ids/products/labels + the comment text.
- A show-only-checked filter in the floating bar: it toggles a
  `data-filter="checked"` attribute on `<body>` that hides unchecked items
  (and empty cards) so the user can review their picks before saving; the
  burn step strips the attribute so saved copies open unfiltered.
- Run `scripts/validate-menu.js <menu.html>` from this skill's directory —
  all 14 checks must PASS.
- Test in a real browser: click a box, watch the count change; save a checked
  copy and confirm state survives. If the browser is sandbox-blocked, fall back
  to a headless DOM test (e.g. jsdom) and say so in your summary.

Look: warm paper-like palette, card layout, phone-readable, written in the
user's language. Put the file in the project's `refs/` (or wherever the user
says) and hand it over with one sentence on how to use it. The file itself is
the deliverable — no local server, no publishing to hosting services.

## Stage 3 · Collect and report

When the user sends back their checked menu:

- Parse **checked items** (map every one into capability domains/modules —
  none missing) and **unchecked items** (equally important — list what the
  user does NOT want as explicit boundaries).
- Produce an HTML report: table of contents, decision tables, a pure-CSS
  architecture diagram (boxes/lanes/flow — no external libraries), an honest
  risk table, version badges on revised sections.
- **Versioning: never overwrite.** Before a major revision, save the current
  file as `-vN.html` and write the new one as `-vN+1.html`, with an appendix
  logging each review comment and where it landed.
- Fold any needs the user mentions verbally into the menu/report as you go —
  don't make them repeat themselves.
