import React from "react";
import type { Session } from "next-auth";
import Link from "next/link";
import Image from "next/image";
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
export default async function NavBarFfxiv({ session, id, perm }: NavBarProps) {
  const gamePubPosts = await api.get.publishedPostsFfxiv.query();
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
            FFXIV Builds<span className="triangle-down"></span>
          </h2>
        </button>
        <div className="nav-dropdown-content">
          <Link href="#">FFXIV</Link>
        </div>
      </div>

      <div className="dropdown">
        <button className="dropbtn">
          <h2>
            FFXIV Guides<span className="triangle-down"></span>
          </h2>
        </button>
        <div className="nav-dropdown-content">
          <Link href="#">FFXIV</Link>
        </div>
      </div>

      <div className="dropdown">
        <button className="dropbtn">
          <h2>
            FFXIV Articles<span className="triangle-down"></span>
          </h2>
        </button>
        <div className="nav-dropdown-content">
          <Link href="#">FFXIV</Link>
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
