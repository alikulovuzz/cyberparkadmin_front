import styled from "@emotion/styled";
import { Paper } from "@mui/material";

export const UserMenu = styled(Paper)`
    width: 200px;
`

export const UserWorker = styled(Paper)`
    width: calc(100% - 220px);
`

export const SidebarLinkList = styled.ul`
    padding: 5px 0;
    overflow-y: auto;
`

export const SidebarLinkListItem = styled.li`
    width: 100%;
    svg {
        color: inherit
    }
    a {
        padding: 16px;
        width: 100%;
        display: flex;
        align-items: center;
        text-decoration: none;
        transition: all 0.5s linear;
        color: inherit;
    }
    a.active, a.active svg {
        background-color: #4ebaae;
        color: #FFF;
    }
    a:hover {
        background-color: #4ebaae;
        color: #FFF;
    }
`