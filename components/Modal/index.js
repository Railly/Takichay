import useUpdateUser from "hooks/useUpdateUser";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Modal({ setModal, handleDelete }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-center px-4 pb-4 bg-gray-800 bg-opacity-60 sm:inset-0 sm:p-0">
      <div className="shadow bg-gray-50 sm:rounded-lg sm:overflow-hidden">
        <div className="flex flex-col break-words bg-white">
          <div className="flex-1 p-4">
            <h1 className="text-base font-bold text-gray-700">
              Eliminar canción
            </h1>
            <p className="text-base text-gray-700">
              ¿Estás seguro de que quieres eliminar esta canción?
            </p>
          </div>
          <div className="flex-1 p-4 text-gray-50">
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setModal(false);
                }}
                className="px-4 py-2 font-bold text-white transition-colors bg-red-500 rounded-full hover:bg-red-700"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 ml-4 font-bold text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SucessModal({ setModal, authorId }) {
  const router = useRouter();
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-center px-4 pb-4 bg-gray-800 bg-opacity-60 sm:inset-0 sm:p-0">
      <div className="shadow bg-gray-50 sm:rounded-lg sm:overflow-hidden">
        <div className="flex flex-col break-words bg-white">
          <div className="flex-1 p-4">
            <h1 className="text-base font-bold text-gray-700"> Éxito</h1>
            <p className="text-base text-gray-700">
              La canción se ha creado con éxito.
            </p>
          </div>
          <div className="flex-1 p-4 text-gray-50">
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setModal(false);
                  router.back();
                }}
                className="px-4 py-2 ml-4 font-bold text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-700"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CommentModal({ setModal, songId, setReload, reload }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const newData = {
      ...data,
      songId,
    };

    fetch("https://takichay.herokuapp.com/api/commentarySong", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setReload(!reload);
          setModal(false);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-center px-4 pb-4 bg-gray-800 bg-opacity-60 sm:inset-0 sm:p-0">
      <div className="shadow bg-gray-50 sm:rounded-lg sm:overflow-hidden">
        <div className="flex flex-col break-words bg-white">
          <div className="flex-1 px-4 pt-4">
            <h1 className="text-base font-bold text-gray-700"> Comentar</h1>
            <p className="text-base text-gray-700">
              Dile al artista qué te parece la canción.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 p-4 text-gray-50"
          >
            <textarea
              name="comment"
              className="w-full h-32 p-4 text-gray-900 border-2 border-gray-400 rounded-lg "
              placeholder="Escribe tu comentario aquí"
              {...register("commentary")}
            ></textarea>
            <div className="flex justify-end pt-2">
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setModal(false);
                  }}
                  className="px-4 py-2 ml-4 font-bold text-white transition-colors bg-red-500 rounded-full hover:bg-red-700"
                >
                  Cancelar
                </button>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 ml-4 font-bold text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-700"
                >
                  Enviar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function UpdateModal({ setModal, field, refetchUser, displayName }) {
  const { register, handleSubmit } = useForm();
  const [file, setFile] = useState(null);

  const handleUpdateUser = useUpdateUser(refetchUser, setModal);

  const onSubmit = (data) => {
    const formData = new FormData();
    if (field === "file") {
      formData.append(field, data.file[0]);
    } else {
      formData.append(field, data[field]);
    }
    handleUpdateUser(formData);
  };

  const handleFileChange = (e) => {
    const _file = e.target.files[0];
    setFile(_file);
    register("file").onChange(e);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-center px-4 pb-4 bg-gray-800 bg-opacity-60 sm:inset-0 sm:p-0">
      <div className="shadow bg-gray-50 sm:rounded-lg sm:overflow-hidden">
        <div className="flex flex-col break-words bg-white">
          <div className="flex-1 px-4 pt-4">
            <h1 className="text-base font-bold text-gray-700"> Actualizar</h1>
            <p className="text-base text-gray-700">
              Actualización de {displayName}
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 p-4 text-gray-50"
          >
            {field === "description" && (
              <textarea
                name={field}
                className="w-full h-32 p-4 text-gray-900 border-2 border-gray-400 rounded-lg "
                placeholder={`Escribe tu ${field} aquí`}
                {...register(field)}
              ></textarea>
            )}
            {field === "password" && (
              <input
                name={field}
                type={field === "password" ? "password" : "text"}
                className="w-full p-4 text-gray-900 border-2 border-gray-400 rounded-lg "
                placeholder={`Escribe tu ${field} aquí`}
                {...register(field)}
              />
            )}
            {field === "file" && (
              <div className="flex flex-col font-semibold">
                <div className="relative">
                  <input
                    className="absolute top-0 right-0 w-64 px-4 py-3 my-2 text-black border border-gray-400 rounded-full opacity-0 cursor-pointer"
                    type="file"
                    name={field}
                    {...register(field)}
                    onChange={handleFileChange}
                  />
                </div>
                <span className="w-64 px-4 py-4 my-2 text-center bg-black border border-blue-500 rounded-full text-gray-50">
                  Subir imagen
                </span>
                {/* <span className="text-xs text-red-500">
                  {errors?.file && errors?.file?.message}
                </span> */}
                {file && (
                  <span className="text-sm text-gray-700">
                    {`${file.name} (${Math.round(file.size / 1024)} KB)`}
                  </span>
                )}
              </div>
            )}
            <div className="flex justify-end pt-4">
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setModal("");
                  }}
                  className="px-4 py-2 ml-4 font-bold text-white transition-colors bg-red-500 rounded-full hover:bg-red-700"
                >
                  Cancelar
                </button>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 ml-4 font-bold text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-700"
                >
                  Enviar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
