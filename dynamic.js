import React, { useEffect, useState, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import heatmap from 'highcharts/modules/heatmap';
import drilldown from 'highcharts/modules/drilldown';
import axios from 'axios';


drilldown(Highcharts);

const Dynamic = ({ fileName, setFileName}) => {
  const [data, setData] = useState([]);
  const [Hdata,setHdata]=useState([]); 
  const [chartOptions_drill, setChartOptions_drill] = useState(null);
  const chartRef = useRef(null);
  const highchartsRef = useRef(null);
  const[chartOptions_heat,setChartOptions_heat]=useState(null);
  const [chartOptions_line, setChartOptions_line] = useState(null);
  const[Linedata,setLineData]=useState([]); 
  const [chartOptions_hiring, setChartOptions_hiring] = useState(null);
  const [chartOptions_vendor, setChartOptions_vendor] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState('google');


  const show = (e) => {
    e.preventDefault();
    console.log(fileName, "from dyna");
    let urladd = `http://127.0.0.1:3003/read?name=${fileName}`;
    axios
      .get(urladd)
      .then((res) => {
        console.log("dyna says hi");
        console.log(res.data);
        alert("data");
        setData(res.data);
        const dataTocheck = JSON.parse(localStorage.getItem("uploaded_data"));
        // if (dataTocheck != null) {
        //   localStorage.removeItem("uploaded_data");
        //   localStorage.setItem("uploaded_data", JSON.stringify(res.data));
        // } else {
        //   localStorage.setItem("uploaded_data", JSON.stringify(res.data));
        // }
        
      })
      .catch((err) => {
        console.log("errorrrrr");
        console.log(err);
      });
  };
  // const saveData = JSON.parse(localStorage.getItem("uploaded_data"));
  let CustomDataToBeLooped;

  useEffect(()=>{
  if (Array.isArray(data) && data.length > 0 && data.some((row) => !row.hasOwnProperty('male_openings'))) {
    localStorage.setItem("customdata_dynamic",JSON.stringify(data));
    CustomDataToBeLooped=data;
    console.log(CustomDataToBeLooped);

  }
  else{
    console.log(CustomDataToBeLooped);

    //dynamic empty 
    const dynamiccustomdata=JSON.parse(localStorage.getItem("customdata_dynamic"));
    const savedStaticForCustom=JSON.parse(localStorage.getItem("custom_data_static"));
    if(dynamiccustomdata==null){
    //static
    CustomDataToBeLooped=savedStaticForCustom;
    console.log(CustomDataToBeLooped);

    }
    else{
      CustomDataToBeLooped=dynamiccustomdata;
      console.log(CustomDataToBeLooped);

    }
  }
  },[data])

  useEffect(() => {
    const drilldata = {};
    if (CustomDataToBeLooped !== null) {
      CustomDataToBeLooped.forEach((row) => {
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
    
        if (gender === 'M') {
          drilldata[position][year].males++;
        } else if (gender === 'F') {
          drilldata[position][year].females++;
        }
      })
    } else{
      console.log('still null');
    }

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
            type: 'column',
            background: '#f2f2f2'
          },
          colors: ['#1976D2', '#C1E7FE'], // Set custom colors for the stacks
          title: {
            text: 'Male and Female Count by Position',
          },
          xAxis: {
            type: 'category',
          },
          yAxis: {
            title: {
              text: 'Count',
            },
          },
          legend: {
            reversed: false, // Set to false to display the legend in the order of the series (male and female)
          },
          plotOptions: {
            column: {
              stacking: 'normal',
              cursor: 'pointer',
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
                        chartRef.current.addSingleSeriesAsDrilldown(this, drilldownSeries);
                        chartRef.current.applyDrilldown();
                      }
                    } catch (error) {
                      // Handle the error gracefully
                      console.error('An error occurred during drilldown:', error);
                    }
                  },
                },
              },
            },
          },
      series: [
        {
          name: 'Male',
          data: seriesdata.map((item) => ({
            name: item.name,
            y: item.data.reduce((sum, dataItem) => sum + dataItem[1], 0), // Sum of male counts
            drilldown: item.id + '_male', // Use a unique identifier for male drilldown
          })),
        },
        {
          name: 'Female',
          data: seriesdata.map((item) => ({
            name: item.name,
            y: item.data.reduce((sum, dataItem) => sum + dataItem[2], 0), // Sum of female counts
            drilldown: item.id + '_female', // Use a unique identifier for female drilldown
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
              id: item.id + '_male', // Use the same unique identifier for male drilldown
              name: `Male ${item.name}`,
              data: maleData,
            },
            {
              id: item.id + '_female', // Use the same unique identifier for female drilldown
              name: `Female ${item.name}`,
              data: femaleData,
            },
          ];
        }),
      },
    };

    setChartOptions_drill(options);
  }, [CustomDataToBeLooped]);

  //heatmap...........................

  useEffect(() => {
    const bandData = {};

    if (CustomDataToBeLooped !== null) {
      // Get all unique band names
      const bandNames = Array.from(new Set(CustomDataToBeLooped.map((row) => row.band)))

      // Calculate male-to-female ratio for each band
      bandNames.forEach((band) => {
        bandData[band] = { males: 0, females: 0 };
      });
     
      CustomDataToBeLooped.forEach((row) => {
        const position = row.band;
        const gender = row.gender;
  
        if (gender === 'M') {
          bandData[position].males++;
        } else if (gender === 'F') {
          bandData[position].females++;
        }
      })
    } else{
      console.log('heatmap null....')
    }
      
    
    
    
    console.log(bandData);

    // Convert bandData to Highcharts series format
    const seriesData = Object.entries(bandData).map(([position, { males, females }]) => {
      const ratio = females !== 0 ? (males / females).toFixed(2) : 0; // Limit decimal places to 2
    
      return {
        name: position,
        data: [[0, 0, ratio]],
      };
    });

    // Generate the Highcharts options for the heatmap chart
    const options = {
      chart: {
        type: 'heatmap'
      },
      title: {
        text: 'Gender Diversity Gap by Band'
      },
      xAxis: {
        categories: Object.keys(bandData) // Use the band names as categories
      },
      yAxis: {
        categories: ['Female/Male Ratio'],
        title: null,
        labels: {
          rotation: -90
        }
      },
      colorAxis: {
        min: 0,
        minColor: '#FFFFFF',
        maxColor: Highcharts.getOptions().colors[0]
      },
      series: [{
        name: 'Gender Diversity Gap',
        borderWidth: 1,
        data: Object.entries(bandData).map(([position, { males, females }], index) => {
          const ratio = females !== 0 ? (males / females).toFixed(2) : 0; // Calculate the ratio with limited decimal places
          // const ratio = females !== 0 ? `${males}/${females}` : '0/0';
    
          return [index, 0, parseFloat(ratio)]; // [X position, Y position, Value]
        }),
      }]
    };
    
    setChartOptions_heat(options);
    
 
}, [CustomDataToBeLooped]);



