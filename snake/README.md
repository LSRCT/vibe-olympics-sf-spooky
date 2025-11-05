# 🐍 Sssnake-Spiel

Ein React-basiertes Schlangenschlacht-Spiel, das für den Sssnake-Wettbewerb entwickelt wurde.

## Funktionen

✅ Schlange mit Pfeiltasten bewegen
✅ 3 verschiedene Power-ups (Wachstum, Geschwindigkeit, Mega)
✅ Schlange wächst beim Sammeln von Power-ups
✅ Punkteverfolgung basierend auf Punkten und Länge
✅ Spielende durch Selbstkollision

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

## Power-ups

- 🔴 **Wachstum** (+10 Pkt): 1 Segment hinzufügen
- 🔵 **Geschwindigkeit** (+15 Pkt): Bonuspunkte
- 🟡 **Mega** (+25 Pkt): 3 Segmente hinzufügen
