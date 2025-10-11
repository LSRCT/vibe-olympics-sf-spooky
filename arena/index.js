const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Calculate distance between two points
function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Get the best move direction
function getBestMove(gameState) {
  const { player, coins, bombs, width, height } = gameState;
  const { x, y } = player;

  // Possible moves: up, down, left, right, stay
  const moves = [
    { direction: 'up', x: x, y: y - 1 },
    { direction: 'down', x: x, y: y + 1 },
    { direction: 'left', x: x - 1, y: y },
    { direction: 'right', x: x + 1, y: y },
    { direction: 'stay', x: x, y: y }
  ];

  // Filter out moves that go out of bounds
  const validMoves = moves.filter(move =>
    move.x >= 0 && move.x < width && move.y >= 0 && move.y < height
  );

  // Score each move
  const scoredMoves = validMoves.map(move => {
    let score = 0;

    // Avoid bombs - high penalty for being near bombs
    for (const bomb of bombs) {
      const bombDist = distance(move.x, move.y, bomb.x, bomb.y);
      if (bombDist === 0) {
        score -= 10000; // Suicide move
      } else if (bombDist < 2) {
        score -= 500; // Very close to bomb
      } else if (bombDist < 3) {
        score -= 100; // Close to bomb
      }
    }

    // Pursue closest coin
    if (coins && coins.length > 0) {
      let closestCoinDist = Infinity;
      for (const coin of coins) {
        const coinDist = distance(move.x, move.y, coin.x, coin.y);
        closestCoinDist = Math.min(closestCoinDist, coinDist);
      }
      // Higher score for being closer to coins
      score += (100 - closestCoinDist * 10);

      // Big bonus if we're on a coin
      for (const coin of coins) {
        if (move.x === coin.x && move.y === coin.y) {
          score += 1000;
        }
      }
    }

    return { ...move, score };
  });

  // Sort by score and pick the best move
  scoredMoves.sort((a, b) => b.score - a.score);

  return scoredMoves[0].direction;
}

// Main endpoint that receives game state
app.post('/', (req, res) => {
  try {
    const gameState = req.body;
    console.log('Received game state:', JSON.stringify(gameState, null, 2));

    const move = getBestMove(gameState);
    console.log('Sending move:', move);

    res.json({ move });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ move: 'stay' });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Vibe Arena Bot is running' });
});

app.listen(PORT, () => {
  console.log(`Bot server running on port ${PORT}`);
});
