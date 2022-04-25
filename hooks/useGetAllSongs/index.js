import { useEffect, useState } from "react";

export default function useGetAllSongs(user) {
  const [allSongs, setAllSongs] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (user) {
      window
        .fetch(
          `https://api-indiesingles.herokuapp.com/api/songs?from=0&limit=0`,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => res.json())
        .then((data) => {
          setAllSongs(data);
        });
    }
  }, [user, reload]);

  return { allSongs, refetchAllSongs: () => setReload(!reload) };
}
