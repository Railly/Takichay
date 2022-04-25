import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Play from "svg/Play";
import Search from "svg/Search";
import Image from "next/image";

export default function App({ Profile, NavBar }) {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm();
  const [users, setUsers] = useState([]);
  const [songs, setSongs] = useState([]);
  const search = watch("search");

  const onSubmit = (data) => {
    handleSearch(data.search);
  };

  const handleSearch = (searchData) => {
    fetch(
      `https://api-indiesingles.herokuapp.com/api/search/name?name=${searchData}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.results.users);
        setSongs(data.results.songs);
      });
  };

  return (
    <div className="flex flex-row max-h-screen overflow-y-hidden text-gray-50">
      <NavBar />
      <main className="w-full bg-gray-900">
        <div className="flex flex-row justify-between p-6">
          <div className="flex flex-row">
            <h1 className="text-3xl font-bold">Buscar</h1>
          </div>
          <Profile />
        </div>
        <section className="max-h-screen px-5 overflow-y-scroll pb-72">
          <div className="flex flex-row justify-between">
            <h1 className="mb-4 text-xl">
              Encuentra canciones y artistas favoritos
            </h1>
          </div>

          <div className="relative">
            <form onSubmit={handleSubmit(onSubmit)}>
              <span className="absolute inset-y-0 left-0 flex items-center h-8 pl-2">
                <Search
                  width={19}
                  height={19}
                  className="text-gray-400 fill-current"
                />
              </span>
              <div className="flex w-full">
                <input
                  type="text"
                  className="w-full h-full py-2 pl-10 mr-4 text-gray-900 rounded-r-none md:rounded"
                  placeholder="Buscar"
                  name="search"
                  {...register("search")}
                />
                <button
                  type="submit"
                  disabled={search === ""}
                  className="px-4 py-2 mr-8 font-bold text-white bg-green-500 rounded w-96 hover:bg-blue-700 text-gray-50 disabled:bg-green-200 disabled:cursor-not-allowed"
                >
                  Buscar
                </button>
              </div>
              <div>
                <h1 className="mt-6 text-2xl font-bold">Canciones</h1>
                {songs.length > 0 ? (
                  <ul className="grid pt-4 grid-cols gap-x-24 gap-y-16 place-items-center md:grid-cols-2 lg:grid-cols-3">
                    {songs.map((song) => (
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
                              fill="text-green-200"
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
                      No se encontraron canciones
                    </span>
                  </div>
                )}
              </div>

              <h1 className="mt-6 text-2xl font-bold">Cantantes</h1>
              <div>
                {users.length > 0 ? (
                  <ul className="grid pt-4 grid-cols gap-x-24 gap-y-16 place-items-center md:grid-cols-2 lg:grid-cols-3">
                    {users.map((user) => (
                      <li
                        key={user._id}
                        onClick={() => {
                          router.push(`/artist/${user._id}`);
                        }}
                        className="cursor-pointer group"
                      >
                        <article className="flex flex-col w-full h-full p-6 transition-colors bg-gray-800 group-hover:bg-gray-700">
                          <Image
                            className="rounded-full"
                            src={user?.profileImage || "/images/unknown.jpg"}
                            alt="profile picture"
                            width={280}
                            height={280}
                          />
                          <span className="ml-4 text-lg font-medium">
                            {user.name}
                          </span>
                          <span className="ml-4 font-medium text-gray-400 text-md">
                            {user.userSubscribers.length} seguidores
                          </span>
                          <span className="ml-4 text-sm text-gray-400">
                            {user.userSubscriptions.length} seguidos
                          </span>
                        </article>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-row justify-center">
                    <span className="text-gray-100">
                      No se encontraron artistas
                    </span>
                  </div>
                )}
              </div>
            </form>
          </div>
          {/* <div className="flex flex-row justify-between">
            <div className="flex flex-row">
              <h1 className="text-xl">Canciones</h1>
            </div>
            <div className="flex flex-row">
              <h1 className="text-xl">Artistas</h1>
            </div>
          </div> */}
        </section>
      </main>
    </div>
  );
}
