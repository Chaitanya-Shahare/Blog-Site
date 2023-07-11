Highcharts.chart('container', {
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Average Count of Females and Males'
    },
    series: [{
        name: 'Count',
        data: [
            { name: 'Female', y: 50 },
            { name: 'Male', y: 70 }
        ]
    }]
});
