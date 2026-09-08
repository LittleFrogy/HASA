# Features

What Hasa does, and why each thing is built the way it is. Everything listed
here exists in the repository — this is a description of the site, not a plan.

---

## 1. Two audiences, one site

The site serves two groups at once, and the structure reflects that split:

| Audience | What they get |
|---|---|
| Someone helping a person in a land dispute | The directory, the step-by-step help guide, the printable leaflet |
| Someone learning about the Santal community | History and identity, the situation, the sourced timeline |

The homepage opens with **three routes** rather than a menu — *I need legal
help*, *Understand land rights*, *Explore Santal history* — so a visitor in
urgent need is one click from the directory instead of reading an essay first.

## 2. Bilingual, in one file per page

- **Bangla and English in every page**, switched by a toggle in the header.
- Bangla is the **default and primary language**. English is the secondary
  layer, not the other way round.
- Switching is instant: both languages are already in the page, tagged
  `data-l="bn"` / `data-l="en"`, and CSS hides the inactive one.
- The choice is remembered per visitor in `localStorage`, and the `<html lang>`
  attribute and page `<title>` update with it.
- Hidden text is removed with `display: none`, so screen readers only ever
  encounter one language.
- **Works without JavaScript**: the page renders in Bangla and stays fully
  readable; only the toggles stop.

Keeping both languages in one file means an edit to one paragraph sits directly
beside its translation — the two cannot silently drift apart the way separate
`/en/` files do.

## 3. Contact directory

The most useful page on the site, and the one designed hardest.

- **Nine organisations** across legal aid, Indigenous rights organisations, and
  government services.
- **Filter by type of help** — legal aid, Indigenous rights, government service.
- **Filter by district** — Gaibandha, Dhaka, nationwide.
- **Call, Email and Website buttons** on every entry, sized to a 44px minimum
  tap target, with `tel:` and `mailto:` links that dial and compose directly
  from a phone.
- A **live count** of how many entries match, and a one-click filter reset.
- An **empty state** that points to the national helplines instead of leaving a
  dead end.
- Every entry carries its **source and the date it was accessed**, so a reader
  can judge how current it is.
- Filtering is progressive: with JavaScript off, all nine entries stay visible.

## 4. Sourcing

- **Numbered citations** beside factual claims, linking to the matching entry
  on the sources page.
- **14 sources**, grouped and labelled by kind:

  | Kind | What it means |
  |---|---|
  | Official | The text of a law, or information published by a government body |
  | News | Journalists' reporting — event date and report date given separately |
  | Documentation | An organisation's own record-keeping, not independent verification |
  | Research | Academic articles |
  | Reference | Dictionaries and encyclopaedia-style commentary, not primary sources |

- A short **"how to read the sources"** section explains why those distinctions
  matter — an NGO's own documentation is evidence of a different kind from a
  court record.
- The site states plainly that **no court documents are used**: everything
  about case status rests on news reporting and is dated to that reporting.
- Source numbers are **stable**. Adding a source takes the next free number;
  renumbering is prohibited because the numbers are referenced from other pages.

## 5. The Gobindaganj timeline

A dated chronology that keeps four separate things separate, because they are
routinely blurred together:

1. **1955–56** — the land acquisition
2. **7 July 1962** — the agreement, and clauses 3 and 5 that families rely on
3. **6 November 2016** — the eviction violence and the three men killed
4. **6 November 2025** — case status: still no trial, nine years on

Each entry carries its own source number, and the page says outright that case
status changes and that what is written runs only to the last report checked.

## 6. Printable leaflet

A website does not reach a village. The leaflet is the object that does.

- One page, print-optimised, A4, browser print-to-PDF.
- **Emergency (999) sits alone in its own box** — the one number someone needs
  in the worst moment is not buried in a list of nine.
- Legal aid numbers and land/Indigenous organisation numbers are grouped
  separately below it.
- Carries a **publication date** and tells the reader to re-confirm anything
  more than six months old.
- Print styles distinguish the emergency box by rule weight rather than colour,
  because printing is monochrome in practice.
- Site chrome is excluded from the print output.

## 7. Design and interface

