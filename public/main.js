(function(){
  'use strict';

  new Chartist.Line('#chart1', {
    labels: [1, 2, 3, 4],
    series: [[100, 120, 180, 200]]
  });

  new Chartist.Line('#chart2', {
    labels: [1, 2, 3, 4],
    series: [[100, 120, 180, 200]]
  });

  new Chartist.Line('#chart3', {
    labels: [1, 2, 3, 4],
    series: [[100, 120, 180, 200]]
  });
})();