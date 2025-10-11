// Simple in-memory storage (resets on serverless cold start, but works!)
const gameState = {
  players: {},
  powerup: null
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')

  if (req.method === 'POST') {
    // Vercel auto-parses JSON body
    const { playerId, snake, score, claimPowerup } = req.body

    // Save player state
    gameState.players[playerId] = {
      snake,
      score,
      timestamp: Date.now()
    }

    // Clean up inactive players (older than 5 seconds)
    const now = Date.now()
    Object.keys(gameState.players).forEach(id => {
      if (now - gameState.players[id].timestamp > 5000) {
        delete gameState.players[id]
      }
    })

    // Handle powerup claiming
    if (claimPowerup) {
      // Spawn new powerup
      const x = Math.floor(Math.random() * 20)
      const y = Math.floor(Math.random() * 20)
      const types = [
        { name: 'grow', color: '#ff6b6b', points: 10 },
        { name: 'speed', color: '#4ecdc4', points: 15 },
        { name: 'mega', color: '#ffe66d', points: 25 }
      ]
      const type = types[Math.floor(Math.random() * types.length)]
      gameState.powerup = { x, y, type }
    }

    return res.json({ success: true })
  }

  // GET - return all active players + powerup
  // Create or initialize powerup if needed
  if (!gameState.powerup) {
    const x = Math.floor(Math.random() * 20)
    const y = Math.floor(Math.random() * 20)
    const types = [
      { name: 'grow', color: '#ff6b6b', points: 10 },
      { name: 'speed', color: '#4ecdc4', points: 15 },
      { name: 'mega', color: '#ffe66d', points: 25 }
    ]
    const type = types[Math.floor(Math.random() * types.length)]
    gameState.powerup = { x, y, type }
  }

  res.json({ players: gameState.players, powerup: gameState.powerup })
}
