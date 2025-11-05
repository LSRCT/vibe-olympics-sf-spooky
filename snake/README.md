# 🐍 Juego Sssnake

Un juego de serpiente basado en React construido para la competencia Sssnake.

## Características

✅ Mover serpiente con teclas de flecha
✅ 3 potenciadores diferentes (crecer, velocidad, mega)
✅ La serpiente crece cuando come potenciadores
✅ Seguimiento de puntuación basado en puntos y longitud
✅ Fin del juego al colisionar consigo mismo

## Desarrollo

```bash
cd snake
npm install
npm run dev
```

## Despliegue

Desplegar a Vercel:

```bash
vercel --prod
```

## Controles

- **Teclas de flecha**: Mover la serpiente
- **Espacio**: Reiniciar después del fin del juego

## Potenciadores

- 🔴 **Crecer** (+10 pts): Crecer 1 segmento
- 🔵 **Velocidad** (+15 pts): Puntos de bonificación
- 🟡 **Mega** (+25 pts): Crecer 3 segmentos