useEffect(() => {
  let CustomDataToBeLoopedforVendor;

  if (Array.isArray(data) && data.length > 0 && data.some((row) => row.hasOwnProperty('vendor'))) {
    localStorage.setItem("customdatavendor_dynamic", JSON.stringify(data));
    CustomDataToBeLoopedforVendor = data;
    console.log(CustomDataToBeLoopedforVendor);
  } else {
    console.log(CustomDataToBeLoopedforVendor);

    // Dynamic empty
    const dynamiccustomdata = JSON.parse(localStorage.getItem("customdatavendor_dynamic"));
    const savedStaticForCustom = JSON.parse(localStorage.getItem("custom_data_static"));

    if (dynamiccustomdata == null) {
      // Static
      CustomDataToBeLoopedforVendor = savedStaticForCustom;
      console.log(CustomDataToBeLoopedforVendor);
    } else {
      CustomDataToBeLoopedforVendor = dynamiccustomdata;
      console.log(CustomDataToBeLoopedforVendor);
    }

    // CustomDataToBeLoopedforVendor = JSON.parse(localStorage.getItem("custom_data_static"));
    // console.log(CustomDataToBeLoopedforVendor);
  }


  const currentYear = new Date().getFullYear();
  const vdata = {};

  if (CustomDataToBeLoopedforVendor !== undefined && CustomDataToBeLoopedforVendor !== null) {
    CustomDataToBeLoopedforVendor.forEach((row) => {
      const vendor = row.vendor;
      const position = row.band;
      const gender = row.gender;
      const joiningYear = new Date(row.joining_date).getFullYear();
      const terminationYear = row.termination_date ? new Date(row.termination_date).getFullYear() : currentYear;

      if (!vdata[vendor]) {
        vdata[vendor] = {};
      }

      if (terminationYear >= 2014 && joiningYear <= currentYear) {
        for (let year = joiningYear; year <= terminationYear; year++) {
          if (!vdata[vendor][position]) {
            vdata[vendor][position] = {};
          }

          if (!vdata[vendor][position][year]) {
            vdata[vendor][position][year] = { males: 0, females: 0 };
          }

          if (gender === 'M') {
            vdata[vendor][position][year].males++;
          } else if (gender === 'F') {
            vdata[vendor][position][year].females++;
          }
        }
      }
    });
  } else {
    console.log('Vendor data is null');
  }

  console.log(vdata);

  const vendorName = selectedVendor;
  console.log(vendorName);

  if (!vdata[vendorName]) {
    console.log(`Vendor '${vendorName}' not found in the data.`);
    setChartOptions_vendor(null);
    return;
  }

  const vendorData = vdata[vendorName];

  const positions = Object.keys(vendorData);
  const seriesData = positions.map((position) => {
    const years = Object.keys(vendorData[position]);
    const yearData = years.map((year) => {
      const maleCount = vendorData[position][year].males || 0;
      const femaleCount = vendorData[position][year].females || 0;
      return [year, maleCount, femaleCount];
    });

    return {
      name: position,
      data: yearData,
      stack: vendorName,
    };
  });

  const seriesData2 = positions.map((position) => {
    const years = Object.keys(vendorData[position]);
    const year = '2023'; // Specify the desired year here

    const maleCount = vendorData[position][year]?.males || 0;
    const femaleCount = vendorData[position][year]?.females || 0;

    return {
      name: position,
      stack: vendorName,
      data: [[year, maleCount, femaleCount]],
      id: position,
    };
  });

  const options = {
    chart: {
      type: 'column',
      background: '#f2f2f2',
    },
    colors: ['#1976D2', '#C1E7FE'],
    title: {
      text: `Male and Female Count by Position - ${vendorName}`,
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      title: {
        text: 'Count',
      },
    },
    legend: {
      reversed: false,
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        cursor: 'pointer',
        point: {
          events: {
            click: function () {
              try {
                if (!this.drilldown) {
                  return false;
                }
                const drilldownId = this.options.drilldown;
                const drilldownSeries = chartRef.current.get(drilldownId);

                if (drilldownSeries) {
                  chartRef.current.addSingleSeriesAsDrilldown(this, drilldownSeries);
                  chartRef.current.applyDrilldown();
                }
              } catch (error) {
                console.error('An error occurred during drilldown:', error);
              }
            },
          },
        },
      },
    },
    series: [
      {
        name: 'Male',
        data: seriesData2.map((item) => ({
          name: item.name,
          y: item.data[0][1], // Male count for 2023
          drilldown: item.id + '_male', // Use a unique identifier for male drilldown in 2023
        })),
      },
      {
        name: 'Female',
        data: seriesData2.map((item) => ({
          name: item.name,
          y: item.data[0][2], // Female count for 2023
          drilldown: item.id + '_female', // Use a unique identifier for female drilldown in 2023
        })),
      },
    ],

    drilldown: {
      series: seriesData.flatMap((item) => {
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
            id: item.name + '_male',
            name: `Male ${item.name}`,
            data: maleData,
          },
          {
            id: item.name + '_female',
            name: `Female ${item.name}`,
            data: femaleData,
          },
        ];
      }),
    },
  };

  setChartOptions_vendor(options);
}, [data, selectedVendor]);







