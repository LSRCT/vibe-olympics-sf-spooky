# 👻 Haunted SF Walking Tours

A spooky audio walking tour generator for San Francisco, built for the Vibe Coding Olympics!

## 🎃 Features

- ✅ **Authentication**: User account creation, login/logout with Supabase
- ✅ **Guest Mode**: Continue without account for quick access
- ✅ Beautiful, spooky-themed landing page
- ✅ Tour description input form
- ✅ Generated haunted tour with 5 spooky stops
- ✅ Mock data displaying SF's most haunted locations
- ✅ Fast, responsive React frontend
- ✅ User session persistence
- ✅ Ready for Vercel deployment

## 🏗️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v3
- **Backend**: Supabase (Auth integrated ✅)
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
│   │   ├── Auth.tsx           # Login/signup component
│   │   ├── LandingPage.tsx    # Main landing page
│   │   ├── TourInput.tsx      # Tour description form
│   │   └── TourDisplay.tsx    # Display generated tour
│   ├── lib/
│   │   └── supabase.ts        # Supabase client config
│   ├── App.tsx                # Main app with auth
│   ├── index.css              # Tailwind styles
│   └── main.tsx               # Entry point
├── public/                     # Static assets
└── package.json
```

## 🎯 Vibe Coding Olympics Scoring

Current progress towards 10 points:

- [x] **Account login (2 pts)** - ✅ Supabase auth with signup/login!
- [ ] Generate SF Walking Audio Tours (2 pts) - Next priority
- [x] **Make it haunted! (2 pts)** - ✅ All tours are spooky!
- [ ] Persistence (1 pt) - Easy next step
- [ ] Map view (1 pt) - Coming soon
- [ ] Location Image Generation (1 pt) - Future
- [ ] Story Image Generation (1 pt) - Future

**Current Score: 4/10 points** (40% complete!) 🎉

## 🗺️ Roadmap

### Phase 2: Completed! ✅
- [x] Supabase authentication
- [x] User account creation and login
- [x] Session management and logout
- [x] Guest mode option

### Phase 3: Persistence (Next!)
- [ ] Save tours to database
- [ ] Load saved tours
- [ ] User tour history

### Phase 4: AI-Powered Tours
- [ ] OpenAI/Anthropic integration
- [ ] Generate custom tours based on user input
- [ ] Ensure all tours are spooky!
- [ ] Audio generation (TTS)

### Phase 5: Map Features
- [ ] Google Maps integration
- [ ] Display tour stops on map
- [ ] Interactive route visualization

### Phase 6: Image Generation
- [ ] Location images
- [ ] Story-specific haunted images
- [ ] Image caching

## 🎨 Theme Colors

- **Spooky Purple**: `#6B21A8`
- **Spooky Orange**: `#F97316`
- **Dark Background**: `#1a0b2e`
- **Darker Background**: `#0d0620`

## 📝 Environment Variables

Create a `.env` file in the `spooky/` directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Note**: Vite requires env vars to be prefixed with `VITE_` to expose them to the client.

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
