"use client";
import React from "react";
import { api } from "~/trpc/react";

export default function LoadDump() {
  // ESO Base Dungeons (alphabetical)
  const coreDungeons = [
    "Arx Corinium",
    "Banished Cells I",
    "Banished Cells II",
    "Blackheart Haven",
    "Blessed Crucible",
    "City of Ash I",
    "City of Ash II",
    "Crypt of Hearts I",
    "Crypt of Hearts II",
    "Darkshade Caverns I",
    "Darkshade Caverns II",
    "Direfrost Keep",
    "Elden Hollow I",
    "Elden Hollow II",
    "Fungal Grotto I",
    "Fungal Grotto II",
    "Selenes Web",
    "Spindleclutch I",
    "Spindleclutch II",
    "Tempest Island",
    "Vaults of Madness",
    "Volenfell",
    "Wayrest Sewers I",
    "Wayrest Sewers II",
  ];

  // ESO DLC Dungeons (alphabetical)
  const dlcDungeons = [
    "Bal Sunnar",
    "Bedlam Veil",
    "Black Drake Villa",
    "Bloodroot Forge",
    "Castle Thorn",
    "Coral Aerie",
    "Cradle of Shadows",
    "Depths of Malatar",
    "Earthen Root Enclave",
    "Falkreath Hold",
    "Fang Lair",
    "Frostvault",
    "Graven Keep",
    "Icereach",
    "Imperial City Prison",
    "Lair of Maarselok",
    "March of Sacrifices",
    "Moon Hunter Keep",
    "Moongrave Fane",
    "Oathsworn Pit",
    "Red Petal Bastion",
    "Ruins of Mazzatun",
    "Scalecaller Peak",
    "Scrivener's Hall",
    "Shipright's Regret",
    "Stone Garden",
    "The Cauldron",
    "The Dread Cellar",
    "Unhallowed Grave",
    "White-Gold Tower",
  ];

  //ESO Trials (alphabetical)
  const trials = [
    "Aetherian Archive",
    "Asylum Sanctorium",
    "Cloudrest",
    "Dreadsail Reef",
    "Halls of Fabrication",
    "Hel Ra Citadel",
    "Lucent Citadel",
    "Maw of Lorkhaj",
    "Rockgrove",
    "Sanctum Ophidia",
    "Sanity's Edge",
    "Sunspire",
    "The Celestial Bastion",
  ];
  const loader = api.post.trial_default.useMutation();
  const handleClick = async () => {
    loader.mutate(
      { coreDungeons, dlcDungeons, trials },
      { onSuccess: () => alert("Trial Names Loaded!") },
    );
  };
  return (
    <div>
      <h1>Trial Name Loader</h1>
      <button className="btn" onClick={handleClick}>
        Load Trial Names
      </button>
    </div>
  );
}
