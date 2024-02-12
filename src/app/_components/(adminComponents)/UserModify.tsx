"use client";
import Image from "next/image";
import React, { useState } from "react";

interface Profile {
  officer: {
    eso: string | undefined;
    ffxiv: string | undefined;
    swtor: string | undefined;
  };
  perm: {
    id: string;
    userId: string;
    admin: boolean | null;
    specialist: boolean | null;
    representative: boolean | null;
    highcouncil: boolean | null;
    guildmaster: boolean | null;
  } | null;
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
  } | null;
  userEso: {
    id: string;
    userId: string;
    rank: string;
    raid: boolean | null;
    raidlead: boolean | null;
    mentor: boolean | null;
  } | null;
  userFfxiv: {
    id: string;
    userId: string;
    rank: string;
    raid: boolean | null;
    raidlead: boolean | null;
    mentor: boolean | null;
  } | null;
  userSwtor: {
    id: string;
    userId: string;
    rank: string;
    raid: boolean | null;
    raidlead: boolean | null;
    mentor: boolean | null;
  } | null;
  userStaff: {
    id: string;
    userId: string;
    admin: boolean | null;
    specialist: boolean | null;
    representative: boolean | null;
    highcouncil: boolean | null;
    guildmaster: boolean | null;
  } | null;
}

export default function UserModify({
  perm,
  officer,
  user,
  userEso,
  userFfxiv,
  userSwtor,
  userStaff,
}: Profile) {
  const [esoState, setEsoState] = useState({
    rank: userEso?.rank ?? "",
    raid: userEso?.raid ?? false,
    raidlead: userEso?.raidlead ?? false,
    mentor: userEso?.mentor ?? false,
  });
  const [ffxivState, setFfxivState] = useState({
    rank: userFfxiv?.rank ?? "",
    raid: userFfxiv?.raid ?? false,
    raidlead: userFfxiv?.raidlead ?? false,
    mentor: userFfxiv?.mentor ?? false,
  });
  const [swtorState, setSwtorState] = useState({
    rank: userSwtor?.rank ?? "",
    raid: userSwtor?.raid ?? false,
    raidlead: userSwtor?.raidlead ?? false,
    mentor: userSwtor?.mentor ?? false,
  });
  const [staffState, setStaffState] = useState({
    admin: userStaff?.admin ?? false,
    specialist: userStaff?.specialist ?? false,
    representative: userStaff?.representative ?? false,
    highcouncil: userStaff?.highcouncil ?? false,
    guildmaster: userStaff?.guildmaster ?? false,
  });
  const showPermissions =
    perm?.guildmaster ?? perm?.highcouncil ?? officer.eso === "officer";

  return (
    <div>
      <h1>User Modifications</h1>
      <div>
        <h2>User</h2>
        <p>User Name: {user?.name}</p>
        <p>User Email: {user?.email}</p>
        <Image src={`${user?.image}`} width={30} height={30} alt="avatar" />
      </div>
      <div>
        {showPermissions && <h2>ESO Permissions</h2>}
        <form>
          {(perm?.guildmaster ??
            perm?.highcouncil ??
            officer.eso === "officer") && (
            <label>
              Rank:
              <select
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

          {(perm?.guildmaster ??
            perm?.highcouncil ??
            officer.eso === "officer") && (
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

          {(perm?.guildmaster ??
            perm?.highcouncil ??
            officer.eso === "officer") && (
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

          {(perm?.guildmaster ??
            perm?.highcouncil ??
            officer.eso === "officer") && (
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
      <div>
        {(perm?.guildmaster ??
          perm?.highcouncil ??
          officer.ffxiv === "officer") && <h2>FFXIV Permissions</h2>}
        <form>
          {(perm?.guildmaster ??
            perm?.highcouncil ??
            officer.ffxiv === "officer") && (
            <label>
              Rank:
              <select
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

          {(perm?.guildmaster ??
            perm?.highcouncil ??
            officer.ffxiv === "officer") && (
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

          {(perm?.guildmaster ??
            perm?.highcouncil ??
            officer.ffxiv === "officer") && (
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

          {(perm?.guildmaster ??
            perm?.highcouncil ??
            officer.ffxiv === "officer") && (
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
      <div>
        {(perm?.guildmaster ??
          perm?.highcouncil ??
          officer.swtor === "officer") && <h2>SWTOR Permissions</h2>}
        <form>
          {(perm?.guildmaster ??
            perm?.highcouncil ??
            officer.swtor === "officer") && (
            <label>
              Rank:
              <select
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

          {(perm?.guildmaster ??
            perm?.highcouncil ??
            officer.swtor === "officer") && (
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

          {(perm?.guildmaster ??
            perm?.highcouncil ??
            officer.swtor === "officer") && (
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

          {(perm?.guildmaster ??
            perm?.highcouncil ??
            officer.swtor === "officer") && (
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
      <div>
        {(perm?.guildmaster ?? perm?.highcouncil) && <h2>Staff Permissions</h2>}
        <form>
          {(perm?.guildmaster ?? perm?.highcouncil) && (
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

          {(perm?.guildmaster ?? perm?.highcouncil) && (
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

          {(perm?.guildmaster ?? perm?.highcouncil) && (
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

          {perm?.guildmaster && (
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

          {perm?.guildmaster && (
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
      </div>
    </div>
  );
}
