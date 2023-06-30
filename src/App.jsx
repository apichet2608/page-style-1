import * as React from "react"; // นำเข้าโมดูลทั้งหมดที่ต้องการจาก React, ให้เราสามารถใช้งานฟีเจอร์ต่างๆ ของ React
import { styled, useTheme } from "@mui/material/styles"; // นำเข้าโมดูล "styled" และ "useTheme" จาก "@mui/material/styles" สำหรับการใช้งาน Styled Components และเข้าถึง Theme จาก Material-UI
import Box from "@mui/material/Box"; // นำเข้า Box จาก "@mui/material/Box" ซึ่งเป็นคอมโพเนนต์ที่ให้ความสะดวกในการจัดการ layout และ spacing
import MuiDrawer from "@mui/material/Drawer"; // นำเข้า Drawer จาก "@mui/material/Drawer" ซึ่งเป็นคอมโพเนนต์ที่เปิดเมนูแบบเลื่อนได้จากข้าง
import MuiAppBar from "@mui/material/AppBar"; // นำเข้า AppBar จาก "@mui/material/AppBar" ซึ่งเป็นคอมโพเนนต์สำหรับส่วนหัวของหน้าเว็บ
// ต่อไปนี้เป็นการนำเข้าคอมโพเนนต์ต่างๆ จาก "@mui/material" และ "@mui/icons-material" สำหรับการสร้าง UI และแสดงไอคอน
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // นำเข้าคอมโพเนนต์สำหรับการจัดการเส้นทางในแ
import Page1 from "./Page1/main/Page1"; // นำเข้าคอมโพเนนต์ Page1 จากไฟล์ "Page1.js" ในโฟลเดอร์เดียวกัน
import Welcome from "./Page-Welcome/main/Welcome-Page"; // นำเข้าคอมโพเนนต์ Page1 จากไฟล์ "Page1.js" ในโฟลเดอร์เดียวกัน
import PollIcon from "@mui/icons-material/Poll";
import Fuji from "../public/Fuji.png"; // นำเข้าคอมโพเนนต์ Page1 จากไฟล์ "Page1.js" ในโฟลเดอร์เดียวกัน
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import AcUnitIcon from "@mui/icons-material/AcUnit";

import Login from "../src/Page1/main/login";
import Register from "../src/Page1/main/register";

const drawerWidth = 240; // กำหนดค่าความกว้างของ Drawer เป็น 240

// สร้าง mixin สำหรับสไตล์ของ Drawer เมื่อถูกเปิด
const openedMixin = (theme) => ({
  // กำหนดความกว้างของ Drawer ให้เท่ากับ drawerWidth ที่กำหนดไว้
  width: drawerWidth,

  // กำหนด transition ของความกว้างของ Drawer เมื่อมันถูกเปิด
  // โดยใช้ฟังก์ชันสร้าง transition ของ theme ที่ได้รับจาก Material-UI
  // และกำหนดค่า easing และ duration ตามที่กำหนดใน theme
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),

  // กำหนด overflowX เป็น "hidden" เพื่อป้องกันการเลื่อนแนวนอน
  // ที่อาจเกิดขึ้นเมื่อความกว้างของ Drawer มากกว่า viewport
  overflowX: "hidden",
});

// สร้าง mixin สำหรับสไตล์ของ Drawer เมื่อถูกปิด
const closedMixin = (theme) => ({
  // ฟังก์ชันที่รับ theme และคืนค่าสไตล์เมื่อ Drawer ปิด
  // กำหนด transition ของความกว้างของ Drawer เมื่อมันถูกปิด
  // โดยใช้ฟังก์ชันสร้าง transition ของ theme ที่ได้รับจาก Material-UI
  // และกำหนดค่า easing และ duration ตามที่กำหนดใน theme
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // กำหนด overflowX เป็น "hidden" เพื่อป้องกันการเลื่อนแนวนอน
  // ที่อาจเกิดขึ้นเมื่อความกว้างของ Drawer น้อยกว่า viewport
  overflowX: "hidden",
  // กำหนดความกว้างของ Drawer ให้เท่ากับ 7 หน่วยของ theme spacing + 1px
  width: `calc(${theme.spacing(7)} + 1px)`,
  // กำหนดความกว้างของ Drawer ให้เท่ากับ 8 หน่วยของ theme spacing + 1px เมื่อขนาดหน้าจอมากกว่าหรือเท่ากับ sm
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// สร้างคอมโพเนนต์ styled ชื่อ DrawerHeader
const DrawerHeader = styled("div")(({ theme }) => ({
  // กำหนดให้ DrawerHeader เป็น flex container ที่จัดเรียง item แบบแนวนอน
  display: "flex",
  // กำหนดให้ item ใน DrawerHeader มีการจัดให้อยู่ตรงกลางแนวตั้ง
  alignItems: "center",
  // กำหนดให้ item ใน DrawerHeader มีการจัดให้อยู่ทางด้านขวาแนวนอน
  justifyContent: "flex-end",
  // กำหนด padding ของ DrawerHeader ด้วยฟังก์ชัน spacing ของ theme
  padding: theme.spacing(0, 1),
  // ใช้ mixin toolbar ของ theme เพื่อกำหนดสไตล์ของ DrawerHeader ให้เหมือนกับ toolbar ทั่วไป
  ...theme.mixins.toolbar,
}));

// สร้างคอมโพเนนต์เพื่อ AppBar
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  // สร้างคอมโพเนนต์ styled ชื่อ AppBar ที่มี props เป็น open สำหรับการกำหนดสถานะเปิดปิดของ Drawer
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              DEMO
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <img
              src={Fuji}
              alt="คำอธิบายภาพ"
              style={{
                width: 180, // กำหนดความกว้างของภาพให้เต็มขนาดของพื้นที่ที่รองรับ
                height: 45, // กำหนดความสูงของภาพให้ปรับแต่งตามอัตราส่วนต้นฉบับ
              }}
            />
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>

          <Divider />
          <List>
            {["1"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  component={Link}
                  to={`/page/${text.toLowerCase()}`} // เชื่อมโยงเส้นทางไปยัง `/page/:id` โดยใช้พารามิเตอร์จาก `text`
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {text === "1" ? <StackedLineChartIcon /> : <AcUnitIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/page/1" element={<Login />} />
            <Route path="/page/2" element={<Page1 />} />
            <Route path="/page/Register" element={<Register />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}
