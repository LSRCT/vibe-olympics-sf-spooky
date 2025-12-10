# 🐍 Sssnake Spiel

Ein React-basiertes Schlangenspiel, entwickelt für den Sssnake-Wettbewerb.

## Funktionen

✅ Schlange mit Pfeiltasten steuern
✅ 3 verschiedene Power-Ups (Wachsen, Geschwindigkeit, Mega)
✅ Schlange wächst beim Einsammeln von Power-Ups
✅ Punkteverfolgung basierend auf Punkten und Länge
✅ Spielende bei Selbstkollision

## Entwicklung

```bash
cd snake
npm install
npm run dev
```

## Bereitstellung

Auf Vercel bereitstellen:

```bash
vercel --prod
```

## Steuerung

- **Pfeiltasten**: Schlange bewegen
- **Leertaste**: Nach Spielende neu starten

## Power-Ups

- 🔴 **Wachsen** (+10 Pkt.): Um 1 Segment wachsen
- 🔵 **Geschwindigkeit** (+15 Pkt.): Bonuspunkte
- 🟡 **Mega** (+25 Pkt.): Um 3 Segmente wachsen
