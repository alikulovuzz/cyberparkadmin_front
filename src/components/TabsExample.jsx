import React from 'react'
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { Paper } from "@mui/material"
import PropTypes from "prop-types"

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`
    };
  }

export default function TabsExample() {

    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{bgcolor: "usertop.main", borderRadius: 0, boxShadow: "none", borderTop: '1px solid rgba(0, 0, 0, 0.12)'}}>
        <Box sx={{ flexGrow: 1, display: "flex", minHeight: "100vh" }}>
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            indicatorColor="secondary"
            sx={{ borderRight: 1, borderColor: "divider", width: "200px"}}
        >
            <Tab label="Mening Kompaniyam" {...a11yProps(0)}/>
            <Tab label="Arizalar" {...a11yProps(1)}/>
            <Tab label="Hisobot" {...a11yProps(2)}/>
        </Tabs>
        <TabPanel value={value} index={0}>
            <Typography variant="h4" gutterBottom>
              O'zbekiston Respublikasi Prezidenti huzuridagi statistika agentligi
            </Typography>
            <Typography variant="body1" gutterBottom>
              O‘zbekiston Respublikasi Davlat statistika qo‘mitasi O‘zbekiston Respublikasi Prezidentining 2022- yil 21- dekabrdagi “Yangi O‘zbekiston ma’muriy islohotlarini amalga oshirish chora-tadbirlari to‘g‘risida” PF- 269- son Farmoniga muvofiq Statistika agentligi shaklida O‘zbekiston Respublikasi Prezidenti huzuriga o'tkazilgan
            </Typography>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi facilis nam unde ad ducimus provident enim ratione id adipisci sit. Magnam totam eveniet quasi minus. Optio maxime mollitia aliquid aperiam.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi facilis nam unde ad ducimus provident enim ratione id adipisci sit. Magnam totam eveniet quasi minus. Optio maxime mollitia aliquid aperiam.</p>
        </TabPanel>
        <TabPanel value={value} index={1}>
            Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
            Item Three
        </TabPanel>
        </Box>
        </Paper>
  )
}
