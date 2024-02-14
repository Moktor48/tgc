import React from "react";

export default function WarningBanner() {
  return (
    <div className="bg-black text-center text-3xl text-red-500">
      <p className="text-yellow-500">Latest update: 2/14/24@0630MST</p>
      <h1>Current Operations</h1>

      <p className="text-green-500">NavBars homogenized</p>

      <p className="text-5xl text-yellow-500">REMOVED YELLOW FOR CHANCE!!!!</p>

      <p className="text-5xl text-yellow-500">
        Rolled back a bit to fix the build
      </p>

      <p className="text-red-500">
        Dashboard allows for staff to make certain changes for users, so guild
        officers can promote their own members, etc. Much of this functionality
        will fall on the Discord bot eventually, but this gives us a tool now
        for changes.
      </p>

      <p className="text-red-500">
        Refer to the text editor and test it out, many features can be added to
        it, let me know the priorities. It can be found in the side bar (upper
        right menu), dashboard, admin and staff sections. Templates should be
        made for the editor, for builds, articles, reports, whatever. These can
        be added in and I can add features to the editor as needed Permissions
        need to be done by hand at the moment, if this is your first time
        signing in, message moktor in Discord.
      </p>

      <h1>Current issues</h1>

      <p className="text-red-500">
        I am currently working on the means of in-app player permission mods. I
        am currently controlling authorization for: guest/member/staff
        [eso/ffxiv/swtor]: none/member/officer (tracked for each game) Staff
        positions: admin/specialist/mentor/representative/HC/GM
      </p>

      <h1>More Issues?</h1>

      <p className="text-red-500">
        {" "}
        These are just on my plate right now, if there are other priorities I'll
        adjust fire. Suggestions can be made in the text editor, or by
        contacting me in Discord. If you see a security flaw, let us know
        immediately!
      </p>
    </div>
  );
}
