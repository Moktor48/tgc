import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function FrontContent() {
  return (
    <div>
      <div className="home-grid-container">
        <section id="latest-posts">
          <article>
            <h4>FFXIV LFG</h4>
            <Link
              href="https://discord.com/channels/314436945792991232/1056243914039894016"
              target="_blank"
              className="game-logo-button flex justify-center"
            >
              <Image
                src="/img/FFXIV.png"
                height={300}
                width={300}
                alt="finalfantasyxiv"
              />
            </Link>
          </article>
          <article>
            <h4>Discuss ESO Lore!</h4>
            <Link
              href="https://discord.com/channels/314436945792991232/1068961048134156439"
              target="_blank"
              className="game-logo-button flex justify-center"
            >
              <Image
                src="/img/eso.jpg"
                height={300}
                width={300}
                alt="ESO Lore"
              />
            </Link>
          </article>
          <article>
            <h4>Add TGC Steam users!</h4>
            <Link
              href="https://discord.com/channels/314436945792991232/1077267948294639697"
              target="_blank"
              className="game-logo-button flex justify-center"
            >
              <Image
                src="/img/steam2.png"
                height={300}
                width={300}
                alt="Steam"
              />
            </Link>
          </article>
        </section>

        <section id="gaming-updates">
          <article>
            <h4>ESO Patch v9.1.8</h4>
            <Link
              href="https://forums.elderscrollsonline.com/en/discussion/644155/pc-mac-patch-notes-v9-1-8"
              target="_blank"
              className="game-logo-button flex justify-center"
            >
              <Image
                src="/img/eso.jpg"
                height={300}
                width={300}
                alt="Elder Scrolls Online"
              />
            </Link>
          </article>

          <article>
            <h4>FFXIV Patch 6.5</h4>
            <Link
              href="https://na.finalfantasyxiv.com/lodestone/topics/detail/e17ce5b98068f6972379cef5adbc6c4b664f9780"
              target="_blank"
              className="game-logo-button flex justify-center"
            >
              <Image
                src="/img/FFXIV.png"
                height={300}
                width={300}
                alt="Final Fantasy XIV Online"
              />
            </Link>
          </article>

          <article>
            <h4>SWTOR Update 7.3.1B</h4>
            <Link
              href="https://www.swtor.com/patchnotes/10323/game-update-7.3.1b"
              target="_blank"
              className="game-logo-button flex justify-center"
            >
              <Image
                src="/img/SWTOR.png"
                height={300}
                width={300}
                alt="Star Wars the Old Republic"
              />
            </Link>
          </article>
        </section>
      </div>
    </div>
  );
}
