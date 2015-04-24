//Andy Sandefer
function getSprintByProject(projectId, renderTarget) {
    $.getJSON('/sprints/getbyproject/' + projectId)
        .done(function (sprintData) {
            renderChart(sprintData, renderTarget);
        });
}

function renderChart(sprintData, renderTarget) {
    var chartOptions = {
        chart: {
            renderTo: renderTarget,
            type: 'line'
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Burndown'
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
        var d = new Date();
        d.setFullYear(sprintData[i]._id.year, sprintData[i]._id.month - 1, sprintData[i]._id.dayOfMonth);
        var endDate = d.toJSON();
        chartOptions.series[0].data.push([Date.parse(endDate), sprintData[i].actual_points]);
        chartOptions.series[1].data.push([Date.parse(endDate), sprintData[i].planned_points]);
    }
    var chart = new Highcharts.Chart(chartOptions);
}