// useEffect(() => {
//   const currentYear = new Date().getFullYear();
//   const vdata = {};
//   if (CustomDataToBeLooped !== undefined && CustomDataToBeLooped !== null) {
//     CustomDataToBeLooped.forEach((row) => {
//       const vendor = row.vendor;
//       const position = row.band;
//       const gender = row.gender;
//     //   const year = new Date(row.joining_date)?.getFullYear()?.toString();
//     //   const [day, month, year] = row.joining_date.split('/');
//     //   const joiningYear = parseInt(year, 10);
//     //   const currentYear = new Date().getFullYear();
//     //   const isValidYear = !isNaN(joiningYear) && joiningYear >= 1900 && joiningYear <= currentYear;
  
//     //   const yearString = isValidYear ? joiningYear.toString() : '';
  
//         const joiningYear = new Date(row.joining_date).getFullYear();
//       const terminationYear = row.termination_date ? new Date(row.termination_date).getFullYear() : currentYear;
  
//     //   if (!year || !gender) return;
  
//       if (!vdata[vendor]) {
//         vdata[vendor] = {};
//       }
  
//       // Exclude employees whose termination year is before 2014 or joining year is after the current year
//       if (terminationYear >= 2014 && joiningYear <= 2023) {
//         // Iterate over the years from the joiningYear to the terminationYear
//         for (let year = joiningYear; year <= terminationYear; year++) {
//             if (!vdata[vendor][position]) {
//                 vdata[vendor][position] = {};
//               }
        
