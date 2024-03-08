import Link from "next/link";
import Image from "next/image";

export default async function NavBarPublic() {
  return (
    <div className="navbar" id="navbar">
      <div className="dropdown">
        <button className="dropbtn">
          <Link href="/">
            <h2>
              Home<span className="home-button"></span>
            </h2>
          </Link>
        </button>
      </div>

      <div className="dropdown">
        <button className="dropbtn">
          <h2>
            Builds<span className="triangle-down"></span>
          </h2>
        </button>
        <div className="nav-dropdown-content">
          <Link href={`/editor/public/display/public/eso/general/build`}>
            ESO
          </Link>
          <Link href={`/editor/public/display/public/ffxiv/general/build`}>
            FFXIV
          </Link>
          <Link href={`/editor/public/display/public/swtor/general/build`}>
            SWTOR
          </Link>
        </div>
      </div>

      <div className="dropdown">
        <button className="dropbtn">
          <h2>
            Guides<span className="triangle-down"></span>
          </h2>
        </button>
        <div className="nav-dropdown-content">
          <Link href={`/editor/public/display/public/eso/general/guide`}>
            ESO
          </Link>
          <Link href={`/editor/public/display/public/ffxiv/general/guide`}>
            FFXIV
          </Link>
          <Link href={`/editor/public/display/public/swtor/general/guide`}>
            SWTOR
          </Link>
        </div>
      </div>

      <div className="dropdown">
        <button className="dropbtn">
          <h2>
            Articles<span className="triangle-down"></span>
          </h2>
        </button>
        <div className="nav-dropdown-content">
          <Link href={`/editor/public/display/public/eso/general/article`}>
            ESO
          </Link>
          <Link href={`/editor/public/display/public/ffxiv/general/article`}>
            FFXIV
          </Link>
          <Link href={`/editor/public/display/public/swtor/general/article`}>
            SWTOR
          </Link>
          <Link href={`/editor/public/display/public/general/general/article`}>
            General Guild Articles
          </Link>
        </div>
      </div>

      <a href="https://discord.gg/TGC" className="dropbtn" target="_blank">
        <Image
          src="/img/discord-logo-white.svg"
          width={150}
          height={120}
          alt="Discord"
        />
      </a>
    </div>
  );
}

/*
FUTURE NOTES: 
PUBLIC PAGE
*/
