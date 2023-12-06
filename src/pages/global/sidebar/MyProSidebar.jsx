import { useContext, useState } from "react";
import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";
import { useSidebarContext } from "./sidebarContext";
import { Link } from "react-router-dom";
import { tokens } from "../../../theme";
import { useTheme, Box, Typography, IconButton } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SwitchRightOutlinedIcon from "@mui/icons-material/SwitchRightOutlined";
import SwitchLeftOutlinedIcon from "@mui/icons-material/SwitchLeftOutlined";
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import "../../../styles/admin.css";
import './style.css'
import { UserContext } from "../../../context/UserContext";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
      routerLink={<Link to={to} />}
      className="sidebar-left"
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const MyProSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const { sidebarRTL, setSidebarRTL, sidebarImage } = useSidebarContext();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  const { setUser } = useContext(UserContext);
  const handleOpenBackdrop = () => {
    sessionStorage.clear();
    setUser("")
    window.location.reload(false);
  };
  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        margin: 0,
        "& .sidebar": {
          border: "none",
          height: "100%",
          margin: 0,
          marginBottom: "20px"
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .menu-icon:hover": {
          color: "#45B5AA !important"
        },
        "& .menu-item": {
          // padding: "5px 35px 5px 20px !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-item.active": {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar
        breakPoint="md"
        rtl={sidebarRTL}
        backgroundColor={colors.primary[400]}
        image={sidebarImage}
        className="sidebar-left"
      >
        <Menu iconshape="square">
          <MenuItem
            icon={
              collapsed ? (
                <MenuOutlinedIcon onClick={() => collapseSidebar()} />
              ) : sidebarRTL ? (
                <SwitchLeftOutlinedIcon
                  className="admin-icon"
                  onClick={() => setSidebarRTL(!sidebarRTL)}
                />
              ) : (
                <SwitchRightOutlinedIcon
                  onClick={() => setSidebarRTL(!sidebarRTL)}
                />
              )
            }
            style={{
              margin: "10px 20px 10px 20px",
              padding: "0px",
              color: colors.grey[100],
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h4" color={colors.grey[100]}>
                  <h3 style={{ color: "#000", padding: "0px", margin: "0px", fontSize: "24px" }}>Cyber Admin</h3>
                </Typography>
                <IconButton
                  onClick={
                    broken ? () => toggleSidebar() : () => collapseSidebar()
                  }
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!collapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  "& .avater-image": {
                    backgroundColor: colors.primary[500],
                  },
                }}
              >
                <img
                  alt="profile user"
                  width="180px"
                  height="50px"
                  src={".../../assets/logo.png"}
                // style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
            </Box>
          )}
          <Box paddingLeft={collapsed ? undefined : "10%"}>
            <Item
              title="Kompaniyalar"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Hisobot
            </Typography>
            <Item
              title="Choraklik hisobotlar"
              to="choraklik"
              icon={<PendingActionsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Auditorlik xulosasi"
              to="audit"
              icon={<NoteAltOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Soliq hisobotlari"
              to="oylik"
              icon={<AccountBalanceWalletOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
          <MenuItem
            style={{
              margin: "10px 20px 10px 20px",
              padding: "0px",
              color: colors.grey[100],
            }}
            onClick={()=>{handleOpenBackdrop()}}
          >
            <LogoutIcon style={{ marginRight: '8px' }}></LogoutIcon>
            <Typography >Chiqish</Typography>
          </MenuItem>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;
