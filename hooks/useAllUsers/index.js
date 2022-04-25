import { useEffect, useState } from "react";

export default function useAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    window
      .fetch(
        "https://api-indiesingles.herokuapp.com/api/users?from=0&limit=10",
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data);
      });
  }, [reload]);

  return { allUsers, refetchAllUsers: () => setReload(!reload) };
}
