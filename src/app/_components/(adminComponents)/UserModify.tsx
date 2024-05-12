"use client";
import React, { useState } from "react";
import { api } from "~/trpc/react";
interface Profile {
  searchUserId: string;
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
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

export default function UserModify({ user, userStaff, searchUserId }: Profile) {
  const [staffState, setStaffState] = useState({
    userId: userStaff?.userId ?? searchUserId,
    admin: userStaff?.admin ?? false,
  });

  const updStaff = api.put.updateUserStaff.useMutation({});

  const submitForms = async () => {
    updStaff.mutate(staffState);
  };

  return (
    <div className="text-white">
      <h2>Admin Toggle for {user?.name}</h2>
      <form>
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
        <button className="button-40" onClick={submitForms}>
          Submit
        </button>
      </form>
    </div>
  );
}
