import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "schemas/validation";
import Link from "next/link";
import Logo from "svg/Logo";
import { errorsDictionary } from "utils/errorsDictionary";

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data) => {
    window
      .fetch("https://takichay.herokuapp.com/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          router.push("/login");
        } else {
          setError(data.errors);
        }
      });
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      router.push("/app");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-black bg-gray-200 ">
      <Logo className="w-1/2 h-20 " />
      <h1 className="h-12 text-xl">
        Registrate y comparte tus canciones con el mundo
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="flex flex-col font-semibold">
            Nombre:
            <input
              className="px-4 py-2 my-2 text-black border border-gray-400 rounded-full"
              type="text"
              name="name"
              {...register("name")}
            />
          </label>
          <span className="text-xs text-red-500">
            {errors?.name && errors?.name?.message}
          </span>
        </div>
        <div>
          <label className="flex flex-col font-semibold">
            Email:
            <input
              className="px-4 py-2 my-2 text-black border border-gray-400 rounded-full"
              type="email"
              name="email"
              {...register("email")}
            />
          </label>
          <span className="text-xs text-red-500">
            {errors?.email && errors?.email?.message}
          </span>
        </div>
        <div>
          <label className="flex flex-col font-semibold">
            Contraseña:
            <input
              className="px-4 py-2 my-2 text-black border border-gray-400 rounded-full"
              type="password"
              name="password"
              {...register("password")}
            />
          </label>
          <span className="text-xs text-red-500">
            {errors?.password && errors?.password?.message}
          </span>
        </div>
        <button
          className="px-20 py-2 mt-4 font-bold text-white bg-blue-700 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Registrarse
        </button>
        <Link href="/login">
          <a className="mx-3 tex-gray-300 hover:text-gray-100 ">
            Ir a Inicio de Sesion
          </a>
        </Link>
        {error &&
          error.map((err) => {
            return (
              <span className="flex justify-center w-full mt-2 text-red-500">
                {errorsDictionary[err.msg] || err.msg}
              </span>
            );
          })}
      </form>
    </div>
  );
}
