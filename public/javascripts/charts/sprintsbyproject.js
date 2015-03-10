//Andy Sandefer
function getSprintCompositionByProject(projectId, renderTarget) {
    $.getJSON('/sprints/getbyproject/' + projectId)
        .done(function (sprintData) {
            renderCompChart(sprintData, renderTarget);
        });
}

function renderCompChart(sprintData, renderTarget) {
    var chartOptions = {
        chart: {
            renderTo: renderTarget,
            type: 'column'
        },
        credits: {
            enabled: false
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
        var d = new Date();
        d.setFullYear(sprintData[i]._id.year, sprintData[i]._id.month - 1, sprintData[i]._id.dayOfMonth);
        var endDate = d.toJSON();
        chartOptions.series[0].data.push([Date.parse(endDate), sprintData[i].standard_story_points]);
        chartOptions.series[1].data.push([Date.parse(endDate), sprintData[i].research_spike_points]);
        chartOptions.series[2].data.push([Date.parse(endDate), sprintData[i].refactor_points]);
    }
    var chart = new Highcharts.Chart(chartOptions);
}
