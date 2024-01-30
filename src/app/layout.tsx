//The layout applies to all pages (unless you give a page an alternative). This is the page template. 
import "~/styles/globals.css";
import { getServerAuthSession } from "~/server/auth";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import Provider from "./context/Provider";
import { TRPCReactProvider } from "~/trpc/react";
import NavBar from "./_components/(core)/NavBar";
import StatBar from "./_components/(core)/StatBar";
import bg from "./_components/img/body-background-img-rock.png"
import SideBar from "./_components/(core)/SideBar";
import BottomComp from "./_components/(core)/BottomComp";
import { api } from "~/trpc/server";

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

  const staff = await api.post.staffPermission.query({userId: session!.user.id});
  return (
    <html lang="en" style={{
      backgroundImage: `url(${bg.src})`,
      width: '100%',
      height: '100%',
    }}>
      <body className={`font-sans ${inter.variable}`}>
        <Provider session = {session}>
          <TRPCReactProvider cookies={cookies().toString()}>
            <header>
              <StatBar />
              <SideBar
                staff={staff}
              />
            </header>
            <main>
              <NavBar />
              {children}
              <BottomComp />
            </main>
          </TRPCReactProvider>
        </Provider>
      </body>
    </html>
  );
}

/*
FUTURE NOTES: 
*/