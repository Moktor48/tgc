import { getServerAuthSession } from "~/server/auth";
import FrontContent from "./_components/FrontContent";

export default async function Home() {
  const session = await getServerAuthSession()
  // No Session!
  if (!session){
    return (
    <main>
      <h1>Hello, Stranger!</h1>
      <p>This is the Public Landing Page</p>
    </main>
    )
  }
  // Session!

  return (
    <>
    <main>
      <FrontContent />
    </main>
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    <p>1</p><br />
    </>
  )
}