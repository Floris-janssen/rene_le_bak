# Rene le Bak

Kansgame-website: stel je kans in ("1 op X", minimaal 1, maximaal 10) en speel. Bij een ronde speelt óf René óf Solid Stigma, inclusief het bijbehorende nummer. Het starten van het spel speelt het nummer meteen af; door de klik (user gesture) wordt de browser-autoplay-restrictie omzeild.

## Bestanden toevoegen

- `images/jaarclub.jpg` (of `.png`) — foto op de startpagina
- `images/rene.png` — foto bij René
- `images/solid-stigma.png` — foto bij Solid Stigma
- `audio/rene-le-blanc.mp3` — nummer bij René
- `audio/solid-stigma.mp3` — nummer bij Solid Stigma

> Gebruik alleen audiobestanden die je zelf mag publiceren.

## Lokaal draaien

Open `index.html` in je browser.

## Naar GitHub

```bash
git init
git add .
git commit -m "Rene le Bak"
git branch -M main
git remote add origin <jouw-repo-url>
git push -u origin main
```

## Hosting op Vercel

1. Ga naar vercel.com en kies **Add New → Project**.
2. Importeer je GitHub-repo.
3. Vercel herkent de statische site automatisch (geen instellingen nodig). Klik **Deploy**.
4. De site staat daarna live op `https://<projectnaam>.vercel.app`.
