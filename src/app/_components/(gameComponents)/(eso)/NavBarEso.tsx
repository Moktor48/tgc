import Link from "next/link";
import Image from "next/image";
import type { Session } from "next-auth";
import { api } from "~/trpc/server";
interface NavBarProps {
  session: Session;
  id: string;
  perm: {
    id: string;
    userId: string;
    admin: boolean | null;
    specialist: boolean | null;
    representative: boolean | null;
    highcouncil: boolean | null;
    guildmaster: boolean | null;
  } | null;
}

export default async function NavBarEso({ session, id, perm }: NavBarProps) {
  const gamePubPosts = await api.get.publishedPostsEso.query();
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
            ESO Builds<span className="triangle-down"></span>
          </h2>
        </button>
        <div className="nav-dropdown-content">
          <Link href="#">ESO</Link>
        </div>
      </div>

      <div className="dropdown">
        <button className="dropbtn">
          <h2>
            ESO Guides<span className="triangle-down"></span>
          </h2>
        </button>
        <div className="nav-dropdown-content">
          <Link href="#">ESO</Link>
        </div>
      </div>

      <div className="dropdown">
        <button className="dropbtn">
          <h2>
            ESO Articles<span className="triangle-down"></span>
          </h2>
        </button>
        <div className="nav-dropdown-content">
          <Link href="/article/eso">ESO</Link>
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
