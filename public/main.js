(function(){
  'use strict';

  let xhr = new XMLHttpRequest()
  xhr.addEventListener('load', function() {
    let data = JSON.parse(this.responseText);
    
    let labels = data
    .map(elem => {
      let date = new Date(elem.date);
      let hours = date.getHours();
      let minutes = '0' + date.getMinutes()
      let label = hours + ':' + minutes.substr(minutes.length - 2);
      return label;
    });

    let temps = data.map(elem => elem.temp);
    let humis = data.map(elem => elem.humi);
    let luxes = data.map(elem => elem.lux);
    
    let dataSeries = [temps, humis, luxes];
    dataSeries.forEach((s, i) => {
      let id = '#chart' + (i + 1);
      new Chartist.Line(id, {
        labels: labels,
        series: [s]
      }, {
        axisX: {
          labelOffset: {y: 5}
        },
        chartPadding: {
          top: 20,
          bottom: 20,
          left: 20,
          right: 20
        }
      });
    });
  })
  xhr.open('GET', '/readings');
  xhr.send();
})();


