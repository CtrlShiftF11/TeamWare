//Andy Sandefer
function getSprintByTeam(teamId) {
    $.getJSON('/sprints/getbyteam/' + teamId)
        .done(function (sprintData) {
            renderChart(sprintData);
        });
}

function renderChart(sprintData) {
    var chartOptions = {
        chart: {
            renderTo: 'teamChart',
            type: 'spline'
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Planned vs. Actual by Sprint'
        },
        xAxis: {
            type: 'datetime',
            labels: {
                formatter: function () {
                    return Highcharts.dateFormat('%m/%d/%y', this.value);
                }
            }
        },
        series: [
            {
                name: 'Actual Points',
                data: []
            },
            {
                name: 'Planned Points',
                data: []
            }
        ]
    };
    for (var i = 0; i < sprintData.length; i++) {
        chartOptions.series[0].data.push([Date.parse(sprintData[i].end_date), sprintData[i].actual_points]);
        chartOptions.series[1].data.push([Date.parse(sprintData[i].end_date), sprintData[i].planned_points]);
    }
    var chart = new Highcharts.Chart(chartOptions);
}
