import { useEffect, useState } from "react";

export default function useSongs(user) {
  const [songs, setSongs] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (user) {
      window
        .fetch(
          `https://api-indiesingles.herokuapp.com/api/songs?authorId=${user._id}&from=0&limit=0`,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => res.json())
        .then((data) => {
          setSongs(data);
        });
    }
  }, [user, reload]);

  return { songs, refetchSongs: () => setReload(!reload) };
}
