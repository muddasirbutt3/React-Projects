# 2 AM Playlist

**Live Demo:** [twoamplaylist.vercel.app](https://twoamplaylist.vercel.app/)

A clean, minimal music player built with React and TypeScript. A centered player card with an optional playlist panel beside it, smooth animations, and a layout that works on desktop and mobile.

## Features

- Play, pause, next and previous controls
- Seek bar with smooth dragging (seeks once on release, so there is no stutter)
- Auto-play of the next track when a song ends
- Collapsible playlist that slides open beside the player (below it on mobile)
- Player card and playlist panel share the same fixed height on desktop
- Remembers the last played track and playlist visibility between visits (`localStorage`)
- Cover art with a fallback icon when an image is missing
- Spacebar toggles play and pause
- Fully responsive layout

## Tech Stack

- [React](https://react.dev/) with TypeScript
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/) (Feather set)

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm (or yarn / pnpm)

### Install and run

```bash
# install dependencies
npm install

# start the dev server
npm run dev
```

Then open the local URL shown in the terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

The live version is deployed on [Vercel](https://vercel.com/).

## Project Structure

```
public/
├── favicon.svg
src/
├── components/
│   ├── Controls.tsx       # previous / play-pause / next buttons
│   ├── PlayList.tsx       # scrollable list of tracks
│   ├── Range.tsx          # seek bar and time labels
│   └── Thunmbnail.tsx     # cover art, title and artist
├── data/
│   └── music.ts           # track list and MusicType
├── App.tsx                # layout, audio element, shared state
├── index.css              # Tailwind + custom animations and scrollbar
└── main.tsx
```

## Adding Songs

Add an entry to the `musics` array in `src/data/music.ts`:

```ts
{
  id: 1,
  title: "Dandelion",
  thunmbnail: "/thunmbnail/dandelion.jpg",
  src: "https://example.com/audio/dandelion.mp4",
  artist: "Ariana Grande",
},
```

| Field        | Description                                                       |
| ------------ | ----------------------------------------------------------------- |
| `id`         | Unique number. Keep ids sequential, starting at 1.                |
| `title`      | Song title.                                                       |
| `artist`     | Artist name.                                                      |
| `thunmbnail` | Path to the cover image inside `public/`. It must start with `/`. |
| `src`        | URL of the audio file (local file in `public/` or a hosted URL).  |

Cover images go in `public/thunmbnail/`. If an image is missing or fails to load, a music icon is shown instead.

## Keyboard Shortcuts

| Key       | Action                            |
| --------- | --------------------------------- |
| `Space`   | Play / pause                      |
| `←` / `→` | Seek when the seek bar is focused |

## How It Works

- **Audio state:** `App.tsx` owns the `<audio>` element and passes a ref plus state down to `Controls`, `Range`, `Thunmbnail` and `PlayList`.
- **Persistence:** the selected track (`current-music`) and the playlist toggle (`play-state`) are stored in `localStorage`.
- **Auto-advance:** when a track ends, the next one is loaded and started. On the last track, playback stops.
- **Seeking:** the seek bar only moves the thumb while you drag and applies the new position once on release.

## Customization

- **Colors:** the UI uses Tailwind's `stone` palette. Change the classes (for example `bg-stone-900`) to restyle it.
- **Card size:** the desktop card and playlist height is set to `lg:h-[640px]` in `App.tsx`.
- **Animations:** the fade-in keyframes (`animate-pulse-once`) and the slim scrollbar (`thin-scroll`) live in `src/index.css`.
- **Favicon:** edit `public/favicon.svg`.

## Troubleshooting

- **Cover image not showing:** make sure the file is in `public/thunmbnail/`, the path in `music.ts` starts with `/`, and the filename and extension match exactly (including case).
- **Audio will not play:** check that the `src` URL is reachable and the file format is supported by your browser.
- **Old favicon still showing:** browsers cache favicons. Hard refresh with `Ctrl + Shift + R`.

## Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start the development server |
| `npm run build`   | Create a production build    |
| `npm run preview` | Preview the production build |
| `npm run lint`    | Run ESLint (if configured)   |

## License

Add your preferred license here (for example MIT).
