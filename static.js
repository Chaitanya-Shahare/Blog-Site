import React from "react";
import { useEffect, useState, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import drilldown from "highcharts/modules/drilldown";
import heatmap from "highcharts/modules/heatmap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Sidebar from "../datacontrol_components/Sidebar";
import Darkmode from "darkmode-js";

drilldown(Highcharts);
heatmap(Highcharts);

const Static = ({ fileName, setFileName }) => {
  const downloadGraphAsPDF = (e) => {
    // Specify the CSS selector for the graph element
    const graphSelector = "#classforpdf";

    // Select the graph element using the CSS selector
    const graphElement = document.querySelector(graphSelector);

    // Use html2canvas to capture a screenshot of the graph
    html2canvas(graphElement).then((canvas) => {
      const pdf = new jsPDF();
      const aspectRatio = canvas.width / canvas.height;
      const pdfWidth = 200; // Adjust the width as needed
      const pdfHeight = pdfWidth / aspectRatio;

      // Convert the canvas to an image data URL
      const imageData = canvas.toDataURL("image/png");

      // Add the image to the PDF
      pdf.addImage(imageData, "PNG", 10, 10, pdfWidth, pdfHeight);

      // Save the PDF
      pdf.save("graph.pdf");
    });
  };
  const isdarkmode = JSON.parse(localStorage.getItem("isdarkmode"));
  const chartRef = useRef(null);
  const [chartOptions_drill, setChartOptions_drill] = useState(null);
  const [chartOptions_heat, setChartOptions_heat] = useState(null);
  const [data, setData] = useState([]);

  const [chartOptions_line, setChartOptions_line] = useState(null);
  const [Linedata, setLineData] = useState([]);
  useEffect(() => {
    let urladd = "http://127.0.0.1:3003/read?name=hiringdata";
    axios
      .get(urladd)
      .then((res) => {
        setLineData(res.data);
        console.log("static sasys hi");
        console.log(res.data);
        localStorage.setItem("hiringdata_static", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("errorrrrr");
        console.log(err);
      });
  }, []);
  console.log("dataaaa", Linedata);

  useEffect(() => {
    const demand = {};
    const supply = {};
    const uniquePositions = new Set();
    Linedata.forEach((row) => {
      const position = row.position;
      const gender = row.gender;
      const male_openings = row.male_openings;
      const female_openings = row.female_openings;
      // const { position, gender, male_openings, female_openings } = row;

      // Calculate demand
      if (!demand[position]) {
        demand[position] = { males: 0, females: 0 };
      }
      if (gender === "M") {
        demand[position].males = male_openings;
      } else if (gender === "F") {
        demand[position].females = female_openings;
      }

      // Calculate supply
      if (!supply[position]) {
        supply[position] = { males: new Set(), females: new Set() };
      }
      if (gender === "M") {
        supply[position].males.add(row.candidate_id);
      } else if (gender === "F") {
        supply[position].females.add(row.candidate_id);
      }
    });
    console.log(demand);
    console.log(supply);

    // Get unique positions and sort them
    const positions = Object.keys(demand).sort();
    console.log(positions);

    // Convert demand and supply data to Highcharts series format
    const seriesData = positions.map((position) => {
      const { males, females } = demand[position];
      const supplyMales = supply[position]?.males.size || 0;
      const supplyFemales = supply[position]?.females.size || 0;

      return {
        name: position,
        data: [[males, supplyMales, females, supplyFemales]],
      };
    });

    // Generate the Highcharts options for the line chart
    const options = {
      chart: {
        type: "line",
        backgroundColor: "white",
      },
      title: {
        text: "Demand and Supply of Male and Female Employees by Position",
      },
      xAxis: {
        categories: positions, // Use the sorted positions as categories on the x-axis
      },
      yAxis: {
        title: {
          text: "Number of Employees",
        },
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },
      series: [
        {
          name: "Male Demand",
          data: seriesData.map((data) => data.data[0][0]), // Male demand values
        },
        {
          name: "Male Supply",
          data: seriesData.map((data) => data.data[0][1]), // Male supply values
        },
        {
          name: "Female Demand",
          data: seriesData.map((data) => data.data[0][2]), // Female demand values
        },
        {
          name: "Female Supply",
          data: seriesData.map((data) => data.data[0][3]), // Female supply values
        },
      ],
    };

    setChartOptions_line(options);
  }, [Linedata]);

  useEffect(() => {
    let urladd = "http://127.0.0.1:3003/read?name=customdata";
    axios
      .get(urladd)
      .then((res) => {
        setData(res.data);
        console.log("static sasys hi");
        console.log(res.data);
        localStorage.setItem("custom_data_static", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("errorrrrr");
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const drilldata = {};

    data.forEach((row) => {
      const position = row.band;
      const gender = row.gender;
      const year = new Date(row.joining_date)?.getFullYear()?.toString();
      if (!year || !gender) return;

      if (!drilldata[position]) {
        drilldata[position] = {};
      }

      if (!drilldata[position][year]) {
        drilldata[position][year] = { males: 0, females: 0 };
      }

      if (gender === "M") {
        drilldata[position][year].males++;
      } else if (gender === "F") {
        drilldata[position][year].females++;
      }
    });
    console.log(drilldata);

    const positions = Object.keys(drilldata);

    const seriesdata = positions.map((position) => {
      const years = Object.keys(drilldata[position]);

      const data = years.map((year) => {
        const maleCount = drilldata[position][year].males || 0;
        const femaleCount = drilldata[position][year].females || 0;

        return [year, maleCount, femaleCount];
      });

      return {
        name: position,
        id: position.toLowerCase().replace(/ /g, "-"),
        data: data,
      };
    });

    const options = {
      chart: {
        type: "column",
        backgroundColor: "white",
      },
      colors: ["#1976D2", "#C1E7FE"], // Set custom colors for the stacks
      title: {
        text: "Male and Female Count by Position",
      },
      xAxis: {
        type: "category",
      },
      yAxis: {
        title: {
          text: "Count",
        },
      },
      legend: {
        reversed: false, // Set to false to display the legend in the order of the series (male and female)
      },
      plotOptions: {
        column: {
          stacking: "normal",
          cursor: "pointer",
          point: {
            events: {
              click: function () {
                try {
                  if (!this.drilldown) {
                    return false; // Prevent further drilldown
                  }
                  const drilldownId = this.options.drilldown;
                  const drilldownSeries = chartRef.current.get(drilldownId);

                  if (drilldownSeries) {
                    chartRef.current.addSingleSeriesAsDrilldown(
                      this,
                      drilldownSeries
                    );
                    chartRef.current.applyDrilldown();
                  }
                } catch (error) {
                  // Handle the error gracefully
                  console.error("An error occurred during drilldown:", error);
                }
              },
            },
          },
        },
      },
      series: [
        {
          name: "Male",
          data: seriesdata.map((item) => ({
            name: item.name,
            y: item.data.reduce((sum, dataItem) => sum + dataItem[1], 0), // Sum of male counts
            drilldown: item.id + "_male", // Use a unique identifier for male drilldown
          })),
        },
        {
          name: "Female",
          data: seriesdata.map((item) => ({
            name: item.name,
            y: item.data.reduce((sum, dataItem) => sum + dataItem[2], 0), // Sum of female counts
            drilldown: item.id + "_female", // Use a unique identifier for female drilldown
          })),
        },
      ],
      drilldown: {
        series: seriesdata.flatMap((item) => {
          const maleData = item.data.map((dataItem) => ({
            name: dataItem[0],
            y: dataItem[1],
          }));

          const femaleData = item.data.map((dataItem) => ({
            name: dataItem[0],
            y: dataItem[2],
          }));

          return [
            {
              id: item.id + "_male", // Use the same unique identifier for male drilldown
              name: `Male ${item.name}`,
              data: maleData,
            },
            {
              id: item.id + "_female", // Use the same unique identifier for female drilldown
              name: `Female ${item.name}`,
              data: femaleData,
            },
          ];
        }),
      },
    };

    setChartOptions_drill(options);
  }, [data]);

  //heatmap

  useEffect(() => {
    // Get all unique band names
    const bandNames = Array.from(new Set(data.map((row) => row.band)));

    // Calculate male-to-female ratio for each band
    const bandData = {};
    bandNames.forEach((band) => {
      bandData[band] = { males: 0, females: 0 };
    });

    data.forEach((row) => {
      const position = row.band;
      const gender = row.gender;

      if (gender === "M") {
        bandData[position].males++;
      } else if (gender === "F") {
        bandData[position].females++;
      }
    });
    console.log(bandData);

    // Convert bandData to Highcharts series format
    const seriesData = Object.entries(bandData).map(
      ([position, { males, females }]) => {
        const ratio = females !== 0 ? (males / females).toFixed(2) : 0; // Limit decimal places to 2

        return {
          name: position,
          data: [[0, 0, ratio]],
        };
      }
    );

    // Generate the Highcharts options for the heatmap chart
    const options = {
      chart: {
        type: "heatmap",
        backgroundColor: "white",
      },
      title: {
        text: "Gender Diversity Gap by Band",
      },
      xAxis: {
        categories: Object.keys(bandData), // Use the band names as categories
      },
      yAxis: {
        categories: ["Female/Male Ratio"],
        title: null,
        labels: {
          rotation: -90,
        },
      },
      colorAxis: {
        min: 0,
        minColor: "#FFFFFF",
        maxColor: Highcharts.getOptions().colors[0],
      },
      series: [
        {
          name: "Gender Diversity Gap",
          borderWidth: 1,
          data: Object.entries(bandData).map(
            ([position, { males, females }], index) => {
              const ratio = females !== 0 ? (males / females).toFixed(2) : 0; // Calculate the ratio with limited decimal places
              // const ratio = females !== 0 ? `${males}/${females}` : '0/0';

              return [index, 0, parseFloat(ratio)]; // [X position, Y position, Value]
            }
          ),
        },
      ],
    };

    setChartOptions_heat(options);
  }, [data]);

  useEffect(() => {
    console.log(fileName);
  }, [fileName]);

  // line
  const navigate = useNavigate();
  const save = (event) => {
    event.preventDefault();
    const fileInput = event.target.elements.filename; // Ensure 'filename' matches the name attribute of your input element
    const file = fileInput.files[0];
    const name = file.name;
    const formData = new FormData();
    formData.append("file", file);

    // setFileName(name);

    try {
      axios.post("http://127.0.0.1:3003/upload", formData).then((res) => {
        alert("File uploaded successfully!");
        console.log("File uploaded successfully!");
      });
      setFileName(name);
      navigate("/dynamicgraph");
    } catch (error) {
      console.log("Error uploading file:", error);
      alert("Error uploading file: "); // Display the specific error message returned by the server
    }
  };

  //   console.log(fileName);
  // const user=localStorage.getItem("user");
  // const modifiedname=user.split("@");
  // const username=modifiedname[0];
  // console.log(username);

  return (
    <>
      <button onClick={downloadGraphAsPDF}>downlaod</button>

      <div>
        <form onSubmit={save}>
          <input type="file" name="filename" />
          <button type="submit">Upload</button>
        </form>
      </div>

      <div id="classforpdf" className="flex gap-10 ">
        <div className="basis-[45%]">
          {chartOptions_drill ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions_drill}
              callback={(chart) => {
                chartRef.current = chart;
              }}
              allowChartUpdate={true}
              updateArgs={[true, true, true]}
            />
          ) : (
            <div>Loading chart...</div>
          )}
        </div>

        {/* line */}
        <div className="basis-[45%] bg-white p-4 rounded-md shadow-md overflow-hidden">
          {chartOptions_line ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions_line}
            />
          ) : (
            <div>Loading chart...</div>
          )}
        </div>
      </div>
      {/* //heatmap */}
      <div>
        {chartOptions_heat ? (
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions_heat}
          />
        ) : (
          <div>Loading chart...</div>
        )}
      </div>
    </>
  );
};
export default Static;
