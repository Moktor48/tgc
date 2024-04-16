"use client";
import Image from "next/image";
import React, { useState } from "react";
import { api } from "~/trpc/react";
interface Profile {
  searchUserId: string;
  officer: {
    eso: string | undefined;
    ffxiv: string | undefined;
    swtor: string | undefined;
  };

  user: {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
  } | null;
  userEso: {
    userId: string;
    rank: string;
    raid: boolean | null;
    raidlead: boolean | null;
    mentor: boolean | null;
  } | null;
  userFfxiv: {
    userId: string;
    rank: string;
    raid: boolean | null;
    raidlead: boolean | null;
    mentor: boolean | null;
  } | null;
  userSwtor: {
    userId: string;
    rank: string;
    raid: boolean | null;
    raidlead: boolean | null;
    mentor: boolean | null;
  } | null;
  userStaff: {
    userId: string;
    admin: boolean | null;
    specialist: boolean | null;
    representative: boolean | null;
    highcouncil: boolean | null;
    guildmaster: boolean | null;
  } | null;
}

export default function UserModify({
  officer,
  user,
  userEso,
  userFfxiv,
  userSwtor,
  userStaff,
  searchUserId,
}: Profile) {
  const [esoState, setEsoState] = useState({
    userId: userEso?.userId ?? searchUserId,
    rank: userEso?.rank ?? "none",
    raid: userEso?.raid ?? false,
    raidlead: userEso?.raidlead ?? false,
    mentor: userEso?.mentor ?? false,
  });
  const [ffxivState, setFfxivState] = useState({
    userId: userFfxiv?.userId ?? searchUserId,
    rank: userFfxiv?.rank ?? "none",
    raid: userFfxiv?.raid ?? false,
    raidlead: userFfxiv?.raidlead ?? false,
    mentor: userFfxiv?.mentor ?? false,
  });
  const [swtorState, setSwtorState] = useState({
    userId: userSwtor?.userId ?? searchUserId,
    rank: userSwtor?.rank ?? "none",
    raid: userSwtor?.raid ?? false,
    raidlead: userSwtor?.raidlead ?? false,
    mentor: userSwtor?.mentor ?? false,
  });
  const [staffState, setStaffState] = useState({
    userId: userStaff?.userId ?? searchUserId,
    admin: userStaff?.admin ?? false,
    specialist: userStaff?.specialist ?? false,
    representative: userStaff?.representative ?? false,
    highcouncil: userStaff?.highcouncil ?? false,
    guildmaster: userStaff?.guildmaster ?? false,
  });
  const [sucStateEso, setSucStateEso] = useState("text-red-500");
  const [sucStateFfxiv, setSucStateFfxiv] = useState("text-red-500");
  const [sucStateSwtor, setSucStateSwtor] = useState("text-red-500");
  const [sucStateStaff, setSucStateStaff] = useState("text-red-500");
  const hasGuildmasterPermissions = Boolean(userStaff?.guildmaster);
  const hasHighCouncilPermissions = Boolean(userStaff?.highcouncil);
  const hasAdminPermissions = Boolean(userStaff?.admin);
  const isOfficer = officer.eso === "officer";
  const isFFXIVOfficer = officer.ffxiv === "officer";
  const isSWTOROfficer = officer.swtor === "officer";
  const showPermissions =
    hasGuildmasterPermissions ||
    hasHighCouncilPermissions ||
    hasAdminPermissions ||
    isOfficer;
  const showFFXIVPermissions =
    hasGuildmasterPermissions ||
    hasHighCouncilPermissions ||
    hasAdminPermissions ||
    isFFXIVOfficer;
  const showSWTORPermissions =
    hasGuildmasterPermissions ||
    hasHighCouncilPermissions ||
    hasAdminPermissions ||
    isSWTOROfficer;
  const showStaffPermissions =
    hasGuildmasterPermissions ||
    hasHighCouncilPermissions ||
    hasAdminPermissions;
  const updEso = api.put.updateUserEso.useMutation({
    onSuccess(data) {
      if (!data) return null;
      setSucStateEso("text-green-500");
    },
  });
  const updFfxiv = api.put.updateUserFfxiv.useMutation({
    onSuccess(data) {
      if (!data) return null;
      setSucStateFfxiv("text-green-500");
    },
  });
  const updSwtor = api.put.updateUserSwtor.useMutation({
    onSuccess(data) {
      if (!data) return null;
      setSucStateSwtor("text-green-500");
    },
  });
  const updStaff = api.put.updateUserStaff.useMutation({
    onSuccess(data) {
      if (!data) return null;
      setSucStateStaff("text-green-500");
    },
  });
  const createEso = api.post.createEsoPermission.useMutation({
    onSuccess(data) {
      if (!data) return null;
      setSucStateEso("text-green-500");
    },
  });
  const createFfxiv = api.post.createFfxivPermission.useMutation({
    onSuccess(data) {
      if (!data) return null;
      setSucStateFfxiv("text-green-500");
    },
  });
  const createSwtor = api.post.createSwtorPermission.useMutation({
    onSuccess(data) {
      if (!data) return null;
      setSucStateSwtor("text-green-500");
    },
  });
  const createStaff = api.post.createStaffPermission.useMutation({
    onSuccess(data) {
      if (!data) return null;
      setSucStateStaff("text-green-500");
    },
  });

  const submitForms = async () => {
    if (esoState.userId === "") {
      createEso.mutate(esoState);
    } else {
      updEso.mutate(esoState);
    }
    if (ffxivState.userId === "") {
      createFfxiv.mutate(ffxivState);
    } else {
      updFfxiv.mutate(ffxivState);
    }
    if (swtorState.userId === "") {
      createSwtor.mutate(swtorState);
    } else {
      updSwtor.mutate(swtorState);
    }
    if (staffState.userId === "") {
      createStaff.mutate(staffState);
    } else {
      updStaff.mutate(staffState);
    }
  };
  return (
    <div>
      <h1 className="text-white">User Modifications</h1>
      <div className="text-white">
        <h2>User</h2>
        <p>User Name: {user?.name}</p>
        <p>User Email: {user?.email}</p>
        <Image src={`${user?.image}`} width={30} height={30} alt="avatar" />
      </div>
      <div className="text-white">
        {showPermissions && <h2>ESO Permissions</h2>}
        <form>
          {showPermissions && (
            <label>
              Rank:
              <select
                className="text-black"
                value={esoState.rank}
                onChange={(e) =>
                  setEsoState({ ...esoState, rank: e.target.value })
                }
              >
                <option value="none">none</option>
                <option value="member">member</option>
                <option value="officer">officer</option>
              </select>
            </label>
          )}

          {showPermissions && (
            <label>
              Raid:
              <input
                type="checkbox"
                checked={esoState.raid ?? false}
                onChange={(e) =>
                  setEsoState({ ...esoState, raid: e.target.checked })
                }
              />
            </label>
          )}

          {showPermissions && (
            <label>
              Raidlead:
              <input
                type="checkbox"
                checked={esoState.raidlead ?? false}
                onChange={(e) =>
                  setEsoState({ ...esoState, raidlead: e.target.checked })
                }
              />
            </label>
          )}

          {showPermissions && (
            <label>
              Mentor:
              <input
                type="checkbox"
                checked={esoState.mentor ?? false}
                onChange={(e) =>
                  setEsoState({ ...esoState, mentor: e.target.checked })
                }
              />
            </label>
          )}
        </form>
      </div>
      <div className="text-white">
        {showFFXIVPermissions && <h2>FFXIV Permissions</h2>}
        <form>
          {showFFXIVPermissions && (
            <label>
              Rank:
              <select
                className="text-black"
                value={ffxivState.rank}
                onChange={(e) =>
                  setFfxivState({ ...ffxivState, rank: e.target.value })
                }
              >
                <option value="none">none</option>
                <option value="member">member</option>
                <option value="officer">officer</option>
              </select>
            </label>
          )}

          {showFFXIVPermissions && (
            <label>
              Raid:
              <input
                type="checkbox"
                checked={ffxivState.raid ?? false}
                onChange={(e) =>
                  setFfxivState({ ...ffxivState, raid: e.target.checked })
                }
              />
            </label>
          )}

          {showFFXIVPermissions && (
            <label>
              Raidlead:
              <input
                type="checkbox"
                checked={ffxivState.raidlead ?? false}
                onChange={(e) =>
                  setFfxivState({ ...ffxivState, raidlead: e.target.checked })
                }
              />
            </label>
          )}

          {showFFXIVPermissions && (
            <label>
              Mentor:
              <input
                type="checkbox"
                checked={ffxivState.mentor ?? false}
                onChange={(e) =>
                  setFfxivState({ ...ffxivState, mentor: e.target.checked })
                }
              />
            </label>
          )}
        </form>
      </div>
      <div className="text-white">
        {showSWTORPermissions && <h2>SWTOR Permissions</h2>}
        <form>
          {showSWTORPermissions && (
            <label>
              Rank:
              <select
                className="text-black"
                value={swtorState.rank}
                onChange={(e) =>
                  setSwtorState({ ...swtorState, rank: e.target.value })
                }
              >
                <option value="none">none</option>
                <option value="member">member</option>
                <option value="officer">officer</option>
              </select>
            </label>
          )}

          {showSWTORPermissions && (
            <label>
              Raid:
              <input
                type="checkbox"
                checked={swtorState.raid ?? false}
                onChange={(e) =>
                  setSwtorState({ ...swtorState, raid: e.target.checked })
                }
              />
            </label>
          )}

          {showSWTORPermissions && (
            <label>
              Raidlead:
              <input
                type="checkbox"
                checked={swtorState.raidlead ?? false}
                onChange={(e) =>
                  setSwtorState({ ...swtorState, raidlead: e.target.checked })
                }
              />
            </label>
          )}

          {showSWTORPermissions && (
            <label>
              Mentor:
              <input
                type="checkbox"
                checked={swtorState.mentor ?? false}
                onChange={(e) =>
                  setSwtorState({ ...swtorState, mentor: e.target.checked })
                }
              />
            </label>
          )}
        </form>
      </div>
      <div className="text-white">
        {showStaffPermissions && <h2>Staff Permissions</h2>}
        <form>
          {showStaffPermissions && (
            <label>
              Admin:
              <input
                type="checkbox"
                checked={staffState.admin ?? false}
                onChange={(e) =>
                  setStaffState({ ...staffState, admin: e.target.checked })
                }
              />
            </label>
          )}

          {showStaffPermissions && (
            <label>
              Specialist:
              <input
                type="checkbox"
                checked={staffState.specialist ?? false}
                onChange={(e) =>
                  setStaffState({ ...staffState, specialist: e.target.checked })
                }
              />
            </label>
          )}

          {showStaffPermissions && (
            <label>
              Representative:
              <input
                type="checkbox"
                checked={staffState.representative ?? false}
                onChange={(e) =>
                  setStaffState({
                    ...staffState,
                    representative: e.target.checked,
                  })
                }
              />
            </label>
          )}

          {userStaff?.guildmaster && (
            <label>
              High Council:
              <input
                type="checkbox"
                checked={staffState.highcouncil ?? false}
                onChange={(e) =>
                  setStaffState({
                    ...staffState,
                    highcouncil: e.target.checked,
                  })
                }
              />
            </label>
          )}

          {userStaff?.guildmaster && (
            <label>
              Guildmaster:
              <input
                type="checkbox"
                checked={staffState.guildmaster ?? false}
                onChange={(e) =>
                  setStaffState({
                    ...staffState,
                    guildmaster: e.target.checked,
                  })
                }
              />
            </label>
          )}
        </form>
        <button onClick={submitForms} className="button-40">
          SAVE CHANGES
        </button>
        <div>
          <p className={sucStateEso}>ESO Changes</p>
          <p className={sucStateFfxiv}>FFXIV Changes</p>
          <p className={sucStateSwtor}>SWTOR Changes</p>
          <p className={sucStateStaff}>Staff Changes</p>
        </div>
      </div>
    </div>
  );
}
