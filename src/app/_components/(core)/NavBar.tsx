import Link from "next/link";
import Image from "next/image";
import { api } from "~/trpc/server";
import docCount from "../(adminComponents)/DocCount";
export default async function NavBar({
  role,
  id,
}: {
  role: string | undefined;
  id: string | undefined;
}) {
  if (!id) return null;
  const admin = await api.get.staffPermission.query({ userId: id });
  const docResults = await docCount();
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
          <Link href={`/docs/eso/build`}>
            ESO {`(${docResults.eso_build})`}
          </Link>
          <Link href={`/docs/ffxiv/build`}>
            FFXIV {`(${docResults.ffxiv_build})`}
          </Link>
          <Link href={`/docs/swtor/build`}>
            SWTOR {`(${docResults.swtor_build})`}
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
          <Link href={`/docs/eso/guide`}>
            ESO {`(${docResults.eso_guide})`}
          </Link>
          <Link href={`/docs/ffxiv/guide`}>
            FFXIV {`(${docResults.ffxiv_guide})`}
          </Link>
          <Link href={`/docs/swtor/guide`}>
            SWTOR {`(${docResults.swtor_guide})`}
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
          <Link href={`/docs/eso/article`}>
            ESO {`(${docResults.eso_article})`}
          </Link>
          <Link href={`/docs/ffxiv/article`}>
            FFXIV {`(${docResults.ffxiv_article})`}
          </Link>
          <Link href={`/docs/swtor/article`}>
            SWTOR {`(${docResults.swtor_article})`}
          </Link>
          <Link href={`/docs/tgc_guild/article`}>
            General Guild Articles {`(${docResults.tgc_guild_article})`}
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
            <Link href={`/dashboard/${id}/staff/leaderboard`}>Leaderboard</Link>
            <Link href={`/editor/${id}/approve`}>
              Post Approvals {`(${docResults.unpub_count})`}
            </Link>
            <Link href={`/editor/${id}`}>Create Post</Link>
            {admin?.admin && (
              <Link href={`/dashboard/${id}/staff/stafftracker`}>
                Staff Tracker
              </Link>
            )}
            {admin?.admin && (
              <Link href={`/dashboard/${id}/staff/bug/display`}>
                Bug Reports {`(${docResults.bug_count})`}
              </Link>
            )}
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
