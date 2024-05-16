import Link from "next/link";
import React from "react";

export default function HealInfo() {
  return (
    <div className="newsletter flex w-2/3 flex-col">
      <h1 className="text-center">Healer Requirements</h1>
      <h1>Required Gear for Tiered Support Tags (as of U41)</h1>
      <p>
        You should 1000% have sets in addition to these. These are the gear we
        use to issue Tier tags.:
      </p>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/roaring-opportunist"
      >
        Trial: Roaring Opportunist (nKA/vKA)
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/vestment-of-olorime"
      >
        Trial: Vestment of Olorime (nCR/vCR)
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/master-architect"
      >
        Trial: Master Architect (nHoF/vHoF)
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/saxhleel-champion"
      >
        Trial: Saxhleel Champion (nRG/vRG)
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/pillagers-profit"
      >
        Trial: Pillager's Profit (nDSR/vDSR)
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/jorvulds-guidance"
      >
        Dungeon: Jorvald's Guidance (Scalecaller Peak)
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/spell-power-cure"
      >
        Dungeon: Spell Power Cure (White-Gold Tower)
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/way-of-martial-knowledge"
      >
        Vendor/Overland: Way of Martial Knowledge (Craglorn)
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/symphony-of-blades"
      >
        Monster Set: Symphony of Blades (Depths of Malatar)
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/nazaray"
      >
        Monster Set: Nazaray (Shipwright's Regret)
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/spaulder-of-ruin"
      >
        Mythic/Antiquity: Spaulder of Ruin
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/grand-rejuvenation"
      >
        Arena: Master's Restoration Staff (Grand Rejuvenation) (Dragonstar
        Arena)
      </Link>
      <h1>Optional Extended Set List</h1>
      <p>
        These are sets that were formerly on our support requirements but were
        removed to make our trials more accessible. They are typically very
        useful in niche situations.
      </p>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/elemental-catalyst"
      >
        Dungeon: Elemental Catalyst
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/hollowfang-thirst"
      >
        Dungeon: Hollowfang's Thirst
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/zens-redress"
      >
        Dungeon: Z'en's Redress
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/gossamer"
      >
        Dungeon: Gossamer
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/menders-ward"
      >
        Arena: Blackrose Restoration Staff (Mender's Ward)
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/torugs-pact"
      >
        Vendor/Crafted: Torug's Pact
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/powerful-assault"
      >
        Vendor/Overland: Powerful Assault
      </Link>
      Monster Sets:
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/sentinel-of-rkugamz"
      >
        Sentinel of Rkugazmz's
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/the-troll-king"
      >
        Troll King
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/nightflame"
      >
        Nightflame
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/encratiss-behemoth"
      >
        Encratis' Behemoth
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/magma-incarnate"
      >
        Magma Incarnate
      </Link>
      <p>Gear Tracking Spreadsheets: (courtesy of TheKittenator)</p>
      <p>
        The{" "}
        <Link
          className="text-yellow-500 underline"
          href="https://docs.google.com/spreadsheets/d/1cFPjmQt0_99RC-H5I5JZGTzjP1OPde0fhwQHI7iADJc/edit?usp=sharing"
        >
          Healer gear tracking spreadsheet
        </Link>{" "}
        is updated for U35 and our new tier requirements. If you are using a
        previous version I would encourage you to re-copy.
      </p>
    </div>
  );
}
