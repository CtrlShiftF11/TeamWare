//Andy Sandeferr
function getJiraIssues(projectId, startDate, endDate, renderTarget){
    $.getJSON('/jiraissues/burndown?projectId=' + encodeURIComponent(projectId) + '&startDate=' + reformatDateForJira(startDate) + '&endDate=' + reformatDateForJira(endDate))
        .done(function(issueData){
            renderChart(issueData, renderTarget);
        });
}

function renderChart(issueData, renderTarget){
    var resolvedCount = 0;
    var openCount = 0;
    var reviewCount = 0;
    var onHoldCount = 0;
    var approvedCount = 0;

    $.each(issueData, function(i, data){
        var status = data["fields"]["status"][0].name;
        switch(status) {
            case 'Open' :
                openCount += 1;
                break;
            case 'Closed' :
                resolvedCount += 1;
                break;
            case 'In Review' :
                reviewCount += 1;
                break;
            case 'Approved' :
                approvedCount += 1;
                break;
            case 'On Hold' :
                onHoldCount += 1;
                break;
            default:
                openCount += 1;
        }
    });
    //Chart...
    var chartOptions = {
        chart: {
            renderTo: renderTarget
        },
        colorAxis: {
            minColor: '#FFFFFF',
            maxColor: Highcharts.getOptions().colors[0]
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Project Progress Overview'
        },
        series: [{
            type: "treemap",
            layoutAlgorithm: "squarified",
            data: [
                {
                    name: 'Open',
                    value: openCount,
                    color: '#6699FF'
                },
                {
                    name: 'Closed/Resolved',
                    value: resolvedCount,
                    color: '#FFFF66'
                },
                {
                    name: 'On Hold',
                    value: onHoldCount,
                    color: '#FF6666'
                },
                {
                    name: 'Approved',
                    value: approvedCount,
                    color: '#FF6666'
                },
                {
                    name: 'In Review',
                    value: reviewCount,
                    color: '#669999'
                }
            ]
        }]
    };
    var chart = new Highcharts.Chart(chartOptions);
}
