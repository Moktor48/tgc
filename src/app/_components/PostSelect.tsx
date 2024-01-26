"use client"
import PostSubmit from './PostSubmit'
import React, { useState } from 'react'
import type { Session } from 'next-auth'
interface Props {
    game: string
    userId: string
    session: Session
    staff: {
        id: string;
        userId: string;
        admin: boolean | null;
        specialist: boolean | null;
        representative: boolean | null;
        highcouncil: boolean | null;
        guildmaster: boolean | null;
    } | null
    eso: {
        id: string;
        userId: string;
        rank: string;
        raid: boolean | null;
        raidlead: boolean | null;
        mentor: boolean | null;
    } | null
    ffxiv: {
        id: string;
        userId: string;
        rank: string;
        raid: boolean | null;
        raidlead: boolean | null;
        mentor: boolean | null;
    } | null
    swtor: {
        id: string;
        userId: string;
        rank: string;
        raid: boolean | null;
        raidlead: boolean | null;
        mentor: boolean | null;
    } | null
}

export default function PostSelect({game, userId, session, staff, eso, ffxiv, swtor}: Props) {
    const [gameSelect, setGameSelect] = useState({game_select: game})
    const [typeSelect, setTypeSelect] = useState({type_select: "default"})
    const [roleSelect, setRoleSelect] = useState({role_select: "default"})
    const raid = eso?.raid ?? ffxiv?.raid ?? swtor?.raid ?? false
    const officer = eso?.rank === "officer" ?? ffxiv?.rank === "officer" ?? swtor?.rank === "officer" ?? false
    console.log(raid)
    const handleGS = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGameSelect({game_select: e.target.value})
        }
    const handleTS = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTypeSelect({type_select: e.target.value})
        }
    const handleRS = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRoleSelect({role_select: e.target.value})
        }

  return (
    <div>
        <form>
            <select name="game_select" id="game_select" onChange={handleGS}> {/*Available if you have guild access */}
                <option value="general">General</option>
                {eso?.rank != "none" && <option value="eso">ESO</option>}
                {ffxiv?.rank != "none" && <option value="ffxiv">FFXIV</option>}
                {swtor?.rank != "none" && <option value="swtor">SWTOR</option>}
            </select>
            <select name="type_select" id="type_select" onChange={handleTS}> {/*Available after selecting game */}
                <option value="default">Choose template type...</option>
                <option value="1">Build</option>
                <option value="2">Guide</option>
                <option value="3">Notification</option>
                <option value="4">Report</option>
            </select>
            <select name="role_select" id="role_select" onChange={handleRS}> {/*Available based on user roles */}
                <option value="default">Choose audience type...</option>
                <option value="1">General</option>
                {staff && <option value="2">Staff</option>}
                {raid && <option value="3">Raid</option>}
                {officer && <option value="4">Guild Officer</option>}
                <option value="5">Guildmembers</option>
            </select>
        </form>
        <PostSubmit
            userId={userId}
            gameSelect={gameSelect.game_select}
            typeSelect={typeSelect.type_select}
            roleSelect={roleSelect.role_select}
            />
    </div>
  )
}
