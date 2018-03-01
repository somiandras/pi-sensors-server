(function(){
  'use strict';

  let xhr = new XMLHttpRequest()
  xhr.addEventListener('load', function() {
    let data = JSON.parse(this.responseText);
    
    let labels = data
    .map(elem => {
      let date = new Date(elem.date);
      let label = date.getHours() + ':' + date.getMinutes();
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
      });
    });
  })
  xhr.open('GET', 'http://localhost:3000/readings');
  xhr.send();
})();