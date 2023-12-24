import { getServerAuthSession } from "~/server/auth";
import SecretMessage from "./_components/SecretMessage";
import { db } from "~/server/db";

export default async function Home() {
  const session = await getServerAuthSession();
  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
  const role = user?.role;
  console.log(role);
  if (!session){
    return <main>
      <h1>Hello, Stranger!</h1>
      <p>This is the Public Landing Page</p>
    </main>
  }
  return (
    <main>
      <h1>Hello, {session.user.name}</h1>
      <p>This is the Public Landing Page, and your role is: {role}</p>
    </main>
  )
}