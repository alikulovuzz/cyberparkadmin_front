import React from "react";
import { useContext } from "react";
import { ColorModeContext } from "../theme";
import { useTheme, Box, IconButton, Paper } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CustomizedChangeLanguage from "./CustomizedChangeLanguage";

const UserTopbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Paper sx={{bgcolor: "usertop.main", borderRadius: 0,  borderColor: "divider", boxShadow: "none"}}>
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex">
        <img src={require('../media/logo2.png')} alt="logo"/>
      </Box>
      <Box display="flex">
      <CustomizedChangeLanguage/>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            
           <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
    </Paper>
  );
};

export default UserTopbar;
