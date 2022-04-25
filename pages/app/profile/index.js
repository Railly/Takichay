import Image from "next/image";
import useUser from "hooks/useUser";
import { UpdateModal } from "components/Modal";
import { useForm, useFormState } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { perfilSchema } from "schemas/validation";

export default function App({ Profile, NavBar, user, refetchUser }) {
  const [modal, setModal] = useState(false);
  const [reload, setReload] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(perfilSchema),
  });
  const { dirtyFields } = useFormState({
    control,
  });

  const onSubmit = (data) => {
    let cleanData = Object.keys(data).reduce((acc, key) => {
      if (dirtyFields[key]) {
        acc[key] = data[key];
      }
      return acc;
    }, {});

    if (cleanData?.file) {
      cleanData = {
        ...cleanData,
        file: cleanData.file[0],
      };
    }
    const formData = new FormData();

    Object.keys(cleanData).forEach((key) => {
      formData.append(key, cleanData[key]);
    });

    handleUpdateUser(formData);
  };

  useEffect(() => {
    if (user) {
      setValue("description", user.description);
    }
  }, [user]);

  return (
    <>
      <div className="flex flex-row max-h-screen overflow-y-hidden text-gray-50">
        <NavBar />
        <main className="w-full bg-gray-900">
          <div className="flex flex-row justify-between p-6">
            <div className="flex flex-row">
              <h1 className="text-3xl font-bold">Mi Perfil</h1>
            </div>
            <Profile />
          </div>
          <section className="max-h-screen px-5 pb-24 overflow-y-scroll">
            <section className="grid grid-cols">
              {user && (
                <article className="flex flex-row items-center justify-center">
                  <div className="flex flex-col items-center justify-center">
                    <div>
                      <Image
                        className="w-full rounded-full"
                        src={user.profileImage || "/images/unknown.jpg"}
                        alt={user.name}
                        width={200}
                        height={200}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-start p-4 mx-16 mt-4 border border-green-50">
                    <h1 className="mb-4 ml-4 text-5xl font-bold">
                      {user.name}
                    </h1>
                    <span className="text-gray-100">
                      <b>Correo: </b>
                      {user.email}
                    </span>
                    <span className="text-gray-100">
                      <b>Seguidores: </b>
                      {user.userSubscribers.length}
                    </span>
                    <span className="text-gray-100">
                      <b>Seguidos: </b>
                      {user.userSubscriptions.length}
                    </span>
                    <span>
                      <b>Descripción: </b>
                    </span>
                    {user.description}
                  </div>
                </article>
              )}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid px-16 mt-16 grid-cols gap-x-16 md:grid-cols-3"
              >
                {/* <label className="flex flex-col font-semibold">
                Descripción:
                <textarea
                  className="h-48 px-4 py-2 my-2 overflow-y-hidden text-black resize-none w-72 rounded-xl"
                  // fix the size
                  name="description"
                  {...register("description")}
                />
              </label>
              <div className="md:ml-8">
                <label className="flex flex-col font-semibold">
                  Contraseña:
                  <input
                    className="w-64 px-4 py-2 my-2 text-black border border-gray-400 rounded-full"
                    type="password"
                    name="password"
                    {...register("password")}
                  />
                </label>
                <span className="text-xs text-red-500">
                  {errors?.password && errors?.password?.message}
                </span>
                <label className="flex flex-col font-semibold">
                  Foto de perfil:
                  <div className="relative">
                    <input
                      className="absolute top-0 right-0 w-64 px-4 py-3 my-2 text-black border border-gray-400 rounded-full opacity-0 cursor-pointer"
                      type="file"
                      name="file"
                      {...register("file")}
                      onChange={handleFileChange}
                    />
                  </div>
                  <span className="w-64 px-4 py-4 my-2 text-center bg-black border border-green-500 rounded-full text-gray-50">
                    Subir imagen
                  </span>
                  <span className="text-xs text-red-500">
                    {errors?.file && errors?.file?.message}
                  </span>
                  {file && (
                    <span className="text-sm text-gray-300">
                      {`${file.name} (${Math.round(file.size / 1024)} KB)`}
                    </span>
                  )}
                </label> */}
                <button
                  type="button"
                  onClick={() => {
                    setModal("description");
                  }}
                  className="w-full px-4 py-2 mt-4 text-white transition-colors bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-default"
                >
                  Editar descripción
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setModal("password");
                  }}
                  className="w-full px-4 py-2 mt-4 text-white transition-colors bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-default"
                >
                  Editar Contraseña
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setModal("image");
                  }}
                  className="w-full px-4 py-2 mt-4 text-white transition-colors bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-default"
                >
                  Editar foto de Perfil
                </button>
                {/* </div> */}
              </form>
            </section>
          </section>
        </main>
      </div>
      {modal === "description" && (
        <UpdateModal
          setModal={setModal}
          displayName="descripción"
          field="description"
          refetchUser={refetchUser}
        />
      )}
      {modal === "password" && (
        <UpdateModal
          setModal={setModal}
          displayName="contraseña"
          field="password"
          refetchUser={refetchUser}
        />
      )}
      {modal === "image" && (
        <UpdateModal
          setModal={setModal}
          displayName="foto de perfil"
          field="file"
          refetchUser={refetchUser}
        />
      )}
    </>
  );
}
