// Charts module — Chart.js visualizations
var ValCharts = (function() {
  var instances = {};

  function destroy(id) {
    if (instances[id]) {
      instances[id].destroy();
      delete instances[id];
    }
  }

  function destroyAll() {
    Object.keys(instances).forEach(destroy);
  }

  function ensureCanvas(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return null;
    container.innerHTML = '';
    var canvas = document.createElement('canvas');
    container.appendChild(canvas);
    return canvas.getContext('2d');
  }

  var UCLA_BLUE = '#003B5C';
  var UCLA_GOLD = '#FFD100';
  var UCLA_LIGHT = '#005587';
  var COLORS = [UCLA_BLUE, UCLA_GOLD, '#2196F3', '#FF9800', '#4CAF50', '#9C27B0', '#F44336'];

  function fmt(v) {
    if (v == null) return '—';
    if (Math.abs(v) >= 1e6) return '$' + (v / 1e6).toFixed(1) + 'T';
    if (Math.abs(v) >= 1e3) return '$' + (v / 1e3).toFixed(1) + 'B';
    return '$' + v.toFixed(0) + 'M';
  }

  function pctFmt(v) {
    return (v * 100).toFixed(1) + '%';
  }

  function barChart(containerId, labels, datasets, opts) {
    var ctx = ensureCanvas(containerId);
    if (!ctx) return;
    destroy(containerId);
    opts = opts || {};
    instances[containerId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets.map(function(ds, i) {
          return Object.assign({
            backgroundColor: COLORS[i % COLORS.length],
            borderColor: COLORS[i % COLORS.length],
            borderWidth: 1
          }, ds);
        })
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: !!opts.title, text: opts.title || '', color: UCLA_BLUE, font: { size: 14, weight: 'bold' } },
          legend: { display: datasets.length > 1 }
        },
        scales: {
          y: {
            beginAtZero: opts.beginAtZero !== false,
            ticks: {
              callback: opts.pct ? function(v) { return (v * 100).toFixed(0) + '%'; } : function(v) { return fmt(v); }
            }
          }
        }
      }
    });
    return instances[containerId];
  }

  function lineChart(containerId, labels, datasets, opts) {
    var ctx = ensureCanvas(containerId);
    if (!ctx) return;
    destroy(containerId);
    opts = opts || {};
    instances[containerId] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets.map(function(ds, i) {
          return Object.assign({
            borderColor: COLORS[i % COLORS.length],
            backgroundColor: COLORS[i % COLORS.length] + '20',
            fill: false,
            tension: 0.3,
            pointRadius: 4,
            borderWidth: 2
          }, ds);
        })
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: !!opts.title, text: opts.title || '', color: UCLA_BLUE, font: { size: 14, weight: 'bold' } },
          legend: { display: datasets.length > 1 }
        },
        scales: {
          y: {
            beginAtZero: opts.beginAtZero !== false,
            ticks: {
              callback: opts.pct ? function(v) { return (v * 100).toFixed(0) + '%'; } : function(v) { return fmt(v); }
            }
          }
        }
      }
    });
    return instances[containerId];
  }

  function footballField(containerId, methods) {
    var ctx = ensureCanvas(containerId);
    if (!ctx) return;
    destroy(containerId);
    var labels = methods.map(function(m) { return m.label; });
    instances[containerId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Low',
            data: methods.map(function(m) { return m.low; }),
            backgroundColor: 'transparent'
          },
          {
            label: 'Range',
            data: methods.map(function(m) { return m.high - m.low; }),
            backgroundColor: methods.map(function(m, i) { return COLORS[i % COLORS.length] + '80'; }),
            borderColor: methods.map(function(m, i) { return COLORS[i % COLORS.length]; }),
            borderWidth: 2
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: 'Implied Valuation Range', color: UCLA_BLUE, font: { size: 14, weight: 'bold' } },
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(context) {
                var m = methods[context.dataIndex];
                if (context.datasetIndex === 0) return '';
                return 'Range: ' + fmt(m.low) + ' – ' + fmt(m.high) + ' (Median: ' + fmt(m.median) + ')';
              }
            }
          }
        },
        scales: {
          x: {
            stacked: true,
            ticks: { callback: function(v) { return fmt(v); } }
          },
          y: { stacked: true }
        }
      }
    });
    return instances[containerId];
  }

  return {
    barChart: barChart,
    lineChart: lineChart,
    footballField: footballField,
    destroy: destroy,
    destroyAll: destroyAll,
    COLORS: COLORS,
    fmt: fmt,
    pctFmt: pctFmt
  };
})();
