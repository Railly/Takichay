import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Back from "svg/Back";
import Play from "svg/Play";
import Image from "next/image";
import Pause from "svg/Pause";
import Modal, { CommentModal } from "components/Modal";
import Song from "svg/Song";

export default function App({
  Profile,
  NavBar,
  allSongs,
  refetchAllSongs,
  refetchSongs,
  user,
  isPlaying,
  setCurrentSongIndex,
  setIsPlaying,
}) {
  const [modal, setModal] = useState(false);
  const [reload, setReload] = useState(false);
  const router = useRouter();
  const { songId } = router.query;
  const [song, setSong] = useState(null);

  const handleDelete = () => {
    window
      .fetch(
        `https://takichay.herokuapp.com/api/song?songId=${songId}`,

        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => res.json())
      .then((data) => {
        refetchSongs();
        refetchAllSongs();
        setModal(false);
        router.back();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (songId) {
      window
        .fetch(`https://takichay.herokuapp.com/api/song?songId=${songId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => res.json())
        .then((data) => {
          const newData = {
            ...data,
            songCommentaries: data.songCommentaries.reverse(),
          };
          setSong(newData);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [songId, reload]);

  const handlePlay = () => {
    const songIndex = allSongs.findIndex((song) => song._id === songId);
    setCurrentSongIndex(songIndex);
    setIsPlaying(true);
  };

  return (
    <>
      <div className="flex flex-row max-h-screen overflow-y-hidden text-gray-50">
        <NavBar />
        <main className="w-full bg-gray-900">
          <div className="flex flex-row justify-between p-6 mb-8">
            <Back
              className="cursor-pointer "
              width={30}
              height={30}
              onClick={() => {
                router.back();
              }}
            />
            {song && (
              <div className="flex flex-row items-center">
                <h1 className="ml-4 text-3xl font-bold">
                  {song.name} -{" "}
                  <span className="text-lg font-mediu">
                    {song.songUser.name}
                  </span>
                </h1>
              </div>
            )}
            <Profile />
          </div>
          <section className="flex justify-center max-h-screen px-5 overflow-y-scroll pb-72">
            <div className="flex flex-row items-center justify-center">
              {song && (
                <>
                  <div>
                    <div className="flex flex-row justify-center">
                      <div className="flex flex-row justify-center w-full">
                        {song && (
                          <article key={song._id}>
                            <article className="flex flex-col w-full h-full p-6 transition-colors bg-gray-800">
                              <div>
                                <Image
                                  src={song.songImage}
                                  alt="profile picture"
                                  width={280}
                                  height={280}
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
                          </article>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center h-full px-8 ml-8 border border-blue-50">
                    <Song width={50} height={50} />
                    <h2 className="mb-2 text-xl font-bold">{song.genre}</h2>
                    <p className="w-56 mb-4 text-center text-md">
                      {song.description}
                    </p>
                    <p className="text-sm">
                      Creada en{" "}
                      {new Date(song.createdAt).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                      })}
                    </p>
                    {isPlaying ? (
                      <Pause
                        className="mt-4 cursor-pointer"
                        onClick={() => setIsPlaying(false)}
                        width={100}
                        height={100}
                      />
                    ) : (
                      <Play
                        className="mt-4 transition-transform cursor-pointer right-2 bottom-4 hover:scale-110"
                        onClick={handlePlay}
                        fill="text-blue-200"
                        width={100}
                        height={100}
                      />
                    )}
                    {user && user._id === song.songUser._id && (
                      <button
                        onClick={() => {
                          setModal("delete");
                        }}
                        className="px-4 py-2 mt-8 font-bold text-white transition-colors bg-red-500 rounded-full hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col h-full px-4 pt-2 ml-8 bg-gray-800 border border-blue-50">
                    <h1 className="mb-2 text-xl font-bold">Comentarios</h1>
                    <span className="pb-2 text-sm text-gray-400">
                      {song.songCommentaries.length} comentarios
                    </span>
                    <div className="flex flex-col overflow-y-scroll">
                      {song.songCommentaries.map((commentary) => (
                        <div className="flex flex-col h-full pl-4 my-4 ml-4 mr-8 transition-colors bg-gray-700 border-l border-gray-300">
                          <div className="flex flex-row items-center justify-between">
                            <span className="py-2 mr-6 font-medium text-md">
                              {commentary.commentaryUser.name}
                            </span>
                            <span className="pr-4 text-sm text-gray-400">
                              {new Date(
                                commentary.createdAt
                              ).toLocaleDateString("es-ES", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <p className="pb-4 text-sm text-gray-300">
                            {commentary.commentary}
                          </p>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        setModal("comment");
                      }}
                      className="px-4 py-2 m-4 font-bold text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-700"
                    >
                      Agregar comentario
                    </button>
                  </div>
                </>
              )}
            </div>
          </section>
        </main>
      </div>
      {modal === "delete" && (
        <Modal setModal={setModal} handleDelete={handleDelete} />
      )}
      {modal === "comment" && (
        <CommentModal
          setModal={setModal}
          songId={songId}
          reload={reload}
          setReload={setReload}
        />
      )}
    </>
  );
}