- Light and dark themes, following the system preference with a manual
  override, remembered per visitor.
- Serif display type (Fraunces / Noto Serif Bengali) over sans body type
  (Inter / Noto Sans Bengali).
- Original SVG artwork — a layered farmland hero that re-colours with the
  theme, a schematic district map marking Gobindaganj, and the site mark.
- Sticky header with a blurred backdrop; hamburger navigation below 52rem.
- Scroll-reveal animation, disabled entirely under `prefers-reduced-motion`.
- Sections separated by space and heading weight rather than by boxes and
  rules — the page is readable by scanning headings alone.

## 8. Accessibility and mobile

- Skip link, visible focus rings, `aria-pressed` / `aria-expanded` state on all
  toggles, `aria-live` on the filter count, labelled SVG artwork.
- Bengali is set larger than the Latin text (1.2rem against 1.09rem) with more
  leading, because its conjuncts and matras need the room.
- Line length capped at 40rem so paragraphs stay readable.
- 44px minimum tap targets on navigation, filters and contact buttons.
- All motion respects `prefers-reduced-motion`.

## 9. Privacy and safety

Mostly a list of things the site deliberately does **not** do:

- **No case submission form.** No database of who is disputing which land
  against whom. The reasoning is published on the site itself at
  `help.html#no-form`, not buried in a commit message.
- **No analytics, no cookies, no trackers, no third-party scripts.** The only
  external request is to Google Fonts.
- **No personal data collected anywhere.** The single contact route is a plain
  `mailto:` link, and the contact page tells people not to send case details.
- **Removal on request, without explanation.** Stated on the contact page and
  in the maintainer section.
- Names of people killed appear only where already published in news reporting,
  and the site carries no identifiable photographs of anyone in a dispute.
- Photographs are licensed landscape context, credited in `IMAGE_CREDITS.md`,
  and captioned to say they do not depict the disputed land.

## 10. Transparency

- A **"Who maintains Hasa?"** section on the homepage: what the site is, its
  purpose, who to contact, where information comes from, and the correction
  process.
- A **community voices** section that says openly that no Santal voices are on
  the site yet, names that as its largest gap, and sets the three conditions for
  anything added there — written consent, review before publication, and
  removal on request without explanation.
- Contact details carry access dates, and the documentation is explicit that an
  online lookup is not a telephone confirmation.

## 11. Technical

- **No build step.** Plain HTML, one stylesheet, one script.
- **No dependencies and no framework.** About 260 lines of vanilla JavaScript.
- **No database and no server.** Deploys to any static host.
- SEO and sharing metadata (`description`, Open Graph) on every page; SVG
  favicon.
- Semantic HTML with `<article>`, `<figure>`, `<time datetime>` and
  definition lists.

## 12. Built to survive a handover

The failure mode for a student project is that it rots the moment whoever
understood the tooling leaves. Everything above is chosen against that:

- No toolchain to break, no dependencies to go stale, no free-tier database to
  be suspended for inactivity.
- Content is editable in a text editor, or in the GitHub web interface, by
  someone who does not code.
- `HANDOVER.md` documents every mechanism — citation numbering, filter
  attributes, timeline entries, the leaflet.
- `VERIFY.md` records what each claim rests on and what has *not* been
  independently confirmed.
- Every page carries a last-updated date, so a reader can always tell how old
  the information is.

---

## Deliberately not built

Recorded so that anyone who wants to add these later knows the decision was
made on purpose:

| Not built | Why |
|---|---|
| Case submission form | Creates a targeting list of vulnerable people; no capacity to respond; no legal protection; no custodian after the group disperses |
| Live news feed | Nothing that implies freshness the maintainers cannot deliver — a feed frozen in 2026 reads as a dead site |
| Google Analytics | Visitors may be reading about their own legal jeopardy |
| Ol Chiki version | Ol Chiki literacy is limited among Bangladeshi Santals; a machine-translated page is the appearance of inclusion, not inclusion |
| Interactive map library | Heavy, fragile, and unnecessary — a static schematic does the job |
| Volunteer signup and workshop calendar | Another inbound channel nobody is staffed to answer |