//               if (!vdata[vendor][position][year]) {
//                 vdata[vendor][position][year] = { males: 0, females: 0 };
//               }
        
//               if (gender === 'M') {
//                 vdata[vendor][position][year].males++;
//               } else if (gender === 'F') {
//                 vdata[vendor][position][year].females++;
//               }
//         }
//       }
//     });
//   } else {
//     console.log('vendor data null');
//   }

//   console.log(vdata);

//   // Specify the vendor name you want to display
//   const vendorName = selectedVendor;
//   console.log(vendorName);

//   if (!vdata[vendorName]) {
//     console.log(`Vendor '${vendorName}' not found in the data.`);
//     setChartOptions_vendor(null);
//     return;
//   }

//   const vendorData = vdata[vendorName];

//   const positions = Object.keys(vendorData);
//   const seriesData = positions.map((position) => {
//     const years = Object.keys(vendorData[position]);
//     const yearData = years.map((year) => {
//       const maleCount = vendorData[position][year].males || 0;
//       const femaleCount = vendorData[position][year].females || 0;
//       return [year, maleCount, femaleCount];
//     });

//     return {
//       name: position,
//       data: yearData,
//       stack: vendorName,
//     };
//   });

//   const seriesData2 = positions.map((position) => {
//       const years = Object.keys(vendorData[position]);
//       const year = '2023'; // Specify the desired year here
    
//       const maleCount = vendorData[position][year]?.males || 0;
//       const femaleCount = vendorData[position][year]?.females || 0;
    
//       return {
//         name: position,
//         stack: vendorName,
//         data: [[year, maleCount, femaleCount]],
//         id: position,
//       };
//     });

//   const options = {
//     chart: {
//       type: 'column',
//       background: '#f2f2f2',
//     },
//     colors: ['#1976D2', '#C1E7FE'],
//     title: {
//       text: `Male and Female Count by Position - ${vendorName}`,
//     },
//     xAxis: {
//       type:'category',
//     },
//     yAxis: {
//       title: {
//         text: 'Count',
//       },
//     },
//     legend: {
//       reversed: false,
//     },
//     plotOptions: {
//       column: {
//         stacking: 'normal',
//         cursor: 'pointer',
//         point: {
//           events: {
//             click: function () {
//               try {
//                 if (!this.drilldown) {
//                   return false;
//                 }
//                 const drilldownId = this.options.drilldown;
//                 const drilldownSeries = chartRef.current.get(drilldownId);

//                 if (drilldownSeries) {
//                   chartRef.current.addSingleSeriesAsDrilldown(this, drilldownSeries);
//                   chartRef.current.applyDrilldown();
//                 }
//               } catch (error) {
//                 console.error('An error occurred during drilldown:', error);
//               }
//             },
//           },
//         },
//       },
//     },
//     series: [
//       {
//         name: 'Male',
//         data: seriesData2.map((item) => ({
//           name: item.name,
//           y: item.data[0][1], // Male count for 2023
//           drilldown: item.id + '_male', // Use a unique identifier for male drilldown in 2023
//         })),
//       },
//       {
//         name: 'Female',
//         data: seriesData2.map((item) => ({
//           name: item.name,
//           y: item.data[0][2], // Male count for 2023
//           drilldown: item.id + '_female', // Use a unique identifier for male drilldown in 2023
//         })),
//       },
//     ],

//     drilldown: {
//       series: seriesData.flatMap((item) => {
//         const maleData = item.data.map((dataItem) => ({
//           name: dataItem[0],
//           y: dataItem[1],
//         }));

//         const femaleData = item.data.map((dataItem) => ({
//           name: dataItem[0],
//           y: dataItem[2],
//         }));

//         return [
//           {
//             id: item.name + '_male',
//             name: `Male ${item.name}`,
//             data: maleData,
//           },
//           {
//             id: item.name + '_female',
//             name: `Female ${item.name}`,
//             data: femaleData,
//           },
//         ];
//       }),
//     },
//   };

//   setChartOptions_vendor(options);
// }, [CustomDataToBeLooped, selectedVendor]);

// const savedstaticforline=JSON.parse(localStorage.getItem("hiringdata_static"));
let CustomDataToBeLoopedforHiring;

