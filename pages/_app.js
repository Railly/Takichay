import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";
import Head from "next/head";
import AppLayout from "components/AppLayout";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{`IndieSingles - ${
          router.pathname === "/"
            ? "Home"
            : // routerp.pathname with uppercase first letter
              router.pathname.split("/")[1].charAt(0).toUpperCase() +
              router.pathname.split("/")[1].slice(1)
        }`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {router.pathname !== "/login" && router.pathname !== "/register" ? (
        <AppLayout Component={Component} pageProps={pageProps} />
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}
