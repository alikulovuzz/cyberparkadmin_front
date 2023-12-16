import React, { useEffect } from "react";
import { MyProSidebarProvider } from "../pages/global/sidebar/sidebarContext";
import Topbar from "../pages/global/Topbar";
import { Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../context/UserContext";

export default function Admin() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user?.role.includes("admin")) {
      sessionStorage.clear();
      setUser("");
      window.location.reload(false);
    }
  }, [user]);

  return (
    <>
      <CssBaseline />
      <MyProSidebarProvider>
        <div style={{ height: "100%", width: "100%" }}>
          <main>
            <Topbar />
            <Outlet />
          </main>
        </div>
      </MyProSidebarProvider>
    </>
  );
}
