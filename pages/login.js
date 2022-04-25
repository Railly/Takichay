import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "schemas/validation";
import Link from "next/link";
import Logo from "svg/Logo";
import { errorsDictionary } from "utils/errorsDictionary";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = (data) => {
    window
      .fetch("https://api-indiesingles.herokuapp.com/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setToken(data.token);
        } else {
          setError(data.msg);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  const handleClick = () => {
    router.push("/register");
  };
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      router.push("/app");
    }
  }, []);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
      router.push("/app");
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-200 bg-black ">
      <Logo className="w-1/2 h-20 " />
      <h1 className="h-12 text-xl">
        Es momento de descubrir o compartir nueva musica
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <span className="text-xs text-red-500 ">
            {errors?.password && errors?.password?.message}
          </span>
        </div>
        <button
          className="px-20 py-2 my-4 font-bold text-white bg-green-700 rounded-full hover:bg-green-600 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Iniciar Session
        </button>
        <Link href="/register">
          <a className="flex flex-col h-10 px-20 text-gray-300 hover:text-gray-100 ">
            Ir a Registrarse
          </a>
        </Link>
        <span className="flex justify-center w-full text-red-500">
          {errorsDictionary[error] || error}
        </span>
      </form>
    </div>
  );
}
