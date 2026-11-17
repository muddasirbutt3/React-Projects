import { useEffect, useRef, useState } from "react";
import { FiList, FiX } from "react-icons/fi";
import PlayList from "./components/PlayList";
import { musics, type MusicType } from "./data/music";
import Controls from "./components/Controls";
import Thunmbnail from "./components/Thunmbnail";
import Range from "./components/Range";
export const CURRENT_MUSIC = "current-music";
export const PLAY_STATE = "play-state";

function App() {
  const [mounted, setMounted] = useState(false);
  const [showList, setShowList] = useState<boolean>(() => {
    const data = localStorage.getItem(PLAY_STATE);
    return data ? JSON.parse(data) : false;
  });
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const shouldAutoPlay = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState<MusicType>(() => {
    const data = localStorage.getItem(CURRENT_MUSIC);
    return data ? JSON.parse(data) : musics[0];
  });

  function toggleShowList() {
    localStorage.setItem(PLAY_STATE, JSON.stringify(!showList));
    setShowList((p) => !p);
  }
  function handleEnded() {
    const index = musics.findIndex((m) => m.id === selectedMusic.id);
    const next = musics[index + 1];
    if (!next) return; // last track: just stop

    shouldAutoPlay.current = true;
    localStorage.setItem(CURRENT_MUSIC, JSON.stringify(next));
    setSelectedMusic(next);
  }
  // entrance animation
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    if (playing || shouldAutoPlay.current) {
      shouldAutoPlay.current = false;
      audio.play().catch(console.error);
    }
  }, [selectedMusic]);

  // Space = play / pause
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.code !== "Space") return;
      const tag = (e.target as HTMLElement).tagName;
      if (["BUTTON", "INPUT", "AUDIO", "TEXTAREA"].includes(tag)) return;
      e.preventDefault();
      const audio = audioRef.current;
      if (!audio) return;
      audio.paused ? audio.play().catch(console.error) : audio.pause();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-100 px-4 py-6 text-stone-900">
      <div
        className={`flex w-full flex-col items-center transition-all duration-700 ease-out lg:w-auto lg:flex-row lg:items-start ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {/* Player card */}
        <section className="flex w-full max-w-md shrink-0 flex-col gap-5 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6 lg:h-[640px] lg:w-96">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* equalizer */}
              <div className="flex h-4 items-end gap-0.5">
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    style={{ animationDelay: `${delay}ms` }}
                    className={`w-1 rounded-sm bg-stone-900 transition-all ${
                      playing ? "h-4 animate-pulse" : "h-1.5"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                {playing ? "Now Playing" : "Paused"}
              </span>
            </div>

            <button
              onClick={toggleShowList}
              aria-label={showList ? "Hide playlist" : "Show playlist"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 text-stone-700 transition-all duration-200 hover:border-stone-900 hover:bg-stone-900 hover:text-white active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2"
            >
              <span
                className={`transition-transform duration-300 ${
                  showList ? "rotate-90" : "rotate-0"
                }`}
              >
                {showList ? <FiX size={16} /> : <FiList size={16} />}
              </span>
            </button>
          </header>

          {/* Thumbnail */}
          <Thunmbnail music={selectedMusic} playing={playing} />

          <div className="flex shrink-0 flex-col gap-4">
            <Range
              music={selectedMusic}
              duration={duration}
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
              audioRef={audioRef}
            />

            <audio
              ref={audioRef}
              key={selectedMusic.id}
              controls
              preload="metadata"
              className="hidden"
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              src={selectedMusic.src}
              onEnded={handleEnded}
            />

            <div className="flex justify-center">
              <Controls
                selected={selectedMusic}
                setSelected={setSelectedMusic}
                playing={playing}
                audioRef={audioRef}
              />
            </div>
          </div>
        </section>

        {/* Playlist: always mounted so it can animate in and out */}
        <aside
          aria-hidden={!showList}
          className={`w-full max-w-md overflow-hidden transition-all duration-500 ease-in-out lg:max-w-none ${
            showList
              ? "mt-4 max-h-[26rem] opacity-100 lg:ml-5 lg:mt-0 lg:max-h-[640px] lg:w-96"
              : "pointer-events-none mt-0 max-h-0 opacity-0 lg:ml-0 lg:max-h-[640px] lg:w-0"
          }`}
        >
          <div className="flex h-[26rem] w-full flex-col rounded-2xl border border-stone-200 bg-stone-50 p-4 lg:h-[640px] lg:w-96">
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                Playlist
              </h2>
              <span className="text-xs text-stone-400">
                {musics.length} tracks
              </span>
            </div>
            <div className="thin-scroll min-h-0 flex-1 overflow-y-auto pr-1">
              <PlayList
                selected={selectedMusic}
                setSelected={setSelectedMusic}
                playing={playing}
              />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default App;
