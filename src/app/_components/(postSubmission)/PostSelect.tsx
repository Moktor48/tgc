//This is the client component for the post submission function. I had the queries run in server and passed here. This page allows you to set up the editor with your intended audience and template, and grants those choices based on your roles/permissions.
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
interface Props {
  id: string;
  staff: {
    id: string;
    userId: string;
    admin: boolean | null;
    specialist: boolean | null;
    representative: boolean | null;
    highcouncil: boolean | null;
    guildmaster: boolean | null;
  } | null;
  eso: {
    id: string;
    userId: string;
    rank: string;
    raid: boolean | null;
    raidlead: boolean | null;
    mentor: boolean | null;
  } | null;
  ffxiv: {
    id: string;
    userId: string;
    rank: string;
    raid: boolean | null;
    raidlead: boolean | null;
    mentor: boolean | null;
  } | null;
  swtor: {
    id: string;
    userId: string;
    rank: string;
    raid: boolean | null;
    raidlead: boolean | null;
    mentor: boolean | null;
  } | null;
}

export default function PostSelect({ id, staff, eso, ffxiv, swtor }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [gameSelect, setGameSelect] = useState({ game_select: "general" });
  const [typeSelect, setTypeSelect] = useState({ type_select: "default" });
  const [roleSelect, setRoleSelect] = useState({ role_select: "default" });
  const raid = eso?.raid ?? ffxiv?.raid ?? swtor?.raid ?? false;
  const officer =
    eso?.rank === "officer" ??
    ffxiv?.rank === "officer" ??
    swtor?.rank === "officer" ??
    false;
  const staffP = staff?.specialist ?? true ?? false;
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const handleGS = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGameSelect({ game_select: e.target.value });
  };
  const handleTS = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeSelect({ type_select: e.target.value });
  };
  const handleRS = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoleSelect({ role_select: e.target.value });
  };

  return (
    <div>
      <form>
        <select name="game_select" id="game_select" onChange={handleGS}>
          {" "}
          {/*Available if you have guild access */}
          <option value="general">General</option>
          {eso?.rank != "none" && eso?.rank != null && (
            <option value="eso">ESO</option>
          )}
          {ffxiv?.rank != "none" && ffxiv?.rank != null && (
            <option value="ffxiv">FFXIV</option>
          )}
          {swtor?.rank != "none" && swtor?.rank != null && (
            <option value="swtor">SWTOR</option>
          )}
        </select>
        <select name="type_select" id="type_select" onChange={handleTS}>
          {" "}
          {/*Available after selecting game */}
          <option value="default">Choose template type...</option>
          <option value="1">Build</option>
          <option value="2">Guide</option>
          <option value="3">Notification</option>
          <option value="4">Report</option>
        </select>
        <select name="role_select" id="role_select" onChange={handleRS}>
          {" "}
          {/*Available based on user roles */}
          <option value="default">Choose audience type...</option>
          <option value="0">General</option>
          {staffP && <option value="staff">Staff</option>}
          {raid && <option value="raid">Raid</option>}
          {officer && <option value="officer">Guild Officer</option>}
        </select>
      </form>
      <button
        className="text-white"
        onClick={() => {
          // <pathname>?sort=asc
          router.push(
            `/editor/${id}/submit?` +
              createQueryString("game", gameSelect.game_select) +
              "&" +
              createQueryString("type", typeSelect.type_select) +
              "&" +
              createQueryString("role", roleSelect.role_select),
          );
        }}
      >
        Submit to Editor
      </button>
    </div>
  );
}
