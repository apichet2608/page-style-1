import React, { useState, useEffect } from "react";
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
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function QuantitySelect() {
  const [quantity, setQuantity] = useState(24);
  const [startDatewithtime, setstartDatewithtime] = useState("");
  const [stopDatewithtime, setstopDatewithtime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [stopDate, setStopDate] = useState("");

  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;
    const startDate = new Date(newStartDate);

    // แปลงเป็น timestamp ตามรูปแบบที่ต้องการ
    const startDateTimestamp = format(startDate, "yyyy-MM-dd");

    setStartDate(startDateTimestamp);
    console.log(startDateTimestamp);
  };
  const handleStopDateChange = (event) => {
    const newStopDate = event.target.value;
    const stopDate = new Date(newStopDate);

    // แปลงเป็น timestamp ตามรูปแบบที่ต้องการ
    const stopDateTimestamp = format(stopDate, "yyyy-MM-dd");

    setStopDate(stopDateTimestamp);
    console.log(stopDateTimestamp);
  };
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

  const handlestartDatewithtimeChange = (event) => {
    const newstartDatewithtime = event.target.value;
    const startDatewithtime = new Date(newstartDatewithtime);

    // แปลงเป็น timestamp ตามรูปแบบที่ต้องการ
    const startDatewithtimeTimestamp = format(
      startDatewithtime,
      "yyyy-MM-dd HH:mm:ss.SSS"
    );

    setstartDatewithtime(startDatewithtimeTimestamp);
    console.log(startDatewithtimeTimestamp);
  };

  const handlestopDatewithtimeChange = (event) => {
    const newstopDatewithtime = event.target.value;
    const stopDatewithtime = new Date(newstopDatewithtime);

    // แปลงเป็น timestamp ตามรูปแบบที่ต้องการ
    const stopDatewithtimeTimestamp = format(
      stopDatewithtime,
      "yyyy-MM-dd HH:mm:ss.SSS"
    );

    setstopDatewithtime(stopDatewithtimeTimestamp);
    console.log(stopDatewithtimeTimestamp);
  };

  const [selectedFactory, setSelectedFactory] = useState(null);
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [selectedMachine, setSelectedMachine] = useState(null);

  const [distinctFactory, setDistinctFactory] = useState([]);
  const [distinctProcess, setDistinctProcess] = useState([]);
  const [distinctMachine, setDistinctMachine] = useState([]);

  const fetchDistinctFactory = async () => {
    try {
      const response = await axios.get("http://your-api-url/distinctFactory");
      const distinctFactory = response.data;
      setDistinctFactory(distinctFactory);
    } catch (error) {
      console.error(`Error fetching distinct factories: ${error}`);
    }
  };

  const fetchDistinctProcess = async () => {
    try {
      const response = await axios.get("http://your-api-url/distinctProcess");
      const distinctProcess = response.data;
      setDistinctProcess(distinctProcess);
    } catch (error) {
      console.error(`Error fetching distinct processes: ${error}`);
    }
  };

  const fetchDistinctMachine = async () => {
    try {
      const response = await axios.get("http://your-api-url/distinctMachine");
      const distinctMachine = response.data;
      setDistinctMachine(distinctMachine);
    } catch (error) {
      console.error(`Error fetching distinct machines: ${error}`);
    }
  };

  useEffect(() => {
    fetchDistinctFactory();
    fetchDistinctProcess();
    fetchDistinctMachine();
  }, []);

  const handleFactoryChange = (event, newValue) => {
    console.log(newValue);
    setSelectedFactory(newValue);
  };

  const handleProcessChange = (event, newValue) => {
    console.log(newValue);
    setSelectedProcess(newValue);
  };

  const handleMachineChange = (event, newValue) => {
    console.log(newValue);
    setSelectedMachine(newValue);
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
                  id="start-date-withtime"
                  label="Start Date-withtime"
                  type="datetime-local"
                  // type="date"
                  value={startDatewithtime}
                  onChange={handlestartDatewithtimeChange}
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
                  id="stop-date-withtime"
                  label="Stop Date-withtime"
                  type="datetime-local"
                  // type="date"
                  value={stopDatewithtime}
                  onChange={handlestopDatewithtimeChange}
                  sx={{ width: "100%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Item>
            </Grid>
            <Grid item xs={3} md={3}>
              <Item>
                <Autocomplete
                  options={distinctFactory}
                  getOptionLabel={(option) => option && option.factory_code}
                  value={selectedFactory}
                  onChange={handleFactoryChange}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="เลือก Factory"
                      variant="outlined"
                    />
                  )}
                />
              </Item>
            </Grid>

            <Grid item xs={3} md={3}>
              <Item>
                <Autocomplete
                  options={distinctProcess}
                  getOptionLabel={(option) => option && option.process_code}
                  value={selectedProcess}
                  onChange={handleProcessChange}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="เลือก Process"
                      variant="outlined"
                    />
                  )}
                />
              </Item>
            </Grid>

            <Grid item xs={3} md={3}>
              <Item>
                <Autocomplete
                  options={distinctMachine}
                  getOptionLabel={(option) => option && option.mc_code}
                  value={selectedMachine}
                  onChange={handleMachineChange}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="เลือก Machine"
                      variant="outlined"
                    />
                  )}
                />
              </Item>
            </Grid>

            <Grid item xs={3} md={3}>
              <Item>
                <TextField
                  id="start-date"
                  label="Start Date"
                  type="date"
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
                  type="date"
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
