# 🐍 Juego de Sssnake

Un juego de serpiente basado en React construido para la competencia Sssnake.

## Características

✅ Mueve la serpiente con las teclas de flecha
✅ 3 diferentes power-ups (crecer, velocidad, mega)
✅ La serpiente crece al comer power-ups
✅ Seguimiento de puntuación basado en puntos y longitud
✅ Game over al colisionar consigo misma

## Desarrollo

```bash
cd snake
npm install
npm run dev
```

## Despliegue

Despliega en Vercel:

```bash
vercel --prod
```

## Controles

- **Teclas de Flecha**: Mueve la serpiente
- **Espacio**: Reinicia después del game over

## Power-ups

- 🔴 **Crecer** (+10 pts): Crece 1 segmento
- 🔵 **Velocidad** (+15 pts): Puntos de bonificación
- 🟡 **Mega** (+25 pts): Crece 3 segmentos
