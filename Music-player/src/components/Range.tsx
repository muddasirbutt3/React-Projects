import React, { useState } from "react";
import type { MusicType } from "../data/music";

interface RangeType {
  music: MusicType;
  duration: number;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

function Range({ duration, currentTime, setCurrentTime, audioRef }: RangeType) {
  const [dragging, setDragging] = useState(false);
  const [dragValue, setDragValue] = useState(0);

  function formatTime(time: number) {
    if (!Number.isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  }

  function seek(time: number) {
    if (audioRef.current) audioRef.current.currentTime = time;
    setCurrentTime(time);
  }

  function commit() {
    if (!dragging) return;
    setDragging(false);
    seek(dragValue);
  }

  // while dragging, show the drag position; otherwise follow the audio
  const value = dragging ? dragValue : currentTime;
  const progress = duration ? (value / duration) * 100 : 0;

  return (
    <div className="w-full">
      <input
        type="range"
        min={0}
        max={duration || 0}
        step={0.1}
        value={value}
        aria-label="Seek"
        onPointerDown={() => {
          setDragValue(currentTime);
          setDragging(true);
        }}
        onChange={(e) => {
          const time = Number(e.target.value);
          if (dragging) {
            setDragValue(time); // mouse/touch: only move the thumb
          } else {
            seek(time); // keyboard arrows: seek right away
          }
        }}
        onPointerUp={commit}
        onPointerCancel={commit}
        onBlur={commit}
        style={{
          background: `linear-gradient(to right, #1c1917 ${progress}%, #e7e5e4 ${progress}%)`,
        }}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none
          [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-stone-900 [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125
          [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-stone-900"
      />
      <div className="mt-2 flex justify-between text-xs tabular-nums text-stone-500">
        <span>{formatTime(value)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}

export default Range;
