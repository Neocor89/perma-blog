import Image from "next/image";
import Link from "next/link";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-[#222E50] mx-auto h-[100vh]">
      <nav className="bg-[#F9874F] flex items-center justify-between py-5 px-24">
        {/* <Image
          className="ml-5"
          width={30}
          height={30}
          src={
            "https://res.cloudinary.com/dwoifuutn/image/upload/v1674573367/Bendevblog-logo1-offcl_g3uz7b.png"
          }
        /> */}
        <div className="flex items-center font-Oswald text-[#222E50] font-bold">
          <Link className="mr-10" href="/">
            Home
          </Link>
          <Link className="mr-8 ml-16" href="/create-post">
            Create Post
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
