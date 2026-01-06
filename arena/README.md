# Vibe Arena Bot

A simple bot that collects coins and avoids bombs in the Vibe Arena challenge.

## Bot Strategy

The bot uses a simple scoring system:
- **Avoid bombs**: High penalty for moves near bombs
- **Collect coins**: Bonus for moving toward the nearest coin
- **Stay safe**: Prioritizes survival over coin collection

## Local Testing

```bash
cd arena
npm install
npm start
```

The server runs on `http://localhost:3000`

Test with a sample request:
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

## Deployment Options

### Option 1: Railway.app (Recommended - Free & Fast)
1. Go to https://railway.app/
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select this repository
5. Set root directory to `arena`
6. Railway will auto-detect and deploy
7. Copy the public URL

### Option 2: Render.com (Free)
1. Go to https://render.com/
2. Create a new "Web Service"
3. Connect your GitHub repository
4. Settings:
   - Root directory: `arena`
   - Build command: `npm install`
   - Start command: `npm start`
5. Deploy and copy URL

### Option 3: Fly.io (Free Tier)
```bash
cd arena
fly launch
fly deploy
```

## API Endpoint

Your bot expects POST requests with game state and responds with a move:

**Request:**
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

**Response:**
```json
{
  "move": "right"
}
```

Valid moves: `up`, `down`, `left`, `right`, `stay`
