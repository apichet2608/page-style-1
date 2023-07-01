import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chart from "react-apexcharts";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid } from "@mui/x-data-grid";
import "./QuantitySelect.css"; // Import ไฟล์ CSS
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Chip from "@mui/material/Chip";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function QuantitySelect() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    // เรียกใช้ API และตั้งค่าข้อมูลให้กับ apiData
    fetch("http://10.17.77.111:3001/api/smart_energy_by_month/count-status")
      .then((response) => response.json())
      .then((data) => setApiData(data));
  }, []);

  const getChartData = (item) => {
    let seriesData = [];

    seriesData = item.data.map(
      (monthData) => monthData.total_diff_energy_usage
    );

    return [{ data: seriesData }];
  };

  const sparklineOptions = {
    chart: {
      type: "bar",
      width: 100,
      height: 35,
      sparkline: {
        enabled: true,
      },
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return "";
          },
        },
      },
      marker: {
        show: false,
      },
    },
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container spacing={2}>
        {apiData.map((item) => (
          <Grid item xl={3} lg={3} md={3} key={item.building}>
            <Card className="card">
              <CardContent className="CardContent">
                <div>
                  <Typography variant="h5" component="div" fontWeight="bold">
                    {item.building.toUpperCase()}
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="bold">
                    {Math.floor(item.total_diff_energy_usage)}{" "}
                    {item.total_diff_energy_usage > 1000 && (
                      <KeyboardArrowUpIcon />
                    )}
                    {item.total_diff_energy_usage < 500 && (
                      <KeyboardArrowDownIcon />
                    )}
                    {item.total_diff_energy_usage >= 501 &&
                      item.total_diff_energy_usage <= 999 && (
                        <HorizontalRuleIcon />
                      )}
                  </Typography>
                </div>

                <Chart
                  options={sparklineOptions}
                  series={getChartData(item)}
                  type={sparklineOptions.chart.type}
                  width={100}
                  height={50}
                />
              </CardContent>
              <CardActions className="CardActions">
                <Accordion sx={{ width: "100%" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Description</Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {"-"}
                      {item.status}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {item.data &&
                      item.data.map((monthData, index) => (
                        <>
                          <div key={index} className="detailsumcard">
                            <Typography
                              style={{
                                display: "flex",
                              }}
                            >
                              <ArrowRightIcon />
                              {monthData.month_code}
                            </Typography>

                            <Typography>
                              <Chip
                                label={monthData.total_diff_energy_usage}
                                color="primary"
                                // variant="outlined"
                                style={{ fontSize: "1rem" }} // Adjust the font size as needed
                              />
                              {/* {monthData.finished_count} */}
                            </Typography>
                          </div>
                          {/* <Divider /> */}
                        </>
                      ))}
                  </AccordionDetails>
                </Accordion>
                <div>
                  <Button size="small">
                    Chart <PlayArrowIcon />
                  </Button>
                </div>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
