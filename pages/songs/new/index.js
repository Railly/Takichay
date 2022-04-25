import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { songSchema } from "schemas/validation";
import { SucessModal } from "components/Modal";

export default function App({
  Profile,
  NavBar,
  user,
  refetchAllSongs,
  refetchSongs,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(songSchema),
  });
  const [modal, setModal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [fileImage, setFileImage] = useState(null);
  const [fileAudio, setFileAudio] = useState(null);

  const handleFileChange = (e, field, setFile) => {
    const _file = e.target.files[0];
    setFile(_file);
    register(field).onChange(e);
  };

  const onSubmit = (data) => {
    setDisabled(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("genre", data.genre);
    formData.append("file", fileImage);
    formData.append("song", fileAudio);
    window
      .fetch("https://api-indiesingles.herokuapp.com/api/song", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      })
      .then((res) => res.json())
      .then((res) => {
        refetchAllSongs();
        refetchSongs();
        setModal(true);
        setDisabled(false);
      })
      .catch((err) => {
        console.error(err);
        setDisabled(false);
      });
  };

  return (
    <>
      <div className="flex flex-row max-h-screen overflow-y-hidden text-gray-50">
        <NavBar />
        <main className="w-full bg-gray-900">
          <div className="flex flex-row justify-between p-6">
            <div className="flex flex-row">
              <h1 className="text-3xl font-bold">Crear canción</h1>
            </div>
            <Profile />
          </div>
          <section className="max-h-screen px-5 overflow-y-scroll pb-72">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-row items-center justify-center md:mt-4 md:items-start"
            >
              <div className="flex flex-col items-center justify-center w-full md:w-1/2">
                <div className="flex flex-row items-center justify-between">
                  <div>
                    <label className="flex flex-col font-semibold">
                      Nombre de la canción:
                      <input
                        className="w-64 px-4 py-2 my-2 text-black border border-gray-400 rounded-full"
                        name="name"
                        {...register("name")}
                      />
                    </label>
                    <span className="text-xs text-red-500">
                      {errors?.name && errors?.name?.message}
                    </span>
                    <label className="flex flex-col font-semibold">
                      Descripción:
                      <textarea
                        className="h-48 px-4 py-2 my-2 overflow-y-hidden text-black resize-none w-72 rounded-xl"
                        name="description"
                        {...register("description")}
                      />
                    </label>
                    <span className="text-xs text-red-500">
                      {errors?.description && errors?.description?.message}
                    </span>
                  </div>
                  <div className="ml-8">
                    <label className="flex flex-col font-semibold">
                      Foto de portada:
                      <div className="relative">
                        <input
                          className="absolute top-0 right-0 w-64 px-4 py-3 my-2 text-black border border-gray-400 rounded-full opacity-0 cursor-pointer"
                          type="file"
                          name="file"
                          {...register("file")}
                          onChange={(e) =>
                            handleFileChange(e, "file", setFileImage)
                          }
                        />
                      </div>
                      <span className="w-64 px-4 py-4 my-2 text-center bg-black border border-green-500 rounded-full text-gray-50">
                        Subir imagen
                      </span>
                      {fileImage && (
                        <span className="text-sm text-gray-300">
                          {`${fileImage.name} (${Math.round(
                            fileImage.size / 1024
                          )} KB)`}
                        </span>
                      )}
                    </label>
                    <span className="text-xs text-red-500">
                      {errors?.file && errors?.file?.message}
                    </span>
                    <label className="flex flex-col font-semibold">
                      Subir canción
                      <div className="relative">
                        <input
                          className="absolute top-0 right-0 w-64 px-4 py-3 my-2 text-black border border-gray-400 rounded-full opacity-0 cursor-pointer"
                          type="file"
                          name="song"
                          {...register("song")}
                          onChange={(e) =>
                            handleFileChange(e, "song", setFileAudio)
                          }
                        />
                      </div>
                      <span className="w-64 px-4 py-4 my-2 text-center bg-black border border-green-500 rounded-full text-gray-50">
                        Subir canción
                      </span>
                      {fileAudio && (
                        <span className="text-sm text-gray-300">
                          {`${fileAudio.name} (${Math.round(
                            fileAudio.size / 1024
                          )} KB)`}
                        </span>
                      )}
                    </label>
                    <span className="text-xs text-red-500">
                      {errors?.song && errors?.song?.message}
                    </span>

                    <label className="flex flex-col font-semibold">
                      Género:
                      <input
                        className="w-64 px-4 py-2 my-2 text-black border border-gray-400 rounded-full"
                        name="genre"
                        {...register("genre")}
                      />
                    </label>
                    <span className="text-xs text-red-500">
                      {errors?.genre && errors?.genre?.message}
                    </span>
                  </div>
                </div>
                <button
                  className="w-64 px-4 py-2 my-4 text-white bg-green-500 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={disabled}
                >
                  Crear canción
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
      {modal && <SucessModal setModal={setModal} authorId={user._id} />}
    </>
  );
}
