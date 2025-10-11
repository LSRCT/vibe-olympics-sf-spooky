# 👻 Haunted SF Walking Tours

A spooky audio walking tour generator for San Francisco, built for the Vibe Coding Olympics!

## 🎃 Features (Phase 1 - MVP)

- ✅ Beautiful, spooky-themed landing page
- ✅ Tour description input form
- ✅ Generated haunted tour with 5 spooky stops
- ✅ Mock data displaying SF's most haunted locations
- ✅ Fast, responsive React frontend
- ✅ Deployed on Vercel

## 🏗️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v3
- **Backend**: Supabase (configured, not yet integrated)
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
spooky/
├── src/
│   ├── components/
│   │   ├── LandingPage.tsx    # Main landing page
│   │   ├── TourInput.tsx      # Tour description form
│   │   └── TourDisplay.tsx    # Display generated tour
│   ├── App.tsx                # Main app component
│   ├── index.css              # Tailwind styles
│   └── main.tsx               # Entry point
├── public/                     # Static assets
└── package.json
```

## 🎯 Vibe Coding Olympics Scoring

Current progress towards 10 points:

- [ ] Account login (2 pts) - Coming in Phase 2
- [ ] Generate SF Walking Audio Tours (2 pts) - Coming in Phase 2-3
- [x] Make it haunted! (2 pts) - ✅ All tours are spooky!
- [ ] Persistence (1 pt) - Coming in Phase 2
- [ ] Map view (1 pt) - Coming in Phase 4
- [ ] Location Image Generation (1 pt) - Coming in Phase 5
- [ ] Story Image Generation (1 pt) - Coming in Phase 6

**Current Score: 2/10 points** (Spooky theme implemented!)

## 🗺️ Roadmap

### Phase 2: Backend Integration
- [ ] Supabase authentication
- [ ] User account creation and login
- [ ] Save tours to database
- [ ] Load saved tours

### Phase 3: AI-Powered Tours
- [ ] OpenAI/Anthropic integration
- [ ] Generate custom tours based on user input
- [ ] Ensure all tours are spooky!
- [ ] Audio generation (TTS)

### Phase 4: Map Features
- [ ] Google Maps integration
- [ ] Display tour stops on map
- [ ] Interactive route visualization

### Phase 5: Image Generation
- [ ] Location images
- [ ] Story-specific haunted images
- [ ] Image caching

## 🎨 Theme Colors

- **Spooky Purple**: `#6B21A8`
- **Spooky Orange**: `#F97316`
- **Dark Background**: `#1a0b2e`
- **Darker Background**: `#0d0620`

## 📝 Environment Variables

Create a `.env` file in the root directory:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🚢 Deployment

This project is configured for Vercel deployment:

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

The `vercel.json` configuration is already set up.

## 📜 License

MIT

## 🤝 Contributing

Built with 💀 for the Vibe Coding Olympics
