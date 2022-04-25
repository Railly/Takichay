import { useEffect, useState } from "react";

export default function useSongIndex(songs) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(0);

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex]);

  return {
    currentSongIndex,
    nextSongIndex,
    setCurrentSongIndex,
  };
}
