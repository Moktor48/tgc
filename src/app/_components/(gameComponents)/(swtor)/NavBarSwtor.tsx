import React from "react";
import type { Session } from "next-auth";
import Link from "next/link";
import Image from "next/image";
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
  posts: {
    id: string;
    title: string;
    createdBy: {
      id: string;
      name: string;
    };
    permissions: {
      swtor: boolean;
    }[];
  };
}
export default function NavBarSwtor({ session, id, perm, posts }: NavBarProps) {
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
            SWTOR Builds<span className="triangle-down"></span>
          </h2>
        </button>
        <div className="nav-dropdown-content">
          <Link href="#">SWTOR</Link>
        </div>
      </div>

      <div className="dropdown">
        <button className="dropbtn">
          <h2>
            SWTOR Guides<span className="triangle-down"></span>
          </h2>
        </button>
        <div className="nav-dropdown-content">
          <Link href="#">SWTOR</Link>
        </div>
      </div>

      <div className="dropdown">
        <button className="dropbtn">
          <h2>
            SWTOR Articles<span className="triangle-down"></span>
          </h2>
        </button>
        <div className="nav-dropdown-content">
          <Link href="/article/SWTOR">SWTOR</Link>
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
