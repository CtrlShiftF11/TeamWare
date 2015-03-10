//Andy Sandefer
function getSprintByTeam(teamId, renderTarget) {
    $.getJSON('/sprints/getbyteam/' + teamId)
        .done(function (sprintData) {
            renderChart(sprintData, renderTarget);
        });
}

function renderChart(sprintData, renderTarget) {
    var chartOptions = {
        chart: {
            renderTo: renderTarget,
            type: 'column'
        },
        title: {
            text: 'Work Composition by Sprint'
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
                name: 'Story Points',
                data: []
            },
            {
                name: 'Research Spike Points',
                data: []
            },
            {
                name: 'Refactor Points',
                data: []
            }
        ],
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        }
    };
    for (var i = 0; i < sprintData.length; i++) {
        chartOptions.series[0].data.push([Date.parse(sprintData[i].end_date), sprintData[i].standard_story_points]);
        chartOptions.series[1].data.push([Date.parse(sprintData[i].end_date), sprintData[i].research_spike_points]);
        chartOptions.series[2].data.push([Date.parse(sprintData[i].end_date), sprintData[i].refactor_points]);
    }
    var chart = new Highcharts.Chart(chartOptions);
}
