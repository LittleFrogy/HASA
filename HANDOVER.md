# Maintaining Hasa

Edit the paired `data-l="bn"` and `data-l="en"` spans together. Keep public facts attributed to direct sources and retain the date of any case-status report.

Update contact information from the institution’s public directory. Record the date accessed; do not describe an online lookup as a successful telephone check.

Keep the stylesheet, script, logo and photographs in `assets`. Photo attribution and licenses are listed in `IMAGE_CREDITS.md`.

Contact: tamimhasanakib@gmail.com. The website does not collect legal case submissions.

## Numbered citations

Factual claims carry a numbered marker linking to `coverage.html`:

```html
<a class="cite" href="coverage.html#s7" aria-label="Source 7">7</a>
```

Sources on `coverage.html` are grouped by kind — official, news, documentation, research, reference — and each has an `id` of `s1`…`s14`.

Give a new source the next free number. **Never renumber existing sources**: the numbers are referenced from other pages, and renumbering silently repoints every citation on the site. If a link dies, replace it with an archived copy rather than deleting the entry.

## Directory filters

Each `<article class="org">` carries two attributes that drive the filter buttons:

```html
<article class="org" data-kind="legal" data-district="dhaka national">
```

- `data-kind` — one of `legal`, `indigenous`, `government`
- `data-district` — space-separated; currently `gaibandha`, `dhaka`, `national`

A new value needs a matching button in the `.filters` block, with `data-filter="<value>"` and `data-filter-group="kind"` or `"district"`. Update the total in `data-filter-total` when you add or remove an entry.

Filtering is progressive: with JavaScript off, every entry stays visible.

Each entry also carries Call / Email / Website buttons in `.actions`. Keep the `tel:` href in Western digits even where the visible Bangla text uses Bengali numerals.

## The timeline

`now.html` separates the acquisition, the 1962 agreement, the 2016 violence and later case developments into four dated entries. Add new developments as new `<li>` items in date order, each with its own source number. Mark an item `class="is-key"` only if it is a turning point.

## Community voices

`index.html#voices` is deliberately empty and says so. Anything added there needs written consent, a chance for the contributor to review the page before publication, and removal on request without explanation. Credit contributors by name where they want it.

## Leaflet

`leaflet.html` groups numbers as emergency / legal aid / land offices and Indigenous organisations, and carries a publication date. Update that date whenever a number changes — the sheet tells readers to re-confirm anything older than six months, which only works if the date is honest.
