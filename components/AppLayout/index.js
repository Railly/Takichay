import useSongs from "hooks/useSongs";
import useSongIndex from "hooks/useSongIndex";
import useUser from "hooks/useUser";
import useAllUsers from "hooks/useAllUsers";
import Profile from "components/Profile";
import NavBar from "components/NavBar";
import MediaPlayerBar from "components/MediaPlayerBar";
import { useState } from "react";
import useGetAllSongs from "hooks/useGetAllSongs";

export default function AppLayout({ Component, pageProps }) {
  const { user, refetchUser } = useUser();
  const { allUsers, refetchAllUsers } = useAllUsers();
  const { songs, refetchSongs } = useSongs(user);
  const { allSongs, refetchAllSongs } = useGetAllSongs(user);
  const [isPlaying, setIsPlaying] = useState(false);
  const { currentSongIndex, nextSongIndex, setCurrentSongIndex } =
    useSongIndex(songs);
  return (
    <>
      <Component
        user={user}
        refetchUser={refetchUser}
        songs={songs}
        refetchAllSongs={refetchAllSongs}
        refetchSongs={refetchSongs}
        allSongs={allSongs}
        allUsers={allUsers}
        refetchAllUsers={refetchAllUsers}
        setCurrentSongIndex={setCurrentSongIndex}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        NavBar={() => NavBar(allUsers, user)}
        Profile={() => Profile(user)}
        {...pageProps}
      />
      {user && allSongs.length > 0 && (
        <MediaPlayerBar
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          songs={allSongs}
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          nextSongIndex={nextSongIndex}
        />
      )}
    </>
  );
}
