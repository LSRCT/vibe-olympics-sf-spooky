# 🐍 Juego de Sssnake

Un juego de serpiente basado en React construido para la competencia Sssnake.

## Características

✅ Mueve la serpiente con las flechas del teclado
✅ 3 potenciadores diferentes (crecer, velocidad, mega)
✅ La serpiente crece al comer potenciadores
✅ Seguimiento de puntuación basado en puntos y longitud
✅ Fin del juego al chocar consigo misma

## Desarrollo

```bash
cd snake
npm install
npm run dev
```

## Despliegue

Desplegar en Vercel:

```bash
vercel --prod
```

## Controles

- **Flechas del teclado**: Mover la serpiente
- **Espacio**: Reiniciar después del fin del juego

## Potenciadores

- 🔴 **Crecer** (+10 pts): Crece 1 segmento
- 🔵 **Velocidad** (+15 pts): Puntos de bonificación
- 🟡 **Mega** (+25 pts): Crece 3 segmentos
