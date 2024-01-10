import FrontContent from "./_components/FrontContent";

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
      <section className="newsletter" id="newsletter">
        <h3>TGC News</h3>
        <p>Our weekly newsletter with all the latest updates and news in The Gaming Council. Subscribe now!</p>
        <form action="#" method="post">
          <input type="email" id="email" placeholder="Enter your email" required />
          <button style={{color: "#c5c5c5"}}>Subscribe</button>
        </form>
      </section>
      <footer>
        <p>TGC</p>
      </footer> 
  </main>
  )
}