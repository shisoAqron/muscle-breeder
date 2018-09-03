var ctx = document.getElementById("myChart").getContext("2d");
var chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
    datasets: [
      {
        label: "1時間あたりの負荷",
        borderColor: "rgb(255, 0, 0)",
        lineTension: 0, //<===追加
        fill: false, //<===追加
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0]
      }
    ]
  },
  options: {
    responsive: true
  }
});
