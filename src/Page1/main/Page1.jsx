import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function QuantitySelect() {
  const [maxWidth, setMaxWidth] = useState("xl");

  React.useEffect(() => {
    const handleResize = () => {
      // ทำการตรวจสอบขนาดหน้าจอและกำหนด maxWidth ที่เหมาะสม
      const screenWidth = window.innerWidth;
      console.log(screenWidth);
      if (screenWidth < 600) {
        setMaxWidth("xl");
      } else if (screenWidth < 960) {
        setMaxWidth("sm");
      } else if (screenWidth < 1280) {
        setMaxWidth("md");
      } else if (screenWidth < 1920) {
        setMaxWidth("lg");
      } else {
        setMaxWidth("xl");
      }
    };

    // เพิ่ม event listener เมื่อขนาดหน้าจอเปลี่ยนแปลง
    window.addEventListener("resize", handleResize);

    // คำสั่งที่ใช้เมื่อคอมโพเนนต์ถูก unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth={maxWidth}>
        <Box maxWidth="xl" sx={{ height: 800, width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xl={3} lg={3} md={3}></Grid>
            <Grid item xl={3} lg={3} md={3}></Grid>
            <Grid item xl={3} lg={3} md={3}></Grid>
            <Grid item xl={3} lg={3} md={3}></Grid>
            <Grid item xl={3} lg={3} md={3}></Grid>
            <Grid item xl={3} lg={3} md={3}></Grid>
            <Grid item xl={3} lg={3} md={3}></Grid>
            <Grid item xl={3} lg={3} md={3}></Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