useEffect(()=>{
if (Array.isArray(data) && data.length > 0 && data.some((row) => row.hasOwnProperty('interview'))) {
  localStorage.setItem("hiringdrilldata_dynamic",JSON.stringify(data));
  CustomDataToBeLoopedforHiring=data;
  console.log(CustomDataToBeLoopedforHiring);

}
else{
  console.log(CustomDataToBeLoopedforHiring);

  //dynamic empty 
  const dynamichiringdata=JSON.parse(localStorage.getItem("hiringdrilldata_dynamic"));
  const savedStaticForHiring=JSON.parse(localStorage.getItem("hiring_drilldata_static"));
  if(dynamichiringdata==null){
  //static
  CustomDataToBeLoopedforHiring=savedStaticForHiring;
  console.log(CustomDataToBeLoopedforHiring);

  }
  else{
    CustomDataToBeLoopedforHiring=dynamichiringdata;
    console.log(CustomDataToBeLoopedforHiring);

  }
}
},[data])


useEffect(() => {
  const currentYear = new Date().getFullYear();
  const drillData = {};

  if(CustomDataToBeLoopedforHiring!=null) {

    CustomDataToBeLoopedforHiring.forEach((row) => {
      const stages = ['application_screening', 'aptitude', 'interview', 'selection'];
      const gender = row.gender;
      const year = new Date(row.year).getFullYear();
  
      stages.forEach((stage) => {
        if (!drillData[stage]) {
          drillData[stage] = {};
        }
  
        if (!drillData[stage][year]) {
          drillData[stage][year] = { males: 0, females: 0 };
        }
  
        if (row[stage] === true) {
          if (gender === 'M') {
            drillData[stage][year].males++;
          } else if (gender === 'F') {
            drillData[stage][year].females++;
          }
        }
      });
    });
  } else {
    console.log('no hiring data');
  }

  console.log(drillData);

  const stages = Object.keys(drillData);

  const seriesData = stages.map((stage) => {
    const years = Object.keys(drillData[stage]).filter(year => year!=='2023');

    const data = years.map((year) => {
      const maleCount = drillData[stage][year].males || 0;
      const femaleCount = drillData[stage][year].females || 0;

      return [year, maleCount, femaleCount];
    });

    return {
      name: stage,
      id: stage.toLowerCase().replace(/ /g, "-"),
      data: data,
    };
  });

  const seriesdata2 = stages.map((stage) => {
      const years = Object.keys(drillData[stage]);
      const year = '2023'; // Specify the desired year here
    
      const maleCount = drillData[stage][year]?.males || 0;
      const femaleCount = drillData[stage][year]?.females || 0;
    
      return {
        name: stage,
        id: stage.toLowerCase().replace(/ /g, "-"),
        data: [[year, maleCount, femaleCount]],
      };
    });

  const options = {
    chart: {
      type: 'column',
    },
    colors: ['#1976D2', '#C1E7FE'], // Set custom colors for the stacks
    title: {
      text: 'Male and Female Count by Hiring Stage',
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      title: {
        text: 'Count',
      },
    },
    legend: {
      reversed: false, // Set to false to display the legend in the order of the series (male and female)
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        cursor: 'pointer',
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
                  chartRef.current.addSingleSeriesAsDrilldown(this, drilldownSeries);
                  chartRef.current.applyDrilldown();
                }
              } catch (error) {
                // Handle the error gracefully
                console.error('An error occurred during drilldown:', error);
              }
            },
          },
        },
      },
    },

    series: [
      {
        name: 'Male',
        data: seriesdata2.map((item) => ({
          name: item.name,
          y: item.data[0][1], // Male count for 2023
          drilldown: item.id + '_male', // Use a unique identifier for male drilldown in 2023
        })),
      },
      {
        name: 'Female',
        data: seriesdata2.map((item) => ({
          name: item.name,
          y: item.data[0][2], // Female count for 2023
          drilldown: item.id + '_female', // Use a unique identifier for female drilldown in 2023
        })),
      },
    ],
    drilldown: {
      series: seriesData.flatMap((item) => {
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
            id: item.id + '_male',
            name: `Male ${item.name}`,
            data: maleData,
          },
          {
            id: item.id + '_female',
            name: `Female ${item.name}`,
            data: femaleData,
          },
        ];
      }),
    },
  };

  setChartOptions_hiring(options);
}, [CustomDataToBeLoopedforHiring]);





// ------------------line

// const savedstaticforline=JSON.parse(localStorage.getItem("hiringdata_static"));
let CustomDataToBeLoopedforLine;

