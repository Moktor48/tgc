import React from "react";

export default function WarningBanner() {
  return (
    <div className="bg-black text-center text-3xl text-red-500">
      <h1>Current Operations</h1>
      <ul>
        <li>
          Refer to the text editor and test it out, many features can be added
          to it, let me know the priorities. It can be found in the side bar
          (upper right menu), dashboard, admin and staff sections.
        </li>
        <li>
          Templates should be made for the editor, for builds, articles,
          reports, whatever. These can be added in and I can add features to the
          editor as needed
        </li>
        <li>
          Permissions need to be done by hand at the moment, if this is your
          first time signing in, message moktor in Discord.
        </li>
      </ul>
      <h1>Current issues</h1>
      <ul>
        <li> Many! lol...</li>
        <li>
          I am currently working on the means of in-app player permission mods.
          I am currently controlling authorization for:
        </li>
        <li>guest/member/staff</li>
        <li>[eso/ffxiv/swtor]: none/member/officer (tracked for each game)</li>
        <li>Staff positions: admin/specialist/mentor/representative/HC/GM</li>
      </ul>
      <h1>More Issues?</h1>
      <ul>
        <li>
          {" "}
          These are just on my plate right now, if there are other priorities
          I'll adjust fire.
        </li>
        <li>
          Suggestions can be made in the text editor, or by contacting me in
          Discord.
        </li>
        <li>If you see a security flaw, let us know immediately!</li>
      </ul>
    </div>
  );
}
