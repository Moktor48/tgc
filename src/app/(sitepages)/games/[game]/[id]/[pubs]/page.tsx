//Filters down the posts /games/eso/id/...
// Build, article, guide, etc will filter here
import React from "react";

export default function page({
  params,
}: {
  params: { game: string; id: string; pubs: string };
}) {
  //Logic to pull specified type of post for the game, based on params then we will fill out boxes/grid with some photos? Clicking brings you to actual post
  const game = params.game;
  const pubs = params.pubs;
  return (
    <div>
      <h1>
        This is where you will find links to every {pubs} for {game}/
      </h1>
    </div>
  );
}