useEffect(()=>{
if (Array.isArray(data) && data.length > 0 && data.some((row) => row.hasOwnProperty('male_openings'))) {
  localStorage.setItem("hiringdata_dynamic",JSON.stringify(data));
  CustomDataToBeLoopedforLine=data;
  console.log(CustomDataToBeLoopedforLine);

}
else{
  console.log(CustomDataToBeLoopedforLine);

  //dynamic empty 
  const dynamichiringdata=JSON.parse(localStorage.getItem("hiringdata_dynamic"));
  const savedStaticForHiring=JSON.parse(localStorage.getItem("hiringdata_static"));
  if(dynamichiringdata==null){
  //static
  CustomDataToBeLoopedforLine=savedStaticForHiring;
  console.log(CustomDataToBeLoopedforLine);

  }
  else{
    CustomDataToBeLoopedforLine=dynamichiringdata;
    console.log(CustomDataToBeLoopedforLine);

  }
}
},[data])

useEffect(() => {
  const demand = {};
  const supply = {};
  if(CustomDataToBeLoopedforLine!=null) {
    CustomDataToBeLoopedforLine.forEach((row) => {
        const position = row.band;
        const gender = row.gender;
        const male_openings = row.male_openings;
        const female_openings = row.female_openings;
        // const { position, gender, male_openings, female_openings } = row;
        
        // Calculate demand
        if (!demand[position]) {
          demand[position] = { males: 0, females: 0 };
        }
        if (gender === 'M') {
          demand[position].males = male_openings;
        } else if (gender === 'F') {
          demand[position].females = female_openings;
        }
        
        // Calculate supply
        if (!supply[position]) {
          supply[position] = { males: new Set(), females: new Set() };
        }
        if (gender === 'M') {
          supply[position].males.add(row.id);
        } else if (gender === 'F') {
          supply[position].females.add(row.id);
        }
        });
  } else{
    console.log('line data null..')
  }
  
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
          data: [[parseInt(males), supplyMales, parseInt(females), supplyFemales]],
        };
      });
      console.log(seriesData);
    
      const options = {
        chart: {
        type: 'line',
        backgroundColor: '#C1E7FE'
        },
        title: {
        text: 'Demand and Supply of Male and Female Employees by Position'
        },
        xAxis: {
        categories: positions // Use the sorted positions as categories on the x-axis
        },
        yAxis: {
        title: {
            text: 'Number of Employees'
        }
        },
        legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
        },
        series: [
        {
            name: 'Male Demand',
            data: seriesData.map((data) => data.data[0][0]) // Male demand values
        },
        {
            name: 'Male Supply',
            data: seriesData.map((data) => data.data[0][1]) // Male supply values
        },
        {
            name: 'Female Demand',
            data: seriesData.map((data) => data.data[0][2]) // Female demand values
        },
        {
            name: 'Female Supply',
            data: seriesData.map((data) => data.data[0][3]) // Female supply values
        }
        ]
      };
    
      setChartOptions_line(options);
  
}, [CustomDataToBeLoopedforLine]);


  
  return (
    <>
      <form onSubmit={show}>
        <input type="submit" />
      </form>
      <div>
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

    
{/* //heatmap */}
<div>
      {chartOptions_heat ? (
        <HighchartsReact highcharts={Highcharts} options={chartOptions_heat} />
      ) : (
        <div>Loading chart...</div>
      )}
    </div>

    {/* venodr */}

    <div>
      <select value={selectedVendor} onChange={(e) => setSelectedVendor(e.target.value)}>
        <option value="google">Google</option>
        <option value="flipkart">Flipkart</option>
        <option value="amazon">Amazon</option>
        <option value="microsoft">Microsoft</option>
        <option value="jio">Jio</option>
        {/* Add more options for other vendors */}
      </select>
      {chartOptions_vendor ? (
        <HighchartsReact highcharts={Highcharts} options={chartOptions_vendor} ref={chartRef} />
      ) : (
        <div>Loading chart...</div>
      )}
    </div>

    <div>
      {chartOptions_hiring ? (
        <HighchartsReact highcharts={Highcharts} options={chartOptions_hiring} ref={chartRef} />
      ) : (
        <div>Loading chart...</div>
      )}
    </div>

{/* line */}
<div>
      {chartOptions_line ? (
        <HighchartsReact highcharts={Highcharts} options={chartOptions_line} />
      ) : (
        <div>Loading chart...</div>
      )}
    </div>
    
    </>
  );
};

export default Dynamic;
