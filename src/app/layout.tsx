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
import NavBarPublic from "./_components/(core)/NavBarPublic";

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

    >
      <body className={`font-sans ${inter.variable}`}>
        <Provider session={session}>
          <TRPCReactProvider cookies={cookies().toString()}>
            <header>
              <div className="header-img"></div>
              <StatBar />
              <SideBar />
              
            </header>
            {!session && <NavBarPublic />}
            {session && <NavBar role={role} id={id} />}
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
