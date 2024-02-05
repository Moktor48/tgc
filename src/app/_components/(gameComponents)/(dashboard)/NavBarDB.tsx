import Link from "next/link";
import Image from "next/image";
import type { Session } from "next-auth";
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

export default async function NavBarDB({ session, id, perm }: NavBarProps) {
  if (!perm) return null;
  const hasPermission = Object.values(perm).some((value) => value === true);
  return (
    <div className="navbar" id="navbar">
      <div className="dropdown">
        <button className="dropbtn">
          <Link href="/">
            <h2>
              <span className="material-symbols-outlined">Home</span>
              Home<span className="home-button"></span>
            </h2>
          </Link>
        </button>
      </div>

      {hasPermission && (
        <div className="dropdown">
          <button className="dropbtn">
            <h2>
              <span className="material-symbols-outlined">
                Supervisor_Account
              </span>
              Staff<span className="triangle-down"></span>
            </h2>
          </button>
          <div className="nav-dropdown-content">
            <Link href={`/dashboard/${id}/staff`}>Staff Page</Link>
          </div>
        </div>
      )}

      {perm.admin && (
        <div className="dropdown">
          <button className="dropbtn">
            <h2>
              <span className="material-symbols-outlined">
                Admin_Panel_Settings
              </span>
              Admin Panel<span className="triangle-down"></span>
            </h2>
          </button>
          <div className="nav-dropdown-content">
            <Link href={`/dashboard/${id}/admin`}>Admin</Link>
          </div>
        </div>
      )}

      {hasPermission && (
        <div className="dropdown">
          <button className="dropbtn">
            <h2>
              <span className="material-symbols-outlined">Edit</span>
              Editor<span className="triangle-down"></span>
            </h2>
          </button>
          <div className="nav-dropdown-content">
            <Link href={`/../editor/${id}`}>Create new post</Link>
            <Link href={`/../editor/${id}/approve`}>Post approvals</Link>
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
