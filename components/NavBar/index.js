import { useRouter } from "next/router";
import Link from "next/link";
import Home from "svg/Home";
import Logo from "svg/Logo";
import Music from "svg/Music";
import Search from "svg/Search";

export default function NavBar(allUsers, user) {
  const router = useRouter();

  const logout = () => {
    window.localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="h-screen text-lg font-medium text-black bg-gray-200 w-80">
      <div className="pt-4 pl-4">
        <Logo />
      </div>
      <ul className="pt-4 pb-4 mx-4 border-b-4 border-gray-800">
        <li className="pt-4">
          <Link href="/app">
            <a className="flex flex-row">
              <Home fill="#000" />
              <span className="ml-2">Inicio</span>
            </a>
          </Link>
        </li>
        <li className="pt-4">
          <Link href="/app/search">
            <a className="flex flex-row">
              <Search fill="#000" />
              <span className="ml-2">Buscar</span>
            </a>
          </Link>
        </li>
      </ul>
      <p className="flex flex-row pt-4 pb-2 mx-4">
        <Music fill="#000" />
        <span className="ml-2">Tus suscripciones</span>
      </p>
      <ul className="overflow-y-scroll">
        {allUsers.length > 0 &&
          user &&
          allUsers
            .filter((u) => u.userSubscribers.includes(user._id))
            .map((user) => (
              <li className="pt-4 pl-4 font-normal" key={user._id}>
                <Link href={`/artist/${user._id}`}>
                  <a className="flex flex-row">
                    <span className="ml-2">{user.name}</span>
                  </a>
                </Link>
              </li>
            ))}
      </ul>
      <button
        onClick={() => {
          logout();
        }}
        className="p-4 m-4 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Cerrar Sesión
      </button>
    </nav>
  );
}
