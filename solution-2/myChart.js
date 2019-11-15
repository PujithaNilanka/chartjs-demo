function format(value) {
    return "" + (value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,",") + " ms";
}

function renderChart(labels, values) {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart.Line( ctx, {
        data: {
            labels: labels,
            datasets: [
                {
                    label: "AvgResponseTime",
                    data: values[0],
                    borderColor: "rgba(250, 00, 192, 1)",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
                {
                    label: "90%ile",
                     data: values[1],
                     borderColor: "rgba(00, 00, 192, 1)",
                     backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
                {
                    label: "Max",
                     data: values[2],
                     borderColor: "rgba(00, 255, 00, 1)",
                     backgroundColor: "rgba(255, 255, 255, 0.2)",
                }
            ]
        },
        options: {
            scales: {
                yAxis: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function(value, index, values) {
                            return format(value);
                        }
                    }
                }]
            }
        }
    });
}

function getChartDataFromJson() {
    $.ajax({
        url: "stats.json",
        success: function(json) {
            var labels =[];
            var dataR1 = [];
            var dataR2 = [];
            var dataR3 = [];
            var values = json.data;

            $.each(values, function(index) {
                labels.push(values[index].name)
            });
            $.each(values, function(index) {
                dataR1.push(json.data[index].AvgResponseTime)
            });
            $.each(values, function(index) {
                dataR2.push(json.data[index].P90ile)
            });
            $.each(values, function(index) {
                dataR3.push(json.data[index].Max)
            });
            console.log(labels);
            var data = [dataR1, dataR2, dataR3]
            console.log(data);
            renderChart(labels, data);
        },
        error: function (err) {
            $("loadingMessage").html("ERROR");
        }
    });
}

$("#renderGraphFromJson").click(
    function() {
        getChartDataFromJson();
    }
    /*function() {
        renderChart(["A","B"], [10,20])
    }*/
);