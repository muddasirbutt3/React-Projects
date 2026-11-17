import type { RefObject } from "react";
import { FiPause, FiPlay, FiSkipBack, FiSkipForward } from "react-icons/fi";
import { musics, type MusicType } from "../data/music";
import { CURRENT_MUSIC } from "../App";

interface ControlsType {
  selected: MusicType;
  setSelected: (music: MusicType) => void;
  playing: boolean;
  audioRef: RefObject<HTMLAudioElement | null>;
}

function Controls({ selected, setSelected, playing, audioRef }: ControlsType) {
  const index = musics.findIndex((m) => m.id === selected.id);
  const hasPrev = index > 0;
  const hasNext = index < musics.length - 1;

  function select(music: MusicType) {
    localStorage.setItem(CURRENT_MUSIC, JSON.stringify(music));
    setSelected(music);
  }

  function handleNext() {
    const next = musics[index + 1] ?? musics[0];
    if (next) select(musics[index + 1]);
  }

  function handlePrevious() {
    if (hasPrev) select(musics[index - 1]);
  }

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(console.error);
    else audio.pause();
  }

  const sideBtn =
    "flex h-11 w-11 items-center justify-center rounded-full text-stone-700 transition-all duration-200 hover:bg-stone-100 active:scale-90 disabled:pointer-events-none disabled:opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900";

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={handlePrevious}
        disabled={!hasPrev}
        aria-label="Previous track"
        className={sideBtn}
      >
        <FiSkipBack size={20} />
      </button>

      <button
        onClick={togglePlay}
        aria-label={playing ? "Pause" : "Play"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-stone-900 text-white shadow-sm transition-all duration-200 hover:scale-105 hover:bg-stone-800 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2"
      >
        {playing ? (
          <FiPause size={22} />
        ) : (
          <FiPlay size={22} className="translate-x-0.5" />
        )}
      </button>

      <button
        onClick={handleNext}
        disabled={!hasNext}
        aria-label="Next track"
        className={sideBtn}
      >
        <FiSkipForward size={20} />
      </button>
    </div>
  );
}

export default Controls;
