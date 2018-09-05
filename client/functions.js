function setChart(value) {
  const today = moment().format("YYYYMMDD")
  for (idx in chart.data.datasets[0].data) { 
    if(today === moment(value[1].timestamp).format("YYYYMMDD")){
      timestamp = moment(value[1].timestamp).format("H")
      if (timestamp == idx) {
        chart.data.datasets[0].data[idx] += value[1].power
      }
    }
  }
  chart.update();
}

function initM(muscle, values) {
  for(value of values) {
    setChart(value);
    muscle.update(value[1].power)
  }
}

