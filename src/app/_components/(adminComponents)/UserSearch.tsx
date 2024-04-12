"use client";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
export default function UserSearch({ id }: { id: string }) {
  const router = useRouter();
  const users = api.get.allUsers.useQuery();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/dashboard/${id}/staff/search/${e.target.value}`);
  };
  return (
    <div className="flex justify-center">
      <section className="formPlate">
        <h2>User Modification</h2>
        <form>
          <select onChange={handleChange}>
            <option value="">Select a user</option>
            {users.data?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </form>
      </section>
    </div>
  );
}
/* 
Form to search for users. 
*/
