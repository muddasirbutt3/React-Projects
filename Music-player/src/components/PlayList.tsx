import { FiMusic, FiPause, FiPlay } from "react-icons/fi";
import { musics, type MusicType } from "../data/music";
import { CURRENT_MUSIC } from "../App";

interface PlayListType {
  selected: MusicType;
  setSelected: (music: MusicType) => void;
  playing?: boolean;
}

function PlayList({ selected, setSelected, playing = false }: PlayListType) {
  function handleClick(music: MusicType) {
    localStorage.setItem(CURRENT_MUSIC, JSON.stringify(music));
    setSelected(music);
  }

  return (
    <div className="flex flex-col gap-2">
      {musics.map((music, i) => {
        const active = selected.id === music.id;

        return (
          <button
            key={music.id}
            type="button"
            onClick={() => handleClick(music)}
            aria-current={active}
            style={{ animationDelay: `${i * 40}ms` }}
            className={`animate-pulse-once group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 ${
              active
                ? "border-stone-900 bg-stone-900 text-white shadow-sm"
                : "border-stone-200 bg-white text-stone-900 hover:border-stone-400 hover:bg-stone-50 active:scale-[0.99]"
            }`}
          >
            {/* Icon / state */}
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                active
                  ? "bg-white/10 text-white"
                  : "bg-stone-100 text-stone-500 group-hover:bg-stone-200"
              }`}
            >
              {active ? (
                playing ? (
                  <FiPause size={16} />
                ) : (
                  <FiPlay size={16} className="translate-x-px" />
                )
              ) : (
                <FiMusic size={16} />
              )}
            </span>

            {/* Text */}
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold tracking-tight">
                {music.title}
              </span>
              <span
                className={`block truncate text-xs ${
                  active ? "text-stone-300" : "text-stone-500"
                }`}
              >
                {music.artist}
              </span>
            </span>

            {/* Equalizer on the active track */}
            {active && (
              <span className="flex h-4 shrink-0 items-end gap-0.5" aria-hidden>
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    style={{ animationDelay: `${delay}ms` }}
                    className={`w-0.5 rounded-sm bg-white ${
                      playing ? "h-4 animate-pulse" : "h-1.5"
                    }`}
                  />
                ))}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default PlayList;
