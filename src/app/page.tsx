import { getServerAuthSession } from "~/server/auth";
import SecretMessage from "./_components/SecretMessage";

export default async function Home() {
  const session = await getServerAuthSession();
  console.log(session);
  return (
    <main>
      <h1>Hello, {session?.user?.name}</h1>
     <SecretMessage />
    </main>
  )
}