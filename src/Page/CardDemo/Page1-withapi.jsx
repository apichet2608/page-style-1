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

  const exampleData = [5, 10, 8, 12, 6, 14, 10, 15, 12, 10];

  const sparklineOptions = {
    series: [
      {
        data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14],
      },
    ],
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

  const [dataapitable, setDataapitable] = useState([]);
  const handleButtonClick = (status) => {
    // เรียกใช้ API ด้วย status
    fetch(
      `http://10.17.77.111:3001/api/smart_machine_connect_list/table?status=${status}`
    )
      .then((response) => response.json())
      .then((data) => setDataapitable(data));
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
      <Container maxWidth="xl">
        <Box className="item" sx={{ height: 800, width: "100%" }}>
          <Grid container spacing={2}>
            {apiData.map((item) => (
              <Grid item xl={3} lg={3} md={3} key={item.status}>
                <Card className="card">
                  <CardContent className="CardContent">
                    <div>
                      <Typography
                        variant="h5"
                        component="div"
                        fontWeight="bold"
                      >
                        {item.status}
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
                      series={sparklineOptions.series}
                      type={sparklineOptions.chart.type}
                      width={100}
                      height={50}
                    />
                  </CardContent>
                  <CardActions className="CardActions">
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Description</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Suspendisse malesuada lacus ex, sit amet blandit
                          leo lobortis eget.
                        </Typography>
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
        </Box>
      </Container>
    </React.Fragment>
  );
}
