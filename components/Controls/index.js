import React from "react";
import Pause from "svg/Pause";
import Play from "svg/Play";
import SkipNext from "svg/SkipNext";
import SkipPrevious from "svg/SkipPrevious";

function Controls({ isPlaying, setIsPlaying = () => {}, SkipSong }) {
  return (
    <div className="flex justify-center justify-self-center">
      <button className="preview-btn " onClick={() => SkipSong(false)}>
        <SkipPrevious className="scale-150 -translate-x-4" />
      </button>
      <button className="play-btn" onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? (
          <Pause width={60} height={60} />
        ) : (
          <Play
            playcolor="#262626"
            playbackgroundcolor="#fff"
            width={60}
            height={60}
          />
        )}
      </button>
      <button className="skip-btn" onClick={() => SkipSong(true)}>
        <SkipNext className="scale-150 translate-x-4" />
      </button>
    </div>
  );
}

export default Controls;
