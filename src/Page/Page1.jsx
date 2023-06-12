import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { format } from "date-fns";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function QuantitySelect() {
  const [quantity, setQuantity] = useState(24);
  const [startDate, setStartDate] = useState("");
  const [stopDate, setStopDate] = useState("");

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;
    const startDate = new Date(newStartDate);

    // แปลงเป็น timestamp ตามรูปแบบที่ต้องการ
    const startDateTimestamp = format(startDate, "yyyy-MM-dd HH:mm:ss.SSS");

    setStartDate(startDateTimestamp);
    console.log(startDateTimestamp);
  };

  const handleStopDateChange = (event) => {
    const newStopDate = event.target.value;
    const stopDate = new Date(newStopDate);

    // แปลงเป็น timestamp ตามรูปแบบที่ต้องการ
    const stopDateTimestamp = format(stopDate, "yyyy-MM-dd HH:mm:ss.SSS");

    setStopDate(stopDateTimestamp);
    console.log(stopDateTimestamp);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box maxWidth="xl" sx={{ height: 800, width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                label="Hr"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton onClick={handleDecrement}>
                        <RemoveIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleIncrement}>
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  inputProps: {
                    style: {
                      textAlign: "center",
                    },
                  },
                }}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={3} md={3}>
              <Item>
                <TextField
                  id="start-date"
                  label="Start Date"
                  type="datetime-local"
                  // type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  sx={{ width: "100%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Item>
            </Grid>
            <Grid item xs={3} md={3}>
              <Item>
                <TextField
                  id="stop-date"
                  label="Stop Date"
                  type="datetime-local"
                  // type="date"
                  value={stopDate}
                  onChange={handleStopDateChange}
                  sx={{ width: "100%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
