# 🐍 Adding Multiplayer to Snake Game

## Current State

**Single-player game is complete** with 5/10 points:
- ✅ Snake movement with arrow keys (1 pt)
- ✅ 3 power-up types: grow, speed, mega (1 pt)
- ✅ Snake growth on power-up consumption (1 pt)
- ✅ Score tracking (1 pt)
- ✅ Self-collision detection (1 pt)

**Architecture:**
- `snake/src/Game.jsx` - Main game component (240 lines)
  - State: `snake`, `direction`, `powerup`, `score`, `gameOver`
  - Game loop runs at 150ms intervals
  - Canvas rendering (20x20 grid, 25px cells)
  - Local-only game state

**To get 10/10 points: Add 2-player support (5 pts)**

---

## Multiplayer Implementation: Vercel KV + Polling

**Why this approach:**
- Zero external services (pure Vercel)
- No signups or API keys needed
- Simple HTTP polling (no WebSockets)
- ~30 minutes to implement

---

## Step 1: Setup Vercel KV

```bash
# Install Vercel KV integration (run in project root)
vercel integration add kv

# Install KV SDK
cd snake
npm install @vercel/kv
```

Vercel KV auto-configures env vars - no manual setup needed.

---

## Step 2: Create Backend API (`api/game-state.js`)

Create this file at project root:

```javascript
import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  // CORS headers for local dev
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')

  if (req.method === 'POST') {
    const { playerId, snake, score, claimPowerup } = JSON.parse(req.body)

    // Save player state (expires in 10 seconds)
    await kv.set(`player:${playerId}`, {
      snake,
      score,
      timestamp: Date.now()
    }, { ex: 10 })

    // Handle powerup claiming
    if (claimPowerup) {
      await kv.del('powerup')

      // Spawn new powerup
      const x = Math.floor(Math.random() * 20)
      const y = Math.floor(Math.random() * 20)
      const types = [
        { name: 'grow', color: '#ff6b6b', points: 10 },
        { name: 'speed', color: '#4ecdc4', points: 15 },
        { name: 'mega', color: '#ffe66d', points: 25 }
      ]
      const type = types[Math.floor(Math.random() * types.length)]
      await kv.set('powerup', { x, y, type })
    }

    return res.json({ success: true })
  }

  // GET - return all active players + powerup
  const keys = await kv.keys('player:*')
  const players = {}

  for (const key of keys) {
    const data = await kv.get(key)
    // Only include players active in last 5 seconds
    if (data && Date.now() - data.timestamp < 5000) {
      players[key.replace('player:', '')] = data
    }
  }

  // Get or create powerup
  let powerup = await kv.get('powerup')
  if (!powerup) {
    const x = Math.floor(Math.random() * 20)
    const y = Math.floor(Math.random() * 20)
    const types = [
      { name: 'grow', color: '#ff6b6b', points: 10 },
      { name: 'speed', color: '#4ecdc4', points: 15 },
      { name: 'mega', color: '#ffe66d', points: 25 }
    ]
    const type = types[Math.floor(Math.random() * types.length)]
    powerup = { x, y, type }
    await kv.set('powerup', powerup)
  }

  res.json({ players, powerup })
}
```

---

## Step 3: Update `snake/src/Game.jsx`

### Add new state at top of component (after existing state):

```jsx
const [playerId] = useState(() => Math.random().toString(36).substr(2, 9))
const [otherPlayers, setOtherPlayers] = useState({})
```

### Add sync effect after existing useEffects:

```jsx
// Sync game state with backend
useEffect(() => {
  if (!gameStarted || gameOver) return

  const syncInterval = setInterval(async () => {
    try {
      // Send our state to backend
      await fetch('/api/game-state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId, snake, score })
      })

      // Get other players + shared powerup
      const res = await fetch('/api/game-state')
      const data = await res.json()

      // Update other players (exclude ourselves)
      const others = {}
      Object.entries(data.players || {}).forEach(([id, playerData]) => {
        if (id !== playerId) {
          others[id] = playerData
        }
      })
      setOtherPlayers(others)

      // Update shared powerup (if different from local)
      if (data.powerup) {
        setPowerup(data.powerup)
      }
    } catch (err) {
      console.error('Sync failed:', err)
    }
  }, 150) // Poll every 150ms (matches game speed)

  return () => clearInterval(syncInterval)
}, [gameStarted, gameOver, snake, score, playerId])
```

