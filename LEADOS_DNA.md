# LeadOS — DNA (positionering + design)

> Supplerer LEADOS_CONTEXT.md (funktion + rækkefølge). Læs begge filer før hver session.

---

## Positionering

LeadOS er et **roligt kontrolrum for ledere** — ikke et CRM, ikke Notion-template, ikke gamification.

- **Personen er centrum** — ind i Camilla, ikke ind i "møder".
- **AI er stabschef** — indbygget i flowet, har allerede forberedt brief/ugeplan/opfølgninger. Aldrig en løs chatbot som primær oplevelse.
- **Start med handling** — hvem, hvad er forsinket, hvad skal bookes. Ikke tal først.
- **Seriøst og roligt** — et sted lederen tør handle på det, hun ser.

---

## Det bærende princip: NUL TASTNING

Skal lederen taste meget, dør systemet. Hver input-mekanisme fjerner tastning:

1. Sælgeren taster eget salg frivilligt (resultat-board).
2. Lederen taler korte noter → systemet strukturerer.
3. Møde-optagelse → transskription og udtræk sker automatisk.

**Undtagelse (bevidst):** Fokusark kan redigeres før afsendelse — lederen godkender, ikke skriver fra bunden.

---

## Editorial design system

### Følelse
Varmt papir, flade kort, hårfine skillelinjer, rolig typografi. Noget en leder og sælger gider åbne igen — **ikke** Canva-agtigt, **ikke** teksttungt.

### Farver (`index.css` `@theme`)
| Token | Værdi | Brug |
|-------|-------|------|
| `paper` | `#F7F5F0` | Sidebaggrund |
| `surface` | `#FFFFFF` | Kort, paneler |
| `ink` | `#17171A` | Primær tekst |
| `muted` / `subtle` | `#6B6660` / `#8A8580` | Sekundær tekst |
| `border` | `#E6E2DA` | Hairlines, kanter |
| `primary` | `#2549E0` | CTA, 1:1-events |
| `accent` | `#D6642F` | Varm accent |
| `success` / `warning` / `danger` | grøn/gul/rød | Status |

### Typografi
| Rolle | Font | Klasse/komponent |
|-------|------|------------------|
| Display / overskrifter | Fraunces | `.font-display`, `PageTitle`, `SectionHeading` |
| UI / brødtekst | Inter Tight | `.body-text`, `BodyText` |
| Meta / labels | IBM Plex Mono | `.section-label`, `MonoLabel`, `Field` |

### Hierarki (brug altid — aldrig opfind nye mønstre)
1. **Section heading** — `SectionHeading` / `.section-heading` (Fraunces 1.125rem)
2. **Subtitle** — `SectionSubtitle` / `.section-subtitle` (12px muted)
3. **Meta label** — `MonoLabel` / `.section-label` (mono uppercase 11px)
4. **Body** — `BodyText` / `.body-text` (14px, line-height 1.7)

### Layout & spacing
- Sidebredde brief/dossier: `max-w-[840px]` eller `max-w-[720px]`
- Sektioner: `.section-stack` + `Hairline` (48px margin)
- Sektionsheader: `SectionHeader` (titel + undertitel + valgfri action)
- Kort: `Card` / `.card` — hvid, `border-border`, `radius-card` 8px, **ingen skygge**

### Knapper
Brug `Button` fra `ui.jsx` — `.btn-primary` / `.btn-secondary` / `.btn-ghost`. Flade, ingen drop shadow.

### AI-indhold
`LeadOSSuggestionTag` + `AiInsight` (venstre blå kant). AI er forslag, ikke dom.

### Label + værdi
Brug `Field` med `.field-label` over `.field-value`. Aldrig frie label/værdi-par med ad hoc styling.

### Status
`StatusBadge`, `PromiseStatusBadge` — border + paper baggrund, ikke fyldte pills.

---

## Kildemærkning

Hvert tal/signal viser kilde: CHECK-IN, SIDSTE 1:1, CRM, LEDERNOTE. Ingen black box.

---

## App-wide regler (gælder alle skærme)

1. **Genbrug `ui.jsx`** — importer eksisterende komponenter før nye divs med Tailwind.
2. **Genbrug tokens** — `text-ink`, `bg-paper`, `border-border` — aldrig hardcoded hex i views.
3. **Ét mønster per ting** — alle sektionsoverskrifter ser ens ud; alle lister med bullets bruger samme prik-stil (`w-1 h-1 rounded-full bg-ink/30`).
4. **Ingen gamification** — ingen trofæer, konfetti, leaderboards med medaljer.
5. **Mock data i `data.js`** — ingen backend, auth, database i prototypen.
6. **Dansk UI** — brugerfladen er dansk; kode og commits på engelsk.
7. **Mødeflow uden sidebar** — `mote-live`, `mote-summary`, `fokusark` kører fokuseret uden sidebar/topbar.

---

## Filer der definerer designet

| Fil | Indhold |
|-----|---------|
| `src/index.css` | Tokens, typografi, knapper, spacing |
| `src/components/ui.jsx` | React-primitiver |
| `index.html` | Google Fonts (Fraunces, Inter Tight, IBM Plex Mono) |

Nye styles hører hjemme i `index.css` som navngivne klasser — ikke inline styles i views (undtagen data-drevne værdier).
