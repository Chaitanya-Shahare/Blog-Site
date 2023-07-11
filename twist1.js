// Sample data
var data = [
  { year: 2015, femaleJoined: 100, femaleLeft: 50 },
  { year: 2016, femaleJoined: 150, femaleLeft: 80 },
  { year: 2017, femaleJoined: 200, femaleLeft: 120 },
  { year: 2018, femaleJoined: 180, femaleLeft: 90 },
  { year: 2019, femaleJoined: 220, femaleLeft: 100 },
];

// Configuration options
var options = {
  chart: {
    type: "column",
  },
  title: {
    text: "Female Employees Joined and Left by Year",
  },
  xAxis: {
    categories: data.map((item) => item.year),
    title: {
      text: "Year",
    },
  },
  yAxis: {
    title: {
      text: "Count of Female Employees",
    },
  },
  series: [
    {
      name: "Female Joined",
      data: data.map((item) => item.femaleJoined),
    },
    {
      name: "Female Left",
      data: data.map((item) => item.femaleLeft),
    },
  ],
};

// Create the chart
Highcharts.chart("container", options);
