export default function useUpdateUser(refetchUser, setModal) {
  const handleUpdateUser = (formData) => {
    fetch("https://takichay.herokuapp.com/api/user", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          refetchUser();
          setModal(false);
        }
      })
      .catch((err) => console.error(err));
  };

  return handleUpdateUser;
}
