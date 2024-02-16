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

/*
    id: '314436945792991232',
    name: 'The Gaming Council',
    icon: 'a_d204c19b3e5a0d98342a145c0f6934fb',

  const dataUrl = "iVBOR…FEchpSuXLkIAAAAASUVORK5CYII=";
  const base64Data = dataUrl.replace(/^data:image\/[a-z]+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");
  const image = await new Response(buffer).blob();
  const imageURL = URL.createObjectURL(image);
  console.log(imageURL);
*/
