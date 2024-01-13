import "~/styles/globals.css";
import { getServerAuthSession } from "~/server/auth";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import Provider from "./context/Provider";
import { TRPCReactProvider } from "~/trpc/react";
import NavBar from "./_components/NavBar";
import StatBar from "./_components/StatBar";
import bg from "./_components/img/body-background-img-rock.png"
import SideBar from "./_components/SideBar";


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
              <SideBar />
            </header>
            <main>
              <NavBar />
              {children}
            </main>
          </TRPCReactProvider>
        </Provider>
      </body>
    </html>
  );
}
