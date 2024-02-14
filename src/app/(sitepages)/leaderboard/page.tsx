"use client";
// doesnt seem to be used:
// import Link from "next/link";
import React from "react";
import NavBar from "~/app/_components/(core)/NavBar";
import "~/styles/leaderboard.css";
import { api } from "~/trpc/server";
//import EsoPosts from "~/app/_components/(postApproval)/EsoPosts";


// export async function GetLeaderboardInfo() {
//   const data = await api.get.myQuery.query()

//   // return (
//   //      data.map(dat => { <NewComponent
//   //      passedProp={dat.whatever}
//   //      passedPropMore={dat.whateverMore}
//   //  /> })
//   // )
// }


// export default function NewComponent({passedProp, passedPropMore}){
export default async function LeaderboardPage() {
// export default function LeaderboardPage() {
  // ...component logic
  // const data = await api.get.myQuery.query()

  return (
    <main>
      <NavBar />

      <form method="post" action="" className="leaderboard-form">
        <label htmlFor="start_date" className="font-bold">Start Date:</label>
        <input type="date" id="start_date" name="start_date" value="2024-01-30" className="leaderboard-input-date"/>

        <label htmlFor="end_date" className="font-bold"> End Date:</label>
        <input type="date" id="end_date" name="end_date" value="2024-02-01" className="leaderboard-input-date"/>

        <input type="submit" value="Submit" className="btn btn-success leaderboard-btn"/>
      </form>

      <div className="leaderboard font-bold text-xl">
        <h2 className="leaderboard-title">Leaderboard</h2>
        <div className="leaderboard-table overflow-x-auto">
          <div className="white-line-bar"></div>
          <table className="table leaderboard-content text-base">
              <thead className="leaderboard-headers font-bold text-lg">
                  <tr>
                    <th>User</th>
                    <th>Rank</th>
                    <th>Points</th>
                    <th>Voice Duration</th>
                    <th>Messages</th>
                    <th>Passed</th>
                  </tr>
              </thead>
              <tbody>
                <tr className="hover">
                  <td>User1</td>
                  <td>Respected</td>
                  <td>497</td>
                  <td>36.19</td>
                  <td>0</td>
                  <td>Yes</td>
                </tr>
                <tr className="hover">
                  <td>User2</td>
                  <td>High Council	</td>
                  <td>3717</td>
                  <td>47.19</td>
                  <td>0</td>
                  <td>Yes</td>
                </tr>
                <tr className="hover">
                  <td>User3</td>
                  <td>Respected</td>
                  <td>359</td>
                  <td>0.00</td>
                  <td>0</td>
                  <td>Yes</td>
                </tr>
              </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
