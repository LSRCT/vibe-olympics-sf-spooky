# 🐍 Sssnake Spiel

Ein React-basiertes Snake-Spiel, entwickelt für den Sssnake-Wettbewerb.

## Funktionen

✅ Schlange mit Pfeiltasten steuern
✅ 3 verschiedene Power-ups (Wachstum, Geschwindigkeit, Mega)
✅ Schlange wächst beim Einsammeln von Power-ups
✅ Punktestand basierend auf Punkten und Länge
✅ Spielende bei Selbstkollision

## Entwicklung

```bash
cd snake
npm install
npm run dev
```

## Bereitstellung

Auf Vercel deployen:

```bash
vercel --prod
```

## Steuerung

- **Pfeiltasten**: Schlange bewegen
- **Leertaste**: Nach Spielende neu starten

## Power-ups

- 🔴 **Wachstum** (+10 Pkt): Um 1 Segment wachsen
- 🔵 **Geschwindigkeit** (+15 Pkt): Bonuspunkte
- 🟡 **Mega** (+25 Pkt): Um 3 Segmente wachsen
