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
