import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Play from "svg/Play";
import Back from "svg/Back";
import useAllUsers from "hooks/useAllUsers";

export default function Artist({
  Profile,
  NavBar,
  user,
  refetchUser,
  allUsers,
  refetchAllUsers,
}) {
  const router = useRouter();
  const { authorId } = router.query;
  const [currentSongs, setCurrentSongs] = useState([]);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    refetchUser();
    refetchAllUsers();
  }, []);

  useEffect(() => {
    if (allUsers.length > 0 && authorId) {
      setAuthor(allUsers.find((user) => user._id === authorId));
    }
  }, [allUsers, authorId]);

  const handleSubscribe = () => {
    window
      .fetch(
        `https://takichay.herokuapp.com/api/user/subscribe?userToSubscribeId=${authorId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => res.json())
      .then((data) => {
        refetchAllUsers();
        refetchUser();
      })
      .catch((err) => console.error(err));
  };

  const handleUnsubscribe = () => {
    window
      .fetch(
        `https://takichay.herokuapp.com/api/user/unsubscribe?userToUnsubscribeId=${authorId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => res.json())
      .then((data) => {
        refetchAllUsers();
        refetchUser();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (authorId) {
      window
        .fetch(
          `https://takichay.herokuapp.com/api/songs?authorId=${authorId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => res.json())
        .then((data) => {
          setCurrentSongs(data);
        });
    }
  }, [authorId]);

  return (
    <div className="flex flex-row max-h-screen overflow-y-hidden text-gray-50">
      <NavBar />
      <main className="w-full bg-gray-900">
        <div className="flex flex-row justify-between p-6">
          <Back
            className="cursor-pointer "
            width={30}
            height={30}
            onClick={() => {
              router.back();
            }}
          />
          {author && (
            <div className="flex flex-row items-center">
              <Image
                className="rounded-full"
                src={author?.profileImage || "/images/unknown.jpg"}
                width={50}
                height={50}
              />
              <h1 className="ml-4 text-3xl font-bold">{author.name}</h1>
            </div>
          )}
          <Profile />
        </div>
        <section className="max-h-screen px-5 overflow-y-scroll pb-72">
          {author && user && (
            <>
              <p className="flex justify-center w-full mb-5 text-2xl font-medium">
                {author.description}
              </p>
              <div className="grid grid-cols-3 mb-4 place-items-center">
                <p className="text-sm">
                  Se unió en{" "}
                  {new Date(author.createdAt).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                  })}
                </p>
                {user.userSubscriptions.find((id) => id === authorId) ? (
                  <button
                    className="px-4 py-2 text-white bg-gray-800 rounded-full"
                    onClick={handleUnsubscribe}
                  >
                    Suscrito
                  </button>
                ) : user._id === authorId ? (
                  <button
                    onClick={() => {
                      router.push("/app/profile");
                    }}
                    className="px-4 py-2 text-white bg-gray-800 rounded-full"
                  >
                    Editar Perfil
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 text-white bg-blue-600 rounded-full"
                    onClick={handleSubscribe}
                  >
                    Suscribirse
                  </button>
                )}
                <p className="text-sm">
                  {author.userSongs.length} canciones
                  <span className="text-gray-400"> · </span>
                  {author.userSubscribers.length} seguidores
                </p>
              </div>
            </>
          )}
          <section>
            {currentSongs.length > 0 ? (
              <ul className="grid pt-4 grid-cols gap-x-24 gap-y-16 place-items-center md:grid-cols-2 lg:grid-cols-3">
                {currentSongs.map((song) => (
                  <li
                    key={song._id}
                    onClick={() => {
                      router.push(`/songs/${song._id}`);
                    }}
                    className="cursor-pointer group"
                  >
                    <article className="flex flex-col w-full h-full p-6 transition-colors bg-gray-800 group-hover:bg-gray-700">
                      <div className="relative ">
                        <Image
                          src={song.songImage}
                          alt="profile picture"
                          width={280}
                          height={280}
                        />
                        <Play
                          className="absolute transition-transform cursor-pointer right-2 bottom-4 group-hover:scale-110"
                          fill="text-blue-200"
                          width={60}
                          height={60}
                        />
                      </div>
                      <span className="ml-4 text-lg font-medium">
                        {song.name}
                      </span>
                      <span className="ml-4 font-medium text-gray-400 text-md">
                        {song.songUser.name}
                      </span>
                      <span className="ml-4 text-sm text-gray-400">
                        {song.genre}
                      </span>
                    </article>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-row justify-center">
                <span className="text-gray-100">
                  No tiene canciones todavía
                </span>
              </div>
            )}
          </section>
        </section>
      </main>
    </div>
  );
}
