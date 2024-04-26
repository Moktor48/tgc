"use client";
import React, { useState } from "react";

export default function RaidEntry({
  userId,
  leaders,
  raiders,
  trials,
}: {
  userId: string;
  leaders: {
    id: string;
    name: string;
    email: string;
    emailVerified: Date | null;
    image: string;
    role: string;
    tgc_guild_member: boolean;
  }[];
  raiders: {
    id: string;
    name: string;
    email: string;
    emailVerified: Date | null;
    image: string;
    role: string;
    tgc_guild_member: boolean;
  }[];
  trials: {
    trial_name: string;
    base_value: number;
    hard_mode: number;
    veteran: number;
  }[];
}) {
  const [leader, setLeader] = useState("");
  const [selectedRaiders, setSelectedRaiders] = useState<string[]>([]);
  const [trial, setTrial] = useState("");
  const [modifiers, setModifiers] = useState({
    hardMode: false,
    veteran: false,
    noDeath: false,
    speedRun: false,
    noBuffs: false,
  });
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedRaiders((prevState) => {
      if (checked) {
        // Add raider to selectedRaiders
        return [...prevState, value];
      } else {
        // Remove raider from selectedRaiders
        return prevState.filter((raider) => raider !== value);
      }
    });
  };
  return (
    <div>
      <form>
        <select onChange={(e) => setLeader(e.target.value)}>
          <option value={leader}>Please select...</option>
          {leaders.map((data) => (
            <option key={data.id} value={data.id}>
              {data.name}
            </option>
          ))}
        </select>
        <select onChange={(e) => setTrial(e.target.value)}>
          <option value={trial}>Please select...</option>
          {trials.map((data) => (
            <option key={data.trial_name} value={data.trial_name}>
              {data.trial_name}
            </option>
          ))}
        </select>
        <div>
          <input
            type="checkbox"
            value="hardMode"
            onChange={(e) =>
              setModifiers({ ...modifiers, hardMode: e.target.checked })
            }
            checked={modifiers.hardMode}
          />
          <label>Hard Mode</label>
          <input
            type="checkbox"
            value="veteran"
            onChange={(e) =>
              setModifiers({ ...modifiers, veteran: e.target.checked })
            }
            checked={modifiers.veteran}
          />
          <label>Veteran</label>
          <input
            type="checkbox"
            value="noDeath"
            onChange={(e) =>
              setModifiers({ ...modifiers, noDeath: e.target.checked })
            }
            checked={modifiers.noDeath}
          />
          <label>No Death</label>
          <input
            type="checkbox"
            value="speedRun"
            onChange={(e) =>
              setModifiers({ ...modifiers, speedRun: e.target.checked })
            }
            checked={modifiers.speedRun}
          />
          <label>Speed Run</label>
          <input
            type="checkbox"
            value="noBuffs"
            onChange={(e) =>
              setModifiers({ ...modifiers, noBuffs: e.target.checked })
            }
            checked={modifiers.noBuffs}
          />
          <label>No Buffs</label>
        </div>

        {raiders.map((data) => (
          <label key={data.id}>
            <input
              type="checkbox"
              value={data.id}
              onChange={handleCheckboxChange}
              checked={selectedRaiders.includes(data.id)}
            />
            {data.name}
          </label>
        ))}
      </form>
    </div>
  );
}
