import Link from "next/link";
import Image from "next/image";

export default async function NavBar({
  role,
  id,
}: {
  role: string;
  id: string;
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
          <Link href="#">ESO</Link>
          <Link href="#">SWTOR</Link>
          <Link href="#">FFXIV</Link>
        </div>
      </div>

      <div className="dropdown">
        <button className="dropbtn">
          <h2>
            Guides<span className="triangle-down"></span>
          </h2>
        </button>
        <div className="nav-dropdown-content">
          <Link href="#">ESO</Link>
          <Link href="#">SWTOR</Link>
          <Link href="#">FFXIV</Link>
        </div>
      </div>

      <div className="dropdown">
        <button className="dropbtn">
          <h2>
            Articles<span className="triangle-down"></span>
          </h2>
        </button>
        <div className="nav-dropdown-content">
          <Link href="/article/eso">ESO</Link>
          <Link href="/article/swtor">SWTOR</Link>
          <Link href="/article/ffxiv">FFXIV</Link>
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
            <Link href={`/dashboard/${id}/admin`}>Admin</Link>
            <Link href={`/editor/${id}/approve`}>Post Approvals</Link>
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
