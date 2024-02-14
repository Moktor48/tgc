//The layout applies to all pages (unless you give a page an alternative). This is the page template.
import "~/styles/globals.css";
import { getServerAuthSession } from "~/server/auth";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import Provider from "./context/Provider";
import { TRPCReactProvider } from "~/trpc/react";
import StatBar from "./_components/(core)/StatBar";
import bg from "./_components/img/body-background-img-rock.png";
import SideBar from "./_components/(core)/SideBar";
import BottomComp from "./_components/(core)/BottomComp";
import NavBar from "./_components/(core)/NavBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "The Gaming Council",
  description: "Multi-game community",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  const role = session?.user.role;
  const id = session?.user.id;
  return (
    <html
      lang="en"
      style={{
        backgroundImage: `url(${bg.src})`,
        width: "100%",
        height: "100%",
      }}
    >
      <body className={`font-sans ${inter.variable}`}>
        <Provider session={session}>
          <TRPCReactProvider cookies={cookies().toString()}>
            <header>
              <StatBar />
              <SideBar />
            </header>
            <NavBar role={role} id={id} />
            {children}
            <BottomComp />
          </TRPCReactProvider>
        </Provider>
      </body>
    </html>
  );
}

/*
FUTURE NOTES: 
*/
