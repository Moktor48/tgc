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
          <Link href={`/editor/${id}/display/private/eso/general/build`}>
            ESO
          </Link>
          <Link href={`/editor/${id}/display/private/ffxiv/general/build`}>
            FFXIV
          </Link>
          <Link href={`/editor/${id}/display/private/swtor/general/build`}>
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
          <Link href={`/editor/${id}/display/private/eso/general/guide`}>
            ESO
          </Link>
          <Link href={`/editor/${id}/display/private/ffxiv/general/guide`}>
            FFXIV
          </Link>
          <Link href={`/editor/${id}/display/private/swtor/general/guide`}>
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
          <Link href={`/editor/${id}/display/private/eso/general/article`}>
            ESO
          </Link>
          <Link href={`/editor/${id}/display/private/ffxiv/general/article`}>
            FFXIV
          </Link>
          <Link href={`/editor/${id}/display/private/swtor/general/article`}>
            SWTOR
          </Link>
          <Link href={`/editor/${id}/display/private/general/general/article`}>
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
            <Link href={`/dashboard/${id}/staff/stafftracker`}>
              Staff Tracker
            </Link>
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
