"use client";
import React from "react";
import { api } from "~/trpc/react";
import { useState } from "react";

interface User {
  name: string;
  email: string;
  image: string;
  role: string;
}

interface Staff {
  admin: boolean;
  specialist: boolean;
  representative: boolean;
  highcouncil: boolean;
  guildmaster: boolean;
}

interface Game {
  rank: string;
  raid: boolean;
  raidlead: boolean;
  mentor: boolean;
}

export default function UserBuilder() {
  const [userData, setUserData] = useState<User>({
    name: "",
    email: "",
    image: "",
    role: "",
  });
  const [staffData, setStaffData] = useState<Staff>({
    admin: false,
    specialist: false,
    representative: false,
    highcouncil: false,
    guildmaster: false,
  });
  const [esoData, setEsoData] = useState<Game>({
    rank: "",
    raid: false,
    raidlead: false,
    mentor: false,
  });
  const [swtorData, setSwtorData] = useState<Game>({
    rank: "",
    raid: false,
    raidlead: false,
    mentor: false,
  });
  const [ffxivData, setFfxivData] = useState<Game>({
    rank: "",
    raid: false,
    raidlead: false,
    mentor: false,
  });
  const createUser = api.post.createUser.useMutation({
    onSuccess: (data) => {
      const id = data.id;
      const pId = { userId: id };
      const staffDataX = { ...staffData, ...pId };
      const esoDataX = { ...esoData, ...pId };
      const swtorDataX = { ...swtorData, ...pId };
      const ffxivDataX = { ...ffxivData, ...pId };
      if (!data.id) return null;
      createStaff.mutate(staffDataX);
      createESO.mutate(esoDataX);
      createSWTOR.mutate(swtorDataX);
      createFFXIV.mutate(ffxivDataX);
    },
  });
  const createStaff = api.post.createStaffPermission.useMutation();
  const createESO = api.post.createEsoPermission.useMutation();
  const createSWTOR = api.post.createSwtorPermission.useMutation();
  const createFFXIV = api.post.createFfxivPermission.useMutation();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(userData);
    console.log(staffData);
    console.log(esoData);
    console.log(swtorData);
    console.log(ffxivData);
    createUser.mutate(userData);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="text-white">Username</label>
        <input
          name="name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <br />
        <label className="text-white">Email</label>
        <input
          name="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <br />
        <label className="text-white">Image</label>
        <input
          name="image"
          value={userData.image}
          onChange={(e) => setUserData({ ...userData, image: e.target.value })}
        />
        <br />
        <label className="text-white">Role</label>
        <input
          name="role"
          value={userData.role}
          onChange={(e) => setUserData({ ...userData, role: e.target.value })}
        />
        <br />
        <label className="text-white">Staff - Admin</label>
        <input
          type="checkbox"
          checked={staffData.admin}
          name="admin"
          onChange={() =>
            setStaffData({ ...staffData, admin: !staffData.admin })
          }
        />
        <br />
        <label className="text-white">Staff - Specialist</label>
        <input
          type="checkbox"
          name="specialist"
          checked={staffData.specialist}
          onChange={() =>
            setStaffData({ ...staffData, specialist: !staffData.specialist })
          }
        />
        <br />
        <label className="text-white">Staff - Representative</label>
        <input
          type="checkbox"
          name="representative"
          checked={staffData.representative}
          onChange={() =>
            setStaffData({
              ...staffData,
              representative: !staffData.representative,
            })
          }
        />
        <br />
        <label className="text-white">Staff - High Council</label>
        <input
          type="checkbox"
          name="highcouncil"
          checked={staffData.highcouncil}
          onChange={() =>
            setStaffData({ ...staffData, highcouncil: !staffData.highcouncil })
          }
        />
        <br />
        <label className="text-white">Staff - Guild Master</label>
        <input
          type="checkbox"
          name="guildmaster"
          checked={staffData.guildmaster}
          onChange={() =>
            setStaffData({ ...staffData, guildmaster: !staffData.guildmaster })
          }
        />
        <br />
        <label className="text-white">ESO - Rank</label>
        <input
          name="rank"
          value={esoData.rank}
          onChange={(e) => setEsoData({ ...esoData, rank: e.target.value })}
        />
        <br />
        <label className="text-white">ESO - Raid</label>
        <input
          type="checkbox"
          name="raid"
          checked={esoData.raid}
          onChange={() => setEsoData({ ...esoData, raid: !esoData.raid })}
        />
        <br />
        <label className="text-white">ESO - Raid Lead</label>
        <input
          type="checkbox"
          name="raidlead"
          checked={esoData.raidlead}
          onChange={() =>
            setEsoData({ ...esoData, raidlead: !esoData.raidlead })
          }
        />
        <br />
        <label className="text-white">ESO - Mentor</label>
        <input
          type="checkbox"
          name="mentor"
          checked={esoData.mentor}
          onChange={() => setEsoData({ ...esoData, mentor: !esoData.mentor })}
        />
        <br />
        <label className="text-white">FFXIV - Rank</label>
        <input
          name="rankF"
          value={ffxivData.rank}
          onChange={(e) => setFfxivData({ ...ffxivData, rank: e.target.value })}
        />
        <br />
        <label className="text-white">FFXIV - Raid</label>
        <input
          type="checkbox"
          name="raidF"
          checked={ffxivData.raid}
          onChange={() => setFfxivData({ ...ffxivData, raid: !ffxivData.raid })}
        />
        <br />
        <label className="text-white">FFXIV - Raid Lead</label>
        <input
          type="checkbox"
          name="raidleadF"
          checked={ffxivData.raidlead}
          onChange={() =>
            setFfxivData({ ...ffxivData, raidlead: !ffxivData.raidlead })
          }
        />
        <br />
        <label className="text-white">FFXIV - Mentor</label>
        <input
          type="checkbox"
          name="mentorF"
          checked={ffxivData.mentor}
          onChange={() =>
            setFfxivData({ ...ffxivData, mentor: !ffxivData.mentor })
          }
        />
        <br />
        <label className="text-white">SWTOR - Rank</label>
        <input
          name="rankS"
          value={swtorData.rank}
          onChange={(e) => setSwtorData({ ...swtorData, rank: e.target.value })}
        />
        <br />
        <label className="text-white">SWTOR - Raid</label>
        <input
          type="checkbox"
          name="raidS"
          checked={swtorData.raid}
          onChange={() => setSwtorData({ ...swtorData, raid: !swtorData.raid })}
        />
        <br />
        <label className="text-white">SWTOR - Raid Lead</label>
        <input
          type="checkbox"
          name="raidleadS"
          checked={swtorData.raidlead}
          onChange={() =>
            setSwtorData({ ...swtorData, raidlead: !swtorData.raidlead })
          }
        />
        <br />
        <label className="text-white">SWTOR - Mentor</label>
        <input
          type="checkbox"
          name="mentorS"
          checked={swtorData.mentor}
          onChange={() =>
            setSwtorData({ ...swtorData, mentor: !swtorData.mentor })
          }
        />
        <br />
        <button className="button-40" type="submit">
          MAGIC BUTTON
        </button>
      </form>
    </div>
  );
}
