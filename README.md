# হাসা / Hasa

A bilingual resource on Santal land rights in Bangladesh: history, the current
situation in Gobindaganj, and a filterable directory of the organisations that
actually provide legal and human rights help.

*Hasa* is a Santali word for soil. The name is sourced to an open dictionary
and is still worth confirming with a Santali speaker — see [`VERIFY.md`](VERIFY.md).

**This site does not provide legal aid, and collects no personal data.** It
routes people to organisations that can help. There is no case submission form;
the reasoning is published on the site itself at `help.html#no-form`.

---

## Quick start

Open `index.html` in a browser. There is no build step and no server to start.

To check relative links exactly as they behave in production:

```sh
python -m http.server 8000
# then open http://localhost:8000
```

Keep the `assets` directory alongside the HTML pages.

## What's here

```
index.html        Home — three routes in, maintainers, community voices
about.html        History and identity — the Hool, language, festivals
now.html          The situation — Gobindaganj timeline and structural causes
directory.html    Directory — filterable contacts with Call/Email/Website
help.html         How to help — step-by-step, and why there is no form
coverage.html     Sources — 14 numbered citations, grouped by kind
contact.html      Contact — corrections and removals
leaflet.html      Printable one-page leaflet (print to PDF)

assets/style.css  All styling; colour tokens at the top of the file
assets/app.js     Language toggle, theme, nav, directory filters (no dependencies)
assets/logo.svg   Site mark and favicon
assets/*.webp     Photographs — see IMAGE_CREDITS.md
```

A full description of what the site does is in [`FEATURES.md`](FEATURES.md).

## How it is built

Plain HTML, one stylesheet, one script. No framework, no dependencies, no
database, no build step. Roughly 260 lines of vanilla JavaScript.

That is a deliberate constraint rather than a shortcut: the site has to keep
working, unattended, after whoever built it has moved on. There is no toolchain
to break and no free-tier service to be suspended for inactivity.

**Both languages live in the same file.** Every translatable string is written
twice and tagged `data-l="bn"` / `data-l="en"`; the toggle in the header flips
`data-lang` on `<html>` and CSS hides the inactive language. Bangla is the
default. With JavaScript disabled the page still renders in Bangla and stays
fully readable.

## Editing

You do not need to know how to code. Open a `.html` file in any text editor —
or edit it in the GitHub web interface — and change the text between the tags.

**Edit both language spans together.** If you change only one, the two
languages start making different promises to different readers.

Update the last-updated date at the foot of any page you edit, in both the
`datetime` attribute and the visible text.

[`HANDOVER.md`](HANDOVER.md) documents every mechanism: citation numbering,
directory filter attributes, timeline entries, and the leaflet.

## Sourcing

Factual claims carry a numbered marker linking to `coverage.html`, where the 14
sources are grouped by kind — official, news, documentation, research,
reference — with a note on what each supports.

No court documents are used. Everything about case status rests on news
reporting and is dated to that reporting. Contact details come from published
organisational and government pages, with the date accessed; an online lookup
is recorded as exactly that, not as a telephone confirmation.

[`VERIFY.md`](VERIFY.md) records the evidence scope, including what has **not**
been independently confirmed.

## Deploying

Any static host works. Published via **GitHub Pages** from the `main` branch,
root directory.

Nothing here needs a paid tier.

## Privacy

No analytics, no cookies, no trackers, no third-party scripts. The only
external request is to Google Fonts. The single contact route is a plain
`mailto:` link, and the contact page asks people not to send case details.

If analytics are ever added, they must be cookieless and aggregate-only —
Cloudflare Web Analytics, or self-hosted Plausible or Umami. Not Google
Analytics: visitors may be reading about their own legal jeopardy.

## Corrections and removals

Report an error and it is checked against the sources, corrected, and the
correction noted on the page. If someone asks for material about themselves or
their family to be removed, it is removed **without asking why**.

Contact: <tamimhasanakib@gmail.com>

## Documentation

| File | What it covers |
|---|---|
| [`FEATURES.md`](FEATURES.md) | Everything the site does, and what was deliberately left out |
| [`HANDOVER.md`](HANDOVER.md) | How to maintain it without being a developer |
| [`VERIFY.md`](VERIFY.md) | What each claim rests on, and what is unconfirmed |
| [`IMAGE_CREDITS.md`](IMAGE_CREDITS.md) | Photograph attribution and licences |

## Licence

The site's own code and text are MIT licensed — see [`LICENSE`](LICENSE).

**The bundled photographs are not covered by that licence.** They are
[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) and stay that
way: reusing them requires attribution and share-alike terms, regardless of the
MIT licence on everything else. Each is credited individually in
[`IMAGE_CREDITS.md`](IMAGE_CREDITS.md).

MIT means partner organisations can freely reuse the guidance and the leaflet,
which is the point — the leaflet is more useful the more widely it is copied.
