import React from 'react'
import { MyProSidebarProvider } from '../pages/global/sidebar/sidebarContext'
import Topbar from '../pages/global/Topbar'
import { Outlet } from 'react-router-dom'
import { CssBaseline } from '@mui/material'

export default function Admin() {
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
    )
}
