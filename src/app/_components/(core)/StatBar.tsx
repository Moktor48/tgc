import { getServerAuthSession } from "~/server/auth";
import Image from "next/image";
export default async function StatBar() {
  const session = await getServerAuthSession();
  const esoCount = 823; // await db.player.count({}); // display eso members logged into game.
  const ffxivCount = 667; // await db.player.count({ where: { game: 'ffxiv' } }); // display ffxiv members logged into game.
  const swtorCount = 12; // await db.player.count({ where: { game:'swtor' } }); // display swtor members logged into game.

  // Session is not valid
  if (!session) {
    return (
      <div className="stats-bar">
        <div className="stats-item">Online Members</div>
        <div className="stats-item">ESO: {esoCount}</div>
        <div className="stats-item">FFXIV: {ffxivCount}</div>
        <div className="stats-item">SWTOR: {swtorCount}</div>
      </div>
    );
  }
  // Session is valid

  return (
    <div className="stats-bar">
      <div className="stats-item">Online Members</div>
      <div className="stats-item">ESO: {esoCount}</div>
      <div className="stats-item">FFXIV: {ffxivCount}</div>
      <div className="stats-item">SWTOR: {swtorCount}</div>
      <div className="stats-item-menu flex">
        <span className="inline-flex">
          {session.user.image != null && (
            <Image
              src={session.user.image}
              width={30}
              height={30}
              alt="avatar"
            />
          )}
        </span>
        <span>{session.user.name}</span>
      </div>
    </div>
  );
}

/*
FUTURE NOTES: 
*/
