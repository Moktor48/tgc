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
          <Link href={`/games/eso/public/build`}>ESO</Link>
          <Link href={`/games/swtor/public/build`}>SWTOR</Link>
          <Link href={`/games/ffxiv/public/build`}>FFXIV</Link>
        </div>
      </div>

      <div className="dropdown">
        <button className="dropbtn">
          <h2>
            Guides<span className="triangle-down"></span>
          </h2>
        </button>
        <div className="nav-dropdown-content">
          <Link href={`/games/eso/public/guide`}>ESO</Link>
          <Link href={`/games/swtor/public/guide`}>SWTOR</Link>
          <Link href={`/games/ffxiv/public/guide`}>FFXIV</Link>
        </div>
      </div>

      <div className="dropdown">
        <button className="dropbtn">
          <h2>
            Articles<span className="triangle-down"></span>
          </h2>
        </button>
        <div className="nav-dropdown-content">
          <Link href={`/games/eso/public/article`}>ESO</Link>
          <Link href={`/games/swtor/public/article`}>SWTOR</Link>
          <Link href={`/games/ffxiv/public/article`}>FFXIV</Link>
          <Link href={`/games/general/public/article`}>
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
