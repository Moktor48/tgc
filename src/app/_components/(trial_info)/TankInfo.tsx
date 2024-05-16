import Link from "next/link";
import React from "react";

export default function TankInfo() {
  return (
    <div className="newsletter flex w-2/3 flex-col">
      <h1 className="text-center">Tank Requirements</h1>
      <h1>Required Gear for Tiered Support Tags (as of U41)</h1>
      <p>
        You should 1000% have sets in addition to these. These are the gear we
        use to issue Tier tags.:
      </p>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/claw-of-yolnahkriin"
      >
        Trial: Claw of Yolnahkriin (nSS/vSS)
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/saxhleel-champion"
      >
        Trial: Saxheel Champion (nRG/vRG)
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/pearlescent-ward"
      >
        Trial: Pearlescent Ward (nDSR/vDSR)
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/turning-tide"
      >
        Dungeon: Turning Tide (Shipwright's Regret)
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/crimson-oaths-rive"
      >
        Dungeon: Crimson Oath's Rive (The Dread Cellar)
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/powerful-assault"
      >
        Vendor/PvP: Powerful Assault (PvP/Guild Vendors)
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/nazaray"
      >
        Monster Set: Nazaray (Shipwright's Regret)
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/encratiss-behemoth"
      >
        Monster Set: Encratis' Behemoth (Blake Drake Villa)
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/tremorscale"
      >
        Monster Set: Tremorscale (Volenfell)
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/archdruid-devyric"
      >
        Monster Set: Archdruid Devyric (Earthen Root Enclave)
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/spaulder-of-ruin"
      >
        Mythic/Antiquity: Spaulder of Ruin
      </Link>
      <h1>Optional Extended Set List</h1>
      <p>
        These are sets that were formerly on our support requirements but were
        removed to make our trials more accessible. They are typically very
        useful in niche situations.
      </p>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/roar-of-alkosh"
      >
        Trial: Roar of Alkosh
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/crimson-oaths-rive"
      >
        Dungeon: Crimson Oath's Rive (The Dread Cellar)
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/elemental-catalyst"
      >
        Dungeon: Elemental Catalyst
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/the-worms-raiment"
      >
        Dungeon: Worm's Raiment
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/torugs-pact"
      >
        Vendor/Crafted: Torug's Pact
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/puncturing-remedy"
      >
        Arena: Master's Sword and Board (Puncturing Remedy)
      </Link>
      Monster Sets:
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/earthgore"
      >
        Earthgore
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/engine-guardian"
      >
        Engine Guardian
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/lady-thorn"
      >
        Lady Thorn
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/stonekeeper"
      >
        Stonekeeper
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/vykosa"
      >
        Vykosa
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/spaulder-of-ruin"
      >
        Mythic/Antiquity: Spaulder of Ruin
      </Link>
      <p>Gear Tracking Spreadsheets: (courtesy of TheKittenator)</p>{" "}
      <p>
        The{" "}
        <Link
          className="text-yellow-500 underline"
          href="https://docs.google.com/spreadsheets/d/1dc_K50fITwh1aq043oASfyumD1nTPMGnBHZPw2aS3XI/edit?usp=sharing"
        >
          Tank gear tracking spreadsheet
        </Link>{" "}
        is updated for U35 and our new tier requirements. If you are using a
        previous version I would encourage you to re-copy.
      </p>
    </div>
  );
}
