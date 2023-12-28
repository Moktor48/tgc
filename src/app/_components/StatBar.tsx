import { db } from '~/server/db';
import { getServerAuthSession } from '~/server/auth';

export default async function StatBar() {
  const session = await getServerAuthSession()
    const esoCount = 823 // await db.player.count({}); // display eso members logged into game.
    const ffxivCount = 667 // await db.player.count({ where: { game: 'ffxiv' } }); // display ffxiv members logged into game.
    const swtorCount = 12 // await db.player.count({ where: { game:'swtor' } }); // display swtor members logged into game.

  // Session is not valid
  if(!session || session.user.role === 'guest') {
    return (
        <div className="stats-bar">
        <div className="stats-item">Online Members</div>
        <div className="stats-item">ESO: {esoCount}</div>
        <div className="stats-item">FFXIV: {ffxivCount}</div>
        <div className="stats-item">SWTOR: {swtorCount}</div>
        <button id="avatar" className="stats-item-menu">
            <i className="sidebar-togglefa fa-bars" id="sidebar-toggle"></i>
        </button>

    </div>
    )
  }
  // Session is valid
  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  })
  const role = user?.role;
  const id = user?.id;
  return (
    <div className="stats-bar">
    <div className="stats-item">Online Members</div>
    <div className="stats-item">ESO: {esoCount}</div>
    <div className="stats-item">FFXIV: {ffxivCount}</div>
    <div className="stats-item">SWTOR: {swtorCount}</div>
    <button id="avatar" className="stats-item-menu"><i className="fa fa-bars" id="sidebar-toggle"></i>{session.user.name}</button>

</div>
  )
}

