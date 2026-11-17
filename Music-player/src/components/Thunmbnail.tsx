import { useState } from "react";
import { FiMusic } from "react-icons/fi";
import type { MusicType } from "../data/music";

function Thunmbnail({
  music,
  playing = false,
}: {
  music: MusicType;
  playing?: boolean;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <div className="flex min-h-0 flex-1 items-center justify-center">
        {/* key resets the error state when the song changes */}
        <Cover key={music.id} src={music.thunmbnail} playing={playing} />
      </div>

      <div key={music.id} className="animate-pulse-once min-w-0 shrink-0">
        <h2 className="truncate text-xl font-semibold leading-tight tracking-tight text-stone-900">
          {music.title}
        </h2>
        <p className="mt-0.5 truncate text-sm leading-snug text-stone-500">
          {music.artist}
        </p>
      </div>
    </div>
  );
}

function Cover({ src, playing }: { src?: string; playing: boolean }) {
  const [failed, setFailed] = useState(false);
  // tolerate entries saved without the leading slash
  const url = src
    ? src.startsWith("/") || src.startsWith("http")
      ? src
      : `/${src}`
    : "";

  return (
    <div
      className={`aspect-square h-full max-w-full overflow-hidden rounded-xl border border-stone-200 bg-stone-100 transition-transform duration-500 ease-out ${
        playing ? "scale-100" : "scale-95"
      }`}
    >
      {url && !failed ? (
        <img
          src={url}
          alt=""
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-stone-400">
          <FiMusic size={56} strokeWidth={1.25} />
        </div>
      )}
    </div>
  );
}

export default Thunmbnail;
