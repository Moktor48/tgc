import React from "react";

export default function WarningBanner() {
  return (
    <div className="bg-black text-center text-3xl text-red-500">
      <p className="text-yellow-500">
        Latest update: <span className="test-green-500">2/15/24@1015MST</span>
      </p>

      <h1>Latest updates</h1>
      <ul>
        <div className="text-green-500">
          <p>
            Articles/builds/guides are now routing properly to be read. Test
            things out, but the EXPECTED outcome is:
          </p>
          <p>1. Staff - Create Post </p>
          <p>2.Post Setup, choose the parameters </p>
          <p>3. Create your post, and submit </p>
          <p>
            4. Staff member reviews (you should be able to review your own at
            the moment){" "}
          </p>
          <p>5. Post should be published in the proper location.</p>
          <p className="text-yellow-500">
            Styling is crap at the moment, you were warned! I wanted to get the
            functionality up, make sure the logic is working. Then I will make
            it so your eyes don't bleed anymore!
          </p>
          <p className="text-red-500">WATCH for bugs, report them!</p>
        </div>

        <li className="text-green-500">
          Log-in automatically checks Discord channel to verify membership, then
          updates the user record. Styling is not final, just function.
        </li>

        <li className="text-green-500">NavBars homogenized</li>

        <li className="text-5xl text-yellow-500">
          REMOVED YELLOW FOR CHANCE!!!!
        </li>

        <li className="text-5xl text-yellow-500">
          Rolled back a bit to fix the build
        </li>
      </ul>
      <h1>Dashboard/Editor Directions</h1>
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
