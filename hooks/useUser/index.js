import { useEffect, useState } from "react";

export default function useUser() {
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      window
        .fetch("https://takichay.herokuapp.com/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  }, [reload]);

  return { user, refetchUser: () => setReload(!reload) };
}
