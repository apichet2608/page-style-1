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
    fetch(
      "http://10.17.77.111:3001/api/smart_machine_connect_list/count-status"
    )
      .then((response) => response.json())
      .then((data) => setApiData(data));
  }, []);

  const [dataapitable, setDataapitable] = useState([]);
  const handleButtonClick = (status) => {
    // เรียกใช้ API ด้วย status
    fetch(
      `http://10.17.77.111:3001/api/smart_machine_connect_list/table?status=${status}`
    )
      .then((response) => response.json())
      .then((data) => setDataapitable(data));
  };

  const getChartData = (item) => {
    let seriesData = [];
    if (item.status === "Finished") {
      seriesData = item.sum_month
        .sort((a, b) => {
          const dateA = new Date(
            a.plan_date_formatted.split("-").reverse().join("-")
          );
          const dateB = new Date(
            b.plan_date_formatted.split("-").reverse().join("-")
          );

          if (dateA < dateB) {
            return -1;
          }
          if (dateA > dateB) {
            return 1;
          }
          return 0;
        })
        .map((monthData) => monthData.finished_count);
    } else if (item.status === "Planed") {
      seriesData = item.sum_month
        .sort((a, b) => {
          const dateA = new Date(
            a.plan_date_formatted.split("-").reverse().join("-")
          );
          const dateB = new Date(
            b.plan_date_formatted.split("-").reverse().join("-")
          );

          if (dateA < dateB) {
            return -1;
          }
          if (dateA > dateB) {
            return 1;
          }
          return 0;
        })
        .map((monthData) => monthData.planed_count);
    } else if (item.status === "Wait for plan") {
      seriesData = item.sum_month
        .sort((a, b) => {
          const dateA = new Date(
            a.plan_date_formatted.split("-").reverse().join("-")
          );
          const dateB = new Date(
            b.plan_date_formatted.split("-").reverse().join("-")
          );

          if (dateA < dateB) {
            return -1;
          }
          if (dateA > dateB) {
            return 1;
          }
          return 0;
        })
        .map((monthData) => monthData.wait_for_plan_count);
    }
    return [{ data: seriesData }];
  };
  const sparklineOptions = {
    chart: {
      type: "line",
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

  const columns_fix = [
    {
      field: "item_factory",
      headerName: "item_factory",
      width: 250,
    },
    {
      field: "item_code",
      headerName: "item_code",
      width: 250,
    },
    {
      field: "item_desc2",
      headerName: "item_desc2",
      width: 250,
    },
    {
      field: "item_desc3",
      headerName: "item_desc3",
      width: 250,
    },
    {
      field: "item_status",
      headerName: "item_status",
      width: 250,
    },
    {
      field: "item_building",
      headerName: "item_building",
      width: 250,
    },
    {
      field: "item_group",
      headerName: "item_group",
      width: 250,
    },
    {
      field: "item_sub_group",
      headerName: "item_sub_group",
      width: 250,
    },
    {
      field: "item_owner_cc",
      headerName: "item_owner_cc",
      width: 250,
    },
    {
      field: "item_sub_process",
      headerName: "item_sub_process",
      width: 250,
    },
    {
      field: "item_mac_maker",
      headerName: "item_mac_maker",
      width: 250,
    },
    {
      field: "item_iot_mc_type",
      headerName: "item_iot_mc_type",
      width: 250,
    },
    {
      field: "item_iot_group1",
      headerName: "item_iot_group1",
      width: 250,
    },
    {
      field: "item_iot_cont1",
      headerName: "item_iot_cont1",
      width: 250,
    },
    {
      field: "item_iot_group2",
      headerName: "item_iot_group2",
      width: 250,
    },
    {
      field: "item_iot_cont2",
      headerName: "item_iot_cont2",
      width: 250,
    },
    {
      field: "status",
      headerName: "status",
      width: 250,
    },
    {
      field: "npi_year",
      headerName: "npi_year",
      width: 250,
    },
    {
      field: "plan_date",
      headerName: "plan_date",
      width: 250,
    },
    {
      field: "finish_date",
      headerName: "finish_date",
      width: 250,
    },
    {
      field: "remark",
      headerName: "remark",
      width: 250,
    },
    {
      field: "feeder_no",
      headerName: "feeder_no",
      width: 250,
    },
  ];

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container spacing={2}>
        {apiData
          .sort((a, b) => {
            if (a.status === "total") return -1;
            if (a.status === "Finished") return -1;
            if (a.status === "Planed" && b.status === "Wait for plan")
              return -1;
            if (a.status === "Planed" && b.status === "Finished") return 1;
            if (a.status === "Planed" && b.status === "total") return 1;
            if (a.status === "Wait for plan" && b.status === "Finished")
              return 1;
            if (a.status === "Wait for plan" && b.status === "total") return 1;
            return 0;
          })
          .map((item) => (
            <>
              <Grid item xl={3} lg={3} md={3} key={item.status}>
                <Card className="card">
                  <CardContent className="CardContent">
                    <div>
                      <Typography
                        variant="h5"
                        component="div"
                        fontWeight="bold"
                      >
                        {item.status.toUpperCase()}
                      </Typography>
                      <Typography
                        variant="h4"
                        component="div"
                        fontWeight="bold"
                      >
                        {item.count}{" "}
                        {item.count > 1000 && <KeyboardArrowUpIcon />}
                        {item.count < 500 && <KeyboardArrowDownIcon />}
                        {item.count >= 501 && item.count <= 999 && (
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
                        {item.sum_month &&
                          item.sum_month
                            .sort((a, b) => {
                              const dateA = new Date(
                                a.plan_date_formatted
                                  .split("-")
                                  .reverse()
                                  .join("-")
                              );
                              const dateB = new Date(
                                b.plan_date_formatted
                                  .split("-")
                                  .reverse()
                                  .join("-")
                              );

                              if (dateA < dateB) {
                                return -1;
                              }
                              if (dateA > dateB) {
                                return 1;
                              }
                              return 0;
                            })
                            .map((monthData, index) => (
                              <>
                                <div key={index} className="detailsumcard">
                                  <Typography
                                    style={{
                                      display: "flex",
                                    }}
                                  >
                                    <ArrowRightIcon />
                                    {monthData.plan_date_formatted}
                                  </Typography>
                                  {item.status === "Finished" && (
                                    <Typography>
                                      <Chip
                                        label={monthData.finished_count}
                                        color="primary"
                                        // variant="outlined"
                                        style={{ fontSize: "1rem" }} // Adjust the font size as needed
                                      />
                                      {/* {monthData.finished_count} */}
                                    </Typography>
                                  )}
                                  {item.status === "Planed" && (
                                    <Typography>
                                      <Chip
                                        label={monthData.planed_count}
                                        color="primary"
                                        // variant="outlined"
                                        style={{ fontSize: "1rem" }} // Adjust the font size as needed
                                      />
                                      {/* {monthData.planed_count} */}
                                    </Typography>
                                  )}
                                  {item.status === "Wait for plan" && (
                                    <Typography>
                                      <Chip
                                        label={monthData.wait_for_plan_count}
                                        color="primary"
                                        // variant="outlined"
                                        style={{ fontSize: "1rem" }} // Adjust the font size as needed
                                      />
                                      {/* {monthData.wait_for_plan_count} */}
                                    </Typography>
                                  )}
                                </div>
                                {/* <Divider /> */}
                              </>
                            ))}
                      </AccordionDetails>
                    </Accordion>
                    <div>
                      <Button
                        size="small"
                        onClick={() => handleButtonClick(item.status)}
                      >
                        View <PlayArrowIcon />
                      </Button>
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            </>
          ))}
        {dataapitable && (
          <Grid item xl={12} lg={12} md={12} mt={2.5}>
            <DataGrid
              rows={dataapitable}
              columns={columns_fix}
              pagination
              pageSize={5}
              // checkboxlelection
              sx={{ height: 650, width: "100%" }}
            />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}
