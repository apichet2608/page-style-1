import React from "react";
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
import "./QuantitySelect.css"; // Import ไฟล์ CSS

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function QuantitySelect() {
  const exampleData = [5, 10, 8, 12, 6, 14, 10, 15, 12, 10];

  const sparklineOptions = {
    chart: {
      type: "line",
      sparkline: {
        enabled: true,
      },
    },
    series: [
      {
        data: exampleData,
      },
    ],
    stroke: {
      curve: "straight",
    },
    colors: ["#1E90FF"],
    grid: {
      show: false,
    },
    tooltip: {
      enabled: true,
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box className="item" sx={{ height: 800, width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xl={3} lg={3} md={3}>
              <Card className="card">
                <CardContent className="CardContent">
                  <div>
                    <Typography variant="h6" component="div">
                      Card Title
                    </Typography>
                    <Typography variant="h4" component="div">
                      Card Value
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
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
            {/* Add more Card components here */}
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
