# LeadOS — Build Context

> Arbejdsdokument til weekend-buildet. Læs den før hver session i Cursor. Den beskriver visionen, det bærende princip, hvad der bygges nu, og hvad der venter. Supplerer LEADOS_DNA.md (positionering + design) — dette dokument er om FUNKTION og REKKEFØLGE.

---

## Det bærende princip: NUL TASTNING

Én regel afgør om systemet overlever kontakt med en rigtig leders hverdag:

**Skal lederen taste meget, dør systemet.**

Ingen udfylder felter om 25 mennesker. Derfor er hver eneste input-mekanisme bygget til at fjerne tastning — ikke tilføje den. Alt hvad der loader eller gemmer data skal kunne ske ved at tale, optage eller ved at sælgeren selv bidrager frivilligt.

Tre mekanismer, samme princip:

1. **Resultat-board** — sælgeren taster eget salg frivilligt (fordi han vil se sit tal), ikke fordi lederen tvinger ham.
2. **Stemme-transskription** — lederen taler tre sætninger efter et møde; systemet bygger note, løfte, deadline selv.
3. **Møde-optagelse (telefon)** — telefonen ligger på bordet, optager hele samtalen, laver bullet points, følger agenda. Samtalen bliver mere fri fordi ingen sidder og skriver.

Alt andet i produktet tjener at gøre god ledelse eksekverbar. Denne regel er hvordan.

---

## De tre input-mekanismer (uddybet)

### 1. Resultat-board (MUST-HAVE til weekend)

- Rent, professionelt salgs-board — IKKE gamificeret (ingen trofæer, konfetti, medaljer).
- Sælgeren taster eget salg + provision ind → ser sit eget tal, sin målprogression, sit trin mod næste provisionssats.
- Kan castes til en skærm på kontoret (dedikeret `/board`-rute, fuldskærm, læsbar på afstand, auto-opdaterer).
- **Hvorfor det er must-have:** det engagerer sælgerne og blødgør friktionen. Det giver sælgeren en grund til at bidrage — og fylder samtidig systemet med rigtige tal uden at lederen taster. Løser data-fælden bagfra.
- Nordic Tools' egne provisions-trin er skræddersyet (customisering er kernen i det Mathias sælger): fx 100k→200k = 5%→10%, 200k+ = 10%→15%, bonus ved 300k. Cold-vs-service-regler kan tilpasses.

### 2. Stemme-transskription — korte noter (VIGTIG, kan følge lige efter demo)

- Lederen siger tre sætninger efter en samtale → systemet trækker: note (til Forløbet), løfte(r) med ejer + deadline, næste handling, opdateret personside.
- Eksempel: "Camilla er frustreret over de store kunder. Jeg lovede produkttræning inden fredag. Hun vil have svar på teamlead inden næste måned." → 1 note + 2 løfter + opdateret profil.
- **Samme motor som Mesterpakken** (stemme ind → struktureret data ud). Halvdelen kører allerede. Det er ikke ny teknologi — det er samme arkitektur i nyt domæne.

### 3. Møde-optagelse via telefon (VIGTIG — Mathias har gjort det før, ved det virker)

