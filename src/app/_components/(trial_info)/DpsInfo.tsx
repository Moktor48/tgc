import Link from "next/link";
import React from "react";

export default function DpsInfo() {
  return (
    <div className="newsletter flex w-2/3 flex-col">
      <h1 className="text-center">Support/DPS Requirements</h1>
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
        href="https://eso-sets.com/set/master-architect"
      >
        Trial: Master Architect
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/war-machine"
      >
        Trial: War Machine
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/elemental-catalyst"
      >
        Dungeon: Elemental Catalyst
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/zens-redress"
      >
        Dungeon: Z'en's Redress
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/way-of-martial-knowledge"
      >
        Overland: Martial Knowledge
      </Link>
      <Link
        className="text-yellow-500 underline"
        href="https://eso-sets.com/set/destructive-impact"
      >
        Arena: Master's Staff (Destructive Impact)
      </Link>
      <p>Gear Tracking Spreadsheets: (courtesy of TheKittenator)</p>
      <p>
        The{" "}
        <Link
          className="text-yellow-500 underline"
          href="https://docs.google.com/spreadsheets/d/1xqqj7R2YiEf5ggJrBY8iJc18F7kcqRn6R8K5K_OSqHc/edit?usp=sharing"
        >
          DPS gear tracking spreadsheet
        </Link>{" "}
        is updated for U35 and our new tier requirements. If you are using a
        previous version I would encourage you to re-copy.
      </p>
    </div>
  );
}
