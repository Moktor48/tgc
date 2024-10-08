"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function SideBar() {
  const { data: session } = useSession();
  //Sidebar set-up
  const [sidebar, setSidebar] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600 && sidebar) {
        setSidebar(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebar]);

  // Session is not valid
  if (!session) {
    return (
      <div>
        <button onClick={() => setSidebar(!sidebar)} className="nav-button">
          <span className="menu-button material-symbols-outlined">
            {sidebar ? "Close" : "Menu"}
          </span>
        </button>
        <nav className={`nav ${sidebar ? "nav-open" : "nav-closed"}`}>
          <ul>
            <li>
              <Link className="links" href="/">
                <span className="material-symbols-outlined">Home</span> Home
              </Link>
            </li>
            <li>
              <Link className="links" href="/games">
                <span className="material-symbols-outlined">Casino</span> Game
                Filter
              </Link>
            </li>
            <li>
              <Link className="links" href="/about">
                <span className="material-symbols-outlined">Question_Mark</span>{" "}
                About
              </Link>
            </li>
            <li>
              <Link className="links" href="/api/auth/signin">
                <span className="material-symbols-outlined">Login</span> Sign-in
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }

  // Session is valid, "guest" is the generic role granted to first-time users
  const id = session?.user?.id;
  const role = session?.user?.role;

  return (
    <div>
      <button onClick={() => setSidebar(!sidebar)} className="nav-button">
        <span className="menu-button material-symbols-outlined">
          {sidebar ? "Close" : "Menu"}
        </span>
      </button>
      <nav className={`nav ${sidebar ? "nav-open" : "nav-closed"}`}>
        <ul>
          <li>
            <Link className="links" href="/">
              <span className="material-symbols-outlined">Home</span> Home
            </Link>
          </li>
          {role != "guest" && (
            <li>
              <Link className="links" href={`/dashboard/${id}`}>
                <span className="material-symbols-outlined">Person</span>{" "}
                Dashboard
              </Link>
            </li>
          )}
          <li>
            <Link className="links" href="/games">
              <span className="material-symbols-outlined">Casino</span> Games
            </Link>
          </li>
          <li>
            <Link className="links" href="/about">
              <span className="material-symbols-outlined">Question_Mark</span>{" "}
              About
            </Link>
          </li>
          <li>
            <Link className="links" href="/api/auth/signout">
              <span className="material-symbols-outlined">Logout</span> Sign-out
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

/*
FUTURE NOTES: 
PUBLIC PAGE
ROLE based authorization
          {role === "staff" && (
            <li>
              <Link className="links" href={`/account/${id}/staff`}>
                <span className="material-symbols-outlined">
                  Supervisor_Account
                </span>{" "}
                Staff
              </Link>
            </li>
          )}
          {admin && (
            <li>
              <Link className="links" href={`/account/${id}/admin`}>
                <span className="material-symbols-outlined">
                  Admin_Panel_Settings
                </span>{" "}
                Admin
              </Link>
            </li>
          )}
*/
