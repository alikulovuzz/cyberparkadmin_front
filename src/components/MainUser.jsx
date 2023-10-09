import { Box } from '@mui/material'
import React from 'react'
import { SidebarLinkList, SidebarLinkListItem, UserMenu, UserWorker } from '../styles/styles'
import { NavLink, Outlet } from 'react-router-dom'
import ApartmentIcon from '@mui/icons-material/Apartment';
import AppsIcon from '@mui/icons-material/Apps';
import AssessmentIcon from '@mui/icons-material/Assessment';

export default function MainUser() {
  return (
    <Box
        sx={{p: "20px 0", display: "flex", gap: '20px'}} 
    >
        <Box>
            <UserMenu
                sx={{bgcolor: "usertop.main", borderRadius: 1,  borderColor: "divider", boxShadow: "none"}}
            >
                <SidebarLinkList>
                    <SidebarLinkListItem>
                        <NavLink
                            to="/"
                            className={(props) => {
                                return `${props.isActive ? 'active ' : ''}`;
                            }}
                        >
                            <ApartmentIcon sx={{mr: "5px"}} color="primary"/>
                            <span>Mening kompaniyam</span>
                        </NavLink>
                    </SidebarLinkListItem>
                    <SidebarLinkListItem>
                        <NavLink
                            to="applications"
                            className={(props) => {
                                return `${props.isActive ? 'active ' : ''}`;
                            }}
                        >
                            <AppsIcon sx={{mr: "5px"}} color="primary"/>
                            <span>Arizalar</span>
                        </NavLink>
                    </SidebarLinkListItem>
                    <SidebarLinkListItem>
                        <NavLink
                            to="report"
                            className={(props) => {
                                return `${props.isActive ? 'active ' : ''}`;
                            }}
                        >
                            <AssessmentIcon sx={{mr: "5px"}} color="primary"/>
                            <span>Hisobot</span>
                        </NavLink>
                    </SidebarLinkListItem>
                </SidebarLinkList>
            </UserMenu>
        </Box>
        <UserWorker
            sx={{bgcolor: "usertop.main", borderRadius: 0,  borderColor: "divider", boxShadow: "none"}}
        >
            <Outlet/>
        </UserWorker>
    </Box>
  )
}
