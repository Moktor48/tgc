//This is the home page, think of this as the index.html/php/etc
import FrontContent from "./_components/(core)/FrontContent";

export default async function Home() {
  return (
    <main>
      <div className="header-container">
        <div className="header">
          <h3>TGC Community Updates</h3>
        </div>
        <div className="header">
          <h3>MMO Updates</h3>
        </div>
      </div>
      <FrontContent />
    </main>
  );
}

/*
FUTURE NOTES: 

*/
