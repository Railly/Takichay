import Image from "next/image";
import Play from "svg/Play";
import { useRouter } from "next/router";

export default function App({ Profile, NavBar, songs }) {
  const router = useRouter();

  return (
    <div className="flex flex-row max-h-screen overflow-y-hidden text-gray-50">
      <NavBar />
      <main className="w-full bg-gray-900">
        <div className="flex flex-row justify-between p-6">
          <div className="flex flex-row">
            <h1 className="text-3xl font-bold">Home</h1>
          </div>
          <button
            onClick={() => {
              router.push("/songs/new");
            }}
            className="z-10 px-4 py-2 mr-8 font-bold text-white bg-green-500 rounded hover:bg-blue-700"
          >
            Agregar canciones
          </button>
          <Profile />
        </div>
        <section className="max-h-screen px-5 overflow-y-scroll pb-72">
          <div className="flex flex-row justify-between">
            <h1 className="text-xl">Tus canciones</h1>
          </div>
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
              <span className="text-gray-100">No tiene canciones todavía</span>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
