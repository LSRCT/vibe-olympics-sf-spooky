# Vibe Arena Bot

Ein einfacher Bot, der Münzen sammelt und Bomben in der Vibe Arena Herausforderung ausweicht.

## Bot-Strategie

Der Bot verwendet ein einfaches Bewertungssystem:
- **Bomben ausweichen**: Hohe Strafe für Züge in der Nähe von Bomben
- **Münzen sammeln**: Bonus für Bewegung zur nächsten Münze
- **Sicher bleiben**: Priorisiert Überleben gegenüber Münzsammlung

## Lokales Testen

```bash
cd arena
npm install
npm start
```

Der Server läuft auf `http://localhost:3000`

Mit einer Beispielanfrage testen:
```bash
curl -X POST http://localhost:3000 \
  -H "Content-Type: application/json" \
  -d '{
    "player": {"x": 5, "y": 5},
    "coins": [{"x": 7, "y": 5}],
    "bombs": [{"x": 3, "y": 5}],
    "width": 10,
    "height": 10,
    "others": []
  }'
```

## Bereitstellungsoptionen

### Option 1: Railway.app (Empfohlen - Kostenlos & Schnell)
1. Gehe zu https://railway.app/
2. Mit GitHub anmelden
3. Klicke auf "New Project" → "Deploy from GitHub repo"
4. Wähle dieses Repository aus
5. Setze das Stammverzeichnis auf `arena`
6. Railway erkennt und deployt automatisch
7. Kopiere die öffentliche URL

### Option 2: Render.com (Kostenlos)
1. Gehe zu https://render.com/
2. Erstelle einen neuen "Web Service"
3. Verbinde dein GitHub-Repository
4. Einstellungen:
   - Stammverzeichnis: `arena`
   - Build-Befehl: `npm install`
   - Start-Befehl: `npm start`
5. Deployen und URL kopieren

### Option 3: Fly.io (Kostenlose Stufe)
```bash
cd arena
fly launch
fly deploy
```

## API-Endpunkt

Dein Bot erwartet POST-Anfragen mit dem Spielstatus und antwortet mit einem Zug:

**Anfrage:**
```json
{
  "player": {"x": 5, "y": 5},
  "coins": [{"x": 7, "y": 5}],
  "bombs": [{"x": 3, "y": 5}],
  "width": 10,
  "height": 10,
  "others": []
}
```

**Antwort:**
```json
{
  "move": "right"
}
```

Gültige Züge: `up`, `down`, `left`, `right`, `stay`
