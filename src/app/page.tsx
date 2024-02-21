//This is the home page, think of this as the index.html/php/etc
import FrontContent from "./_components/(core)/FrontContent";
import WarningBanner from "./_components/(core)/WarningBanner";
import { GuildPull } from "./_components/(adminComponents)/GuildPull";

export default async function Home() {
  return (
    <main>
      <GuildPull />
      <div className="header-container">
        <div className="header">
          <h3>TGC Community Updates</h3>
        </div>
        <div className="header">
          <h3>MMO Updates</h3>
        </div>
      </div>
      <FrontContent />
      <WarningBanner />
    </main>
  );
}
