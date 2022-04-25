import Player from "components/Player";

export default function MediaPlayerBar({
  isPlaying,
  setIsPlaying,
  songs,
  currentSongIndex,
  nextSongIndex,
  setCurrentSongIndex,
}) {
  return (
    <div className="fixed bottom-0 right-0 w-full bg-gray-800 border border-t-2 border-gray-900 text-gray-50">
      {songs.length > 0 && (
        <Player
          className="flex flex-col items-center"
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          nextSongIndex={nextSongIndex}
          songs={songs}
        />
      )}
    </div>
  );
}