- "Start møde"-knappen på 1:1-briefet STARTER optagelsen. Leder åbner LeadOS (også på telefon), lægger den på bordet, trykker Start møde.
- Mødemodus: optage-indikator (pulserende rød + timer), agenda som checklist der kan tikkes af undervejs, og et live "Noter"-felt hvor transskriptionen kommer ind som bullet points.
- Ved "Stop møde": systemet viser opsummering + udtrukne løfter (ejer + deadline) + noter til Forløbet.
- **Hvorfor det er stærkt:** samtalen bliver mere fri og nærværende, fordi lederen ikke kigger ned og skriver. Data loader og gemmer sig selv. (Baseret på Mathias' egen erfaring — han har gjort præcis dette før.)
- **I prototypen:** optagelse og transskription er SIMULERET (mock bullet points der fader ind, timer via JS). Ingen rigtig lyd/backend. Nok til at demonstrere flowet overbevisende. Rigtig motor bygges efter demo (samme kategori som Mesterpakkens stemme-motor).
- **Ét sammenhængende flow:** Start møde → mødemodus (optager) → Stop møde → opsummering → Generér Fokusark. Optagelse, transskription og Fokusark er ikke tre features — det er én kæde.

### 4. Genereret Fokusark (VIGTIG — løser en smerte Mathias har LIGE NU + er en adoption engine)

- Efter et coaching- eller kvartalsmøde genererer systemet et ét-sides grafisk Fokusark til sælgeren, ud af mødets opsummering, løfter og fokuspunkter. Navn: **Fokusark** (ikke "manifest" — for luftigt).
- Struktur: header (navn · mødetype · dato · udarbejdet af) → kort opsummering (2-4 linjer) → "Det gør du godt" (3 styrker) → Fokuspunkt 1/2/3 (hver med titel, "det betyder", og én konkret øvelse) → aftaler til næste møde → næste opfølgning.
- Leder kan REDIGERE før afsendelse ("du godkender før det sendes" — ikke 100% autogenereret uden kontrol). Knap: "Send til medarbejder".
- Pakket i LeadOS' egen identitet (Fraunces, varm off-white, roligt, let at scanne — IKKE Canva-agtigt, ikke teksttungt). Noget sælgeren gider åbne igen.
- Flow: afslut møde → "Generér Fokusark" → ret to linjer → send. 20 min i Canva bliver til 2 min.
- Senere: forskellige templates (coaching / kvartal / ad hoc feedback), ligger på sælgerens profil, kobles til næste 1:1, AI følger op på sidste fokusområder.
- **Hvorfor det er strategisk stærkt:** det er ikke en ny motor — det er en UDGANG på data systemet allerede fanger. OG det er en adoption engine: mange lederværktøjer skaber kun værdi for lederen; Fokusarket skaber synlig værdi for SÆLGEREN. Det gør LeadOS til noget medarbejderen selv mærker.
- **Kan testes manuelt NU** (uden system): fast prompt + fast skabelon → brug i igangværende coachingforløb fra på mandag. Løser en nuværende smerte og giver et færdigt eksempel-ark til demoen.
- **Til demoen:** vis et færdigt Fokusark på Camilla — systemet husker ikke bare samtalen, det producerer noget sælgeren kan handle på.
- **VIGTIGT — placering:** Fokusark er en stærk UDGANG på fundamentet, IKKE et nyt centrum eller "det egentlige første modul". Fundamentet (hukommelse + forberedelse) er hjertet. Flyt ikke tyngdepunktet.

---

## Byggerekkefølge

### Byg FØRST — "lederens hukommelse og forberedelse"

Dette er den første wow. Nok til Nordic Tools.

- Cockpit (morgen-briefing, slank, handlingsorienteret)
- Personside / dossier med **Forløbet** (hjertet)
- Løfter (fanges, forsvinder aldrig)
- 1:1-brief (forberedt på 2 min)
- Kalender-logistik (kvartalscyklus, 1:1-rytme)
- Motivation / check-ins (let, mønsterbaseret)
- Leadership time-overblik

### MUST-HAVE til weekend oveni

- **Resultat-board** med cast-visning (`/board`) — engagerer sælgere, blødgør friktion.

### Byg EFTER (venter til det første virker / efter demo-ja)

- Stemme-transskription (korte noter) — vigtig, følger lige efter
- Møde-optagelse via "Start møde" + mødemodus — vigtig; flow bygges som simuleret prototype nu, rigtig motor efter demo
- Genereret Fokusark — vigtig, løser en nuværende smerte + adoption engine (kan vises som eksempel i demo; kan testes manuelt nu)
- Onboarding-flow
- Karrierevej (findes allerede på Nadia som demo)
- Anonym postkasse
- Konkurrencer
- Bonus-oversigt
- CEO-view

Byg ikke: rigtig auth, database, backend, kalender-sync, CRM-sync, billing. Prototypen sælger følelsen.

---

## Kildemærkning (behold — det gør systemet troværdigt)

Hvert tal og signal viser sin kilde, så lederen tør handle på det og selv kan vurdere det:

- KILDE: CHECK-IN (sælgeren tastede det selv)
- KILDE: SIDSTE 1:1 (kom frem i samtalen)
- KILDE: CRM (rigtige tal)
- KILDE: LEDERNOTE (lederen observerede det)

Ingen black box. Det er modstykket til stemme-input: stemme får data ind uden friktion, kildemærkning gør at lederen tør stole på den.

---

## Den bedste user experience (målet)

> "Jeg åbner LeadOS, og på 60 sekunder ved jeg, hvordan jeg skal være leder i dag."

Fem principper:

1. Start altid med handling (hvem, hvad er forsinket, hvad skal bookes) — ikke tal.
2. Personen er centrum — ind i Camilla, ikke ind i "møder".
3. Kalenderen tænker som en leder — viser ansvar, ikke bare tid.
4. AI er stabschef, ikke chatbot — indbygget i flowet, har allerede forberedt brief/ugeplan/opfølgninger.
5. Det skal føles seriøst — et roligt kontrolrum, ikke Notion-template eller gamification.

---

## De tre skarpeste salgssætninger (til Nordic Tools)

- "Giv mig et system, der sørger for, at jeg aldrig møder uforberedt op til en vigtig samtale med mine folk igen."
- "Giv mig et system, der fortæller mig, hvem jeg er ved at tabe, før jeg selv opdager det."
- "Giv mig et system, der holder styr på mine løfter, så jeg ikke mister troværdighed som leder." (måske den stærkeste)

---

## Arbejdsregler i Cursor (LeadOS-spor)

- Separat mappe/projekt/repo. Rører aldrig Mesterpakken.
- Prompts på engelsk. Start med "Read LEADOS_[CONTEXT.md](http://CONTEXT.md) and LEADOS_[DNA.md](http://DNA.md) before starting".
- Ét fokus per prompt. Giv REGLER der gælder overalt (fx "hvert label-værdi-par ser sådan ud"), ikke bare "ret denne skærm" — så holder Cursor op med at gætte forskelligt hver gang.
- Appen i browseren er sandheden — ikke hvad Cursor skriver den har gjort. Verificér altid visuelt med screenshot.
- Byg først, se det, tweak så.
- LeadOS er nyt: nuancer og nye idéer er selve arbejdet her — de skal ikke bremses. (Anderledes end Mesterpakken, som er moden og skal holdes simpel.)

