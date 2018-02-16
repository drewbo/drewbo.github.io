$(function () {

    // Get the CSV and create the chart
    $.get('/data/kenpomwp1992t.csv', function (csv) {

        $('#container').highcharts({

            data: {
                csv: csv
            },

            title: {
                text: 'Michigan 69 Stanford 65'
            },

            subtitle: {
                text: 'Source: kenpom.com'
            },
            legend: {
                enabled: false
            },
            xAxis: {
                type: 'time',
                tickInterval: 5,
                tickWidth: 0,
                gridLineWidth: 1,
                labels: {
                    align: 'left',
                    x: 3,
                    y: -3
                },
                title: {
                    text: 'Game time'
                }
            },

            yAxis: [{ // left y axis
                tickInterval: 0.25,
			    min: 0,
                max: 1,
                labels: {
                    align: 'left',
                    x: 10,
                    y: 16
                },
                title: {
                    text: 'Win Probability'
                },
                showFirstLabel: false
            }, { // right y axis
                gridLineWidth: 0,
                opposite: true,
                linkedTo: 0,
                labels: {
                    align: 'right',
                    x: -10,
                    y: 16
                },
                showFirstLabel: false,
                title: {
                    text: 'Win Probability'
                }
            }],

            tooltip: {
                crosshairs: [true, true],
                formatter: function () {
                    return (this.x).toFixed(2) + ' minutes <br>' + this.series.name + ': ' + (this.y * 100).toFixed(2) + '%';
                }
            },

            plotOptions: {
                series: {
                    cursor: 'pointer',
                    marker: {
                        lineWidth: 1
                    }
                }
            },

            series: [{
                name: 'WP',
                lineWidth: 4,
                marker: {
                    radius: 4
                }
            }]
        });
    });

});
