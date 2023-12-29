import Link from 'next/link';
import Image from 'next/image';

export default async function NavBar() {
    return (
<div className="navbar" id="navbar">

  <div className="dropdown">
    <button className="dropbtn"><Link href="/"><h2>Home<span className="home-button"></span></h2></Link></button>
  </div>

  <div className="dropdown">
    <button className="dropbtn"><h2>Builds<span className="triangle-down"></span></h2></button>
    <div className="nav-dropdown-content">
        <Link href="#">Option 1</Link>
        <Link href="#">Option 2</Link>
        <Link href="#">Option 3</Link>
    </div>
  </div>

  <div className="dropdown">
    <button className="dropbtn"><h2>Guides<span className="triangle-down"></span></h2></button>
    <div className="nav-dropdown-content">
        <Link href="#">Baldur's Gate 3</Link>
        <Link href="#">SWTOR</Link>
        <Link href="#">FFXIV</Link>
    </div>
  </div>

  <div className="dropdown">
    <button className="dropbtn"><h2>Articles<span className="triangle-down"></span></h2></button>
    <div className="nav-dropdown-content">
        <Link href="#">Option 7</Link>
        <Link href="#">Option 8</Link>
        <Link href="#">Option 9</Link>
    </div>
  </div>

  <a href="https://discord.gg/TGC" className="dropbtn" target="_blank">
    <Image src="/img/discord-logo-white.svg" width={150} height={120} alt="Discord" />
  </a>
</div>
    )
}
