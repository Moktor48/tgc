import Link from "next/link";
import Image from "next/image";

export default async function NavBar({
  role,
  id,
}: {
  role: string | undefined;
  id: string | undefined;
}) {
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
          <Link href={`/games/eso/${id}/build`}>ESO</Link>
          <Link href={`/games/swtor/${id}/build`}>SWTOR</Link>
          <Link href={`/games/ffxiv/${id}/build`}>FFXIV</Link>
        </div>
      </div>

      <div className="dropdown">
        <button className="dropbtn">
          <h2>
            Guides<span className="triangle-down"></span>
          </h2>
        </button>
        <div className="nav-dropdown-content">
          <Link href={`/games/eso/${id}/guide`}>ESO</Link>
          <Link href={`/games/swtor/${id}/guide`}>SWTOR</Link>
          <Link href={`/games/ffxiv/${id}/guide`}>FFXIV</Link>
        </div>
      </div>

      <div className="dropdown">
        <button className="dropbtn">
          <h2>
            Articles<span className="triangle-down"></span>
          </h2>
        </button>
        <div className="nav-dropdown-content">
          <Link href={`/games/eso/${id}/article`}>ESO</Link>
          <Link href={`/games/swtor/${id}/article`}>SWTOR</Link>
          <Link href={`/games/ffxiv/${id}/article`}>FFXIV</Link>
          <Link href={`/games/general/${id}/article`}>
            General Guild Articles
          </Link>
        </div>
      </div>

      {role === "staff" && (
        <div className="dropdown">
          <button className="dropbtn">
            <h2>
              Staff<span className="triangle-down"></span>
            </h2>
          </button>
          <div className="nav-dropdown-content">
            <Link href={`/dashboard/${id}/staff`}>Staff</Link>
            <Link href={`/dashboard/${id}/staff/admin`}>Admin</Link>
            <Link href={`/editor/${id}/approve`}>Post Approvals</Link>
            <Link href={`/editor/${id}`}>Create Post</Link>
          </div>
        </div>
      )}

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
