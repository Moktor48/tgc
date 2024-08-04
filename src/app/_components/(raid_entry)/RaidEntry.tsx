"use client";

import React, { useState, useMemo } from "react";
import { api } from "~/trpc/react";
import { debounce } from "lodash";
import type { Session } from "next-auth";

type User = {
  gmember_id: string;
  disc_nickname: string;
  ingame_name: string;
  highest_rank_role: number;
};

export default function RaidEntry({
  userId,
  session,
}: {
  userId: string;
  session: Session;
}) {
  const { data: trialNames } = api.get.get_eso_trials.useQuery();
  const core = trialNames?.filter((trial) => trial.type === "core") ?? [];
  const dungeons = trialNames?.filter((trial) => trial.type === "dlc") ?? [];
  const trials = trialNames?.filter((trial) => trial.type === "trial") ?? [];
  const { data: users, isLoading } = api.get.discordUsers.useQuery();

  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState(""); // New state for input value

  //SUBMISSION DATA
  //Leader for the event (eso_raid.gmember_id)
  const [leader, setLeader] = useState("");
  //Attendee list (eso_raid_attend.gmember_id) + (eso_raid_attend.raid_uid)
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  //Trial selection (eso_raid.trial_name) + (eso_raid_attend.raid_uid)
  const [selectedTrial, setSelectedTrial] = useState("");
  //Timestamps (eso_raid.start_time) + (eso_raid.end_time)
  const [times, setTimes] = useState({ start_time: "", end_time: "" });
  //Option bank
  const [options, setOptions] = useState({
    veteran: false,
    hardmode: false,
    trifecta: false,
    score: false,
  });
  // Scores
  const [scores, setScores] = useState({
    points: 0,
    vitality: 0,
  });
  const debouncedSearchQuery = useMemo(
    () => debounce((query: string) => setSearchQuery(query), 300),
    [],
  );
  //END SUBMISSION DATA

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Update input value state
    debouncedSearchQuery(e.target.value); // Update search query state after debounce
  };

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter((user) =>
      user.ingame_name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [users, searchQuery]);

  const handleSelectUser = (user: User) => {
    setSelectedUsers([...selectedUsers, user]);
    setSearchQuery("");
    setInputValue(""); // Clear input value
  };
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTrial(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleOptions = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOptions = {
      veteran: false,
      hardmode: false,
      trifecta: false,
      score: false,
    };
    if (e.target.value === "veteran") {
      setOptions({ ...newOptions, veteran: true });
    } else if (e.target.value === "hardmode") {
      setOptions({ ...newOptions, hardmode: true });
    } else if (e.target.value === "trifecta") {
      setOptions({ ...newOptions, trifecta: true });
    } else if (e.target.value === "score") {
      setOptions({ ...newOptions, score: true });
    }
  };
  return (
    <div>
      <h1>Raid Entry System</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Choose Trial:
          <select onChange={handleSelect}>
            <option value="">-----Core Dungeon-----</option>
            {core.map((trial) => (
              <option key={trial.trial_name} value={trial.trial_name}>
                {trial.trial_name}
              </option>
            ))}
            <option value="">-----DLC Dungeon-----</option>
            {dungeons.map((trial) => (
              <option key={trial.trial_name} value={trial.trial_name}>
                {trial.trial_name}
              </option>
            ))}
            <option value="">-----Trial-----</option>
            {trials.map((trial) => (
              <option key={trial.trial_name} value={trial.trial_name}>
                {trial.trial_name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Options:
          <label>
            <select onChange={handleOptions}>
              <option value="normal">Normal</option>
              <option value="veteran">Veteran</option>
              <option value="hardmode">Hardmode</option>
              <option value="trifecta">Trifecta</option>
              <option value="score">Score</option>
            </select>
          </label>
          {options.score && (
            <label>
              Score:
              <input
                type="number"
                value={scores.points}
                onChange={(e) =>
                  setScores({ ...scores, points: Number(e.target.value) })
                }
              />
            </label>
          )}
          {options.score ||
            (options.trifecta && (
              <label>
                Vitality:
                <input
                  type="number"
                  value={scores.vitality}
                  onChange={(e) =>
                    setScores({ ...scores, vitality: Number(e.target.value) })
                  }
                />
              </label>
            ))}
        </label>
        <br />
        <label>
          Date/Time Start:
          <input
            type="datetime-local"
            onChange={(e) => setTimes({ ...times, start_time: e.target.value })}
          />
        </label>
        <label>
          Date/Time End:
          <input
            type="datetime-local"
            onChange={(e) => setTimes({ ...times, end_time: e.target.value })}
          />
        </label>
        <br />
        <label>Choose Attendees:</label>
        <input
          type="text"
          value={inputValue} // Bind input value state
          onChange={handleSearchChange}
          placeholder="Search for users..."
        />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          searchQuery && (
            <ul>
              {filteredUsers.map((user) => (
                <li
                  className="underline"
                  key={user.gmember_id}
                  onClick={() => handleSelectUser(user)}
                >
                  {user.ingame_name}
                </li>
              ))}
            </ul>
          )
        )}
        <div>
          <br />
          <h3>Selected Users:</h3>
          <ul>
            {selectedUsers
              .sort((a, b) =>
                a.gmember_id === leader ? -1 : b.gmember_id === leader ? 1 : 0,
              )
              .map((user) => (
                <li
                  className={
                    leader === user.gmember_id
                      ? "text-green-500"
                      : "text-yellow-500"
                  }
                  key={user.gmember_id}
                >
                  {user.ingame_name}
                  {leader === user.gmember_id ? " (Leader)" : ""}
                  <input
                    type="checkbox"
                    id={user.gmember_id}
                    checked={leader === user.gmember_id}
                    onChange={() => setLeader(user.gmember_id)}
                  ></input>
                </li>
              ))}
          </ul>
        </div>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
