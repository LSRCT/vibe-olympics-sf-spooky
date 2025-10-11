import React, { useEffect, useRef, useState } from 'react'

const GRID_SIZE = 20
const CELL_SIZE = 25
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_DIRECTION = { x: 1, y: 0 }
const GAME_SPEED = 150

const POWERUP_TYPES = [
  { name: 'grow', color: '#ff6b6b', points: 10 },
  { name: 'speed', color: '#4ecdc4', points: 15 },
  { name: 'mega', color: '#ffe66d', points: 25 }
]

export default function Game() {
  const canvasRef = useRef(null)
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [powerup, setPowerup] = useState(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const directionRef = useRef(INITIAL_DIRECTION)

  // Generate random powerup
  const spawnPowerup = () => {
    const x = Math.floor(Math.random() * GRID_SIZE)
    const y = Math.floor(Math.random() * GRID_SIZE)
    const type = POWERUP_TYPES[Math.floor(Math.random() * POWERUP_TYPES.length)]
    setPowerup({ x, y, type })
  }

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted && !gameOver) {
        setGameStarted(true)
        spawnPowerup()
      }

      if (gameOver && e.key === ' ') {
        // Reset game
        setSnake(INITIAL_SNAKE)
        setDirection(INITIAL_DIRECTION)
        directionRef.current = INITIAL_DIRECTION
        setScore(0)
        setGameOver(false)
        setGameStarted(false)
        setPowerup(null)
        return
      }

      const key = e.key
      const curr = directionRef.current

      if (key === 'ArrowUp' && curr.y === 0) {
        const newDir = { x: 0, y: -1 }
        setDirection(newDir)
        directionRef.current = newDir
      } else if (key === 'ArrowDown' && curr.y === 0) {
        const newDir = { x: 0, y: 1 }
        setDirection(newDir)
        directionRef.current = newDir
      } else if (key === 'ArrowLeft' && curr.x === 0) {
        const newDir = { x: -1, y: 0 }
        setDirection(newDir)
        directionRef.current = newDir
      } else if (key === 'ArrowRight' && curr.x === 0) {
        const newDir = { x: 1, y: 0 }
        setDirection(newDir)
        directionRef.current = newDir
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameOver, gameStarted])

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const gameLoop = setInterval(() => {
      setSnake(prevSnake => {
        const head = prevSnake[0]
        const newHead = {
          x: (head.x + directionRef.current.x + GRID_SIZE) % GRID_SIZE,
          y: (head.y + directionRef.current.y + GRID_SIZE) % GRID_SIZE
        }

        // Check self collision
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true)
          return prevSnake
        }

        let newSnake = [newHead, ...prevSnake]
        let grow = 0

        // Check powerup collision
        if (powerup && newHead.x === powerup.x && newHead.y === powerup.y) {
          setScore(s => s + powerup.type.points)

          if (powerup.type.name === 'grow') {
            grow = 1
          } else if (powerup.type.name === 'mega') {
            grow = 3
          }
          // Speed powerup just gives points, no special effect in single player

          spawnPowerup()
        }

        // Remove tail if not growing
        if (grow === 0) {
          newSnake.pop()
        } else {
          // Keep extra segments for growth
          for (let i = 1; i < grow; i++) {
            newSnake.push(prevSnake[prevSnake.length - 1])
          }
        }

        return newSnake
      })
    }, GAME_SPEED)

    return () => clearInterval(gameLoop)
  }, [gameStarted, gameOver, powerup])

  // Render
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    // Clear canvas
    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

    // Draw grid
    ctx.strokeStyle = '#2a2a2a'
    ctx.lineWidth = 1
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * CELL_SIZE, 0)
      ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i * CELL_SIZE)
      ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE)
      ctx.stroke()
    }

    // Draw snake
    snake.forEach((segment, i) => {
      ctx.fillStyle = i === 0 ? '#00ff00' : '#00cc00'
      ctx.fillRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      )
    })

    // Draw powerup
    if (powerup) {
      ctx.fillStyle = powerup.type.color
      ctx.beginPath()
      ctx.arc(
        powerup.x * CELL_SIZE + CELL_SIZE / 2,
        powerup.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 3,
        0,
        Math.PI * 2
      )
      ctx.fill()
    }
  }, [snake, powerup])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      color: '#fff',
      fontFamily: 'monospace'
    }}>
      <h1 style={{ marginBottom: '20px' }}>🐍 Sssnake Game</h1>

      <div style={{ marginBottom: '10px', fontSize: '24px', fontWeight: 'bold' }}>
        Score: {score} | Length: {snake.length}
      </div>

      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        style={{
          border: '2px solid #333',
          borderRadius: '4px'
        }}
      />

      {!gameStarted && !gameOver && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>Press any arrow key to start!</p>
          <p style={{ fontSize: '14px', color: '#888' }}>
            Use arrow keys to control the snake
          </p>
        </div>
      )}

      {gameOver && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h2 style={{ color: '#ff6b6b' }}>Game Over!</h2>
          <p>Final Score: {score}</p>
          <p>Snake Length: {snake.length}</p>
          <p style={{ marginTop: '10px' }}>Press SPACE to restart</p>
        </div>
      )}

      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666', textAlign: 'center' }}>
        <div style={{ marginBottom: '10px' }}>Power-ups:</div>
        <div style={{ display: 'flex', gap: '15px' }}>
          {POWERUP_TYPES.map(type => (
            <div key={type.name}>
              <span style={{ color: type.color }}>●</span> {type.name} (+{type.points})
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