### Update powerup collision logic (in game loop effect, around line 102):

```jsx
// Check powerup collision
if (powerup && newHead.x === powerup.x && newHead.y === powerup.y) {
  setScore(s => s + powerup.type.points)

  let grow = 0
  if (powerup.type.name === 'grow') {
    grow = 1
  } else if (powerup.type.name === 'mega') {
    grow = 3
  }

  // Claim powerup on backend
  fetch('/api/game-state', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playerId, snake, score, claimPowerup: true })
  })

  setPowerup(null) // Clear locally until backend responds
}
```

### Update render effect to draw other players (add after drawing main snake, around line 166):

```jsx
// Draw other players
Object.entries(otherPlayers).forEach(([id, playerData], playerIndex) => {
  const colors = [
    { head: '#ff00ff', body: '#cc00cc' }, // Purple
    { head: '#00ffff', body: '#00cccc' }, // Cyan
    { head: '#ffff00', body: '#cccc00' }, // Yellow
  ]
  const color = colors[playerIndex % colors.length]

  playerData.snake.forEach((segment, i) => {
    ctx.fillStyle = i === 0 ? color.head : color.body
    ctx.fillRect(
      segment.x * CELL_SIZE + 1,
      segment.y * CELL_SIZE + 1,
      CELL_SIZE - 2,
      CELL_SIZE - 2
    )
  })
})
```

### Update score display to show player count (around line 196):

```jsx
<div style={{ marginBottom: '10px', fontSize: '24px', fontWeight: 'bold' }}>
  Score: {score} | Length: {snake.length} | Players: {Object.keys(otherPlayers).length + 1}
</div>
```

---

## Step 4: Update `package.json` dependencies

In `snake/package.json`, add to dependencies:

```json
"dependencies": {
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "@vercel/kv": "^1.0.1"
}
```

---

## Step 5: Deploy and Test

### Deploy to Vercel:
```bash
cd ..  # Back to project root
vercel --prod
```

### Test multiplayer:
1. Open deployed URL in Chrome
2. Open same URL in Firefox (or Chrome incognito)
3. Press arrow keys in both windows
4. You should see both snakes moving!

**Expected behavior:**
- Each browser controls one snake (green for you, purple/cyan for others)
- Power-ups are shared - first to reach it gets points
- Both players see same power-ups spawn
- Game states sync every 150ms

---

## Troubleshooting

**"Cannot find module '@vercel/kv'"**
- Run: `cd snake && npm install`

**Other player not showing up**
- Check browser console for errors
- Verify `/api/game-state` returns data: `curl https://your-app.vercel.app/api/game-state`
- Make sure both browsers are using the deployed URL (not localhost)

**Power-ups spawning in wrong place**
- Clear KV storage: Add `await kv.flushall()` to game-state.js temporarily

**Local development**
- Run `vercel dev` instead of `npm run dev` to test API routes locally
- KV won't work on `vite dev` - must use Vercel dev server

---

## Final Checklist for 10/10 Points

- [ ] Vercel KV integration installed
- [ ] `api/game-state.js` created at project root
- [ ] `Game.jsx` updated with multiplayer state
- [ ] Sync effect added (polling every 150ms)
- [ ] Other players rendered in different colors
- [ ] Shared powerup logic implemented
- [ ] Deployed to Vercel
- [ ] Tested with 2 browsers
- [ ] Both snakes visible and moving independently
- [ ] Power-ups shared between players

**Estimated time:** 30-45 minutes

🎉 You'll go from 5/10 to 10/10 points!
