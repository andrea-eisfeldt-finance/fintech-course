// Multiples Valuation — Tab 4: Comparable Company Analysis
var Multiples = (function() {

  function computeMultiples(firm) {
    var t = Financials.computeTotals(firm, 2);
    var marketCap = (firm.sharesOutstanding && firm.currentPrice)
      ? firm.sharesOutstanding * firm.currentPrice
      : null;

    var bookValue = t.totalEquity;
    // Tangible book = equity - intangibles
    var intangibles = firm.balanceSheet.assets.intangiblesGoodwill[2] || 0;
    var tbv = bookValue - intangibles;

    return {
      ticker: firm.ticker,
      name: firm.name,
      sector: firm.sector,
      marketCap: marketCap,
      netIncome: t.netIncome,
      bookValue: bookValue,
      tbv: tbv,
      totalRevenue: t.totalRevenue,
      pe: (marketCap && t.netIncome > 0) ? marketCap / t.netIncome : null,
      pb: marketCap ? marketCap / bookValue : null,
      ptbv: (marketCap && tbv > 0) ? marketCap / tbv : null,
      pRev: marketCap ? marketCap / t.totalRevenue : null,
      roe: t.netIncome / bookValue
    };
  }

  function render(containerId, firm) {
    var el = document.getElementById(containerId);
    if (!el || !firm) return;

    var allMultiples = {};
    var tickers = Object.keys(FIRMS_DATA);
    tickers.forEach(function(tk) {
      allMultiples[tk] = computeMultiples(FIRMS_DATA[tk]);
    });

    var targetM = allMultiples[firm.ticker] || computeMultiples(firm);

    var html = '';
    html += '<h3 class="val-section-title">Select Comparable Peers</h3>';
    html += '<p class="val-help">Select peer companies to compute comparable multiples. Click chips to toggle.</p>';

    // Peer chips
    html += '<div class="peer-checkboxes" id="peer-chips">';
    tickers.forEach(function(tk) {
      if (tk === firm.ticker) return;
      var f = FIRMS_DATA[tk];
      var defaultSelected = f.sector === firm.sector;
      html += '<label class="peer-chip' + (defaultSelected ? ' selected' : '') + '" data-ticker="' + tk + '">';
      html += '<input type="checkbox"' + (defaultSelected ? ' checked' : '') + '>';
      html += f.ticker === 'Private' ? f.name : f.ticker;
      html += ' <span style="font-size:0.7rem;opacity:0.6">(' + f.sector + ')</span>';
      html += '</label>';
    });
    html += '</div>';

    // Results area
    html += '<h3 class="val-section-title">Peer Multiples Comparison</h3>';
    html += '<div id="mult-table"></div>';

    html += '<h3 class="val-section-title">Implied Valuation</h3>';
    html += '<div id="mult-valuation"></div>';

    // Football field
    html += '<div class="chart-container" style="height:280px" id="chart-football"></div>';

    el.innerHTML = html;

    // Wire up chips
    var chips = el.querySelectorAll('.peer-chip');
    chips.forEach(function(chip) {
      chip.addEventListener('click', function(e) {
        e.preventDefault();
        var cb = chip.querySelector('input');
        cb.checked = !cb.checked;
        chip.classList.toggle('selected', cb.checked);
        updateMultiples();
      });
    });

    function getSelectedPeers() {
      var selected = [];
      chips.forEach(function(chip) {
        if (chip.querySelector('input').checked) {
          selected.push(chip.dataset.ticker);
        }
      });
      return selected;
    }

    function updateMultiples() {
      var peers = getSelectedPeers();
      renderMultiplesTable(targetM, peers, allMultiples);
      renderImpliedValuation(targetM, peers, allMultiples);
    }

    updateMultiples();
  }

  function renderMultiplesTable(target, peers, allMultiples) {
    var el = document.getElementById('mult-table');
    if (!el) return;

    var fmtM = Financials.fmtM;

    var html = '<div class="val-table-wrap"><table class="val-table"><thead><tr>';
    html += '<th>Company</th><th>Sector</th><th>Market Cap</th><th>P/E</th><th>P/B</th><th>P/TBV</th><th>P/Rev</th><th>ROE</th>';
    html += '</tr></thead><tbody>';

    // Target row
    html += '<tr class="row-total"><td><strong>' + target.name + ' (Target)</strong></td>';
    html += '<td>' + target.sector + '</td>';
    html += '<td>' + (target.marketCap ? fmtM(target.marketCap) : '—') + '</td>';
    html += '<td>' + fmtR(target.pe) + '</td>';
    html += '<td>' + fmtR(target.pb) + '</td>';
    html += '<td>' + fmtR(target.ptbv) + '</td>';
    html += '<td>' + fmtR(target.pRev) + '</td>';
    html += '<td>' + Financials.fmtPct(target.roe) + '</td>';
    html += '</tr>';

    // Peer rows
    peers.forEach(function(tk) {
      var m = allMultiples[tk];
      if (!m) return;
      html += '<tr><td>' + m.name + '</td>';
      html += '<td>' + m.sector + '</td>';
      html += '<td>' + (m.marketCap ? fmtM(m.marketCap) : '—') + '</td>';
      html += '<td>' + fmtR(m.pe) + '</td>';
      html += '<td>' + fmtR(m.pb) + '</td>';
      html += '<td>' + fmtR(m.ptbv) + '</td>';
      html += '<td>' + fmtR(m.pRev) + '</td>';
      html += '<td>' + Financials.fmtPct(m.roe) + '</td>';
      html += '</tr>';
    });

    // Compute medians
    if (peers.length > 0) {
      var stats = computeStats(peers, allMultiples);
      html += '<tr class="row-section"><td>Peer Median</td><td></td><td></td>';
      html += '<td>' + fmtR(stats.pe.median) + '</td>';
      html += '<td>' + fmtR(stats.pb.median) + '</td>';
      html += '<td>' + fmtR(stats.ptbv.median) + '</td>';
      html += '<td>' + fmtR(stats.pRev.median) + '</td>';
      html += '<td></td></tr>';

      html += '<tr class="row-indent"><td>Low (25th pctl)</td><td></td><td></td>';
      html += '<td>' + fmtR(stats.pe.low) + '</td>';
      html += '<td>' + fmtR(stats.pb.low) + '</td>';
      html += '<td>' + fmtR(stats.ptbv.low) + '</td>';
      html += '<td>' + fmtR(stats.pRev.low) + '</td>';
      html += '<td></td></tr>';

      html += '<tr class="row-indent"><td>High (75th pctl)</td><td></td><td></td>';
      html += '<td>' + fmtR(stats.pe.high) + '</td>';
      html += '<td>' + fmtR(stats.pb.high) + '</td>';
      html += '<td>' + fmtR(stats.ptbv.high) + '</td>';
      html += '<td>' + fmtR(stats.pRev.high) + '</td>';
      html += '<td></td></tr>';
    }

    html += '</tbody></table></div>';
    el.innerHTML = html;
  }

  function renderImpliedValuation(target, peers, allMultiples) {
    var el = document.getElementById('mult-valuation');
    if (!el || peers.length === 0) {
      if (el) el.innerHTML = '<p class="val-help">Select at least one peer to see implied valuations.</p>';
      return;
    }

    var stats = computeStats(peers, allMultiples);
    var fmtM = Financials.fmtM;

    var methods = [];

    // P/E
    if (target.netIncome > 0 && stats.pe.median) {
      methods.push({
        label: 'P/E',
        metric: 'Net Income',
        metricVal: target.netIncome,
        low: target.netIncome * stats.pe.low,
        median: target.netIncome * stats.pe.median,
        high: target.netIncome * stats.pe.high
      });
    }

    // P/B
    if (stats.pb.median) {
      methods.push({
        label: 'P/B',
        metric: 'Book Value',
        metricVal: target.bookValue,
        low: target.bookValue * stats.pb.low,
        median: target.bookValue * stats.pb.median,
        high: target.bookValue * stats.pb.high
      });
    }

    // P/TBV
    if (target.tbv > 0 && stats.ptbv.median) {
      methods.push({
        label: 'P/TBV',
        metric: 'Tangible BV',
        metricVal: target.tbv,
        low: target.tbv * stats.ptbv.low,
        median: target.tbv * stats.ptbv.median,
        high: target.tbv * stats.ptbv.high
      });
    }

    // P/Revenue
    if (stats.pRev.median) {
      methods.push({
        label: 'P/Revenue',
        metric: 'Revenue',
        metricVal: target.totalRevenue,
        low: target.totalRevenue * stats.pRev.low,
        median: target.totalRevenue * stats.pRev.median,
        high: target.totalRevenue * stats.pRev.high
      });
    }

    // Table
    var html = '<div class="val-table-wrap"><table class="val-table"><thead><tr>';
    html += '<th>Method</th><th>Metric</th><th>Low</th><th>Median</th><th>High</th>';
    html += '</tr></thead><tbody>';
    methods.forEach(function(m) {
      html += '<tr>';
      html += '<td><strong>' + m.label + '</strong></td>';
      html += '<td>' + fmtM(m.metricVal) + '</td>';
      html += '<td>' + fmtM(m.low) + '</td>';
      html += '<td><strong>' + fmtM(m.median) + '</strong></td>';
      html += '<td>' + fmtM(m.high) + '</td>';
      html += '</tr>';
    });
    html += '</tbody></table></div>';

    // Per-share if available
    if (target.marketCap && methods.length > 0) {
      html += '<div class="val-summary">';
      methods.forEach(function(m) {
        var shares = target.marketCap / (FIRMS_DATA[target.ticker] ? FIRMS_DATA[target.ticker].currentPrice : 1);
        if (shares > 0) {
          html += '<div class="val-summary-card"><div class="summary-label">' + m.label + ' Implied Price</div>';
          html += '<div class="summary-value">$' + (m.median / shares).toFixed(1) + '</div>';
          html += '<div class="summary-sub">Range: $' + (m.low / shares).toFixed(1) + ' – $' + (m.high / shares).toFixed(1) + '</div></div>';
        }
      });
      html += '</div>';
    }

    el.innerHTML = html;

    // Football field chart
    if (methods.length > 0) {
      ValCharts.footballField('chart-football', methods);
    }
  }

  function computeStats(peers, allMultiples) {
    function getStat(key) {
      var vals = [];
      peers.forEach(function(tk) {
        var m = allMultiples[tk];
        if (m && m[key] != null && m[key] > 0 && isFinite(m[key])) vals.push(m[key]);
      });
      vals.sort(function(a, b) { return a - b; });
      if (vals.length === 0) return { low: null, median: null, high: null };
      return {
        low: percentile(vals, 0.25),
        median: percentile(vals, 0.5),
        high: percentile(vals, 0.75)
      };
    }
    return {
      pe: getStat('pe'),
      pb: getStat('pb'),
      ptbv: getStat('ptbv'),
      pRev: getStat('pRev')
    };
  }

  function percentile(sorted, p) {
    if (sorted.length === 0) return null;
    if (sorted.length === 1) return sorted[0];
    var idx = p * (sorted.length - 1);
    var lo = Math.floor(idx);
    var hi = Math.ceil(idx);
    if (lo === hi) return sorted[lo];
    return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo);
  }

  function fmtR(v) {
    if (v == null || !isFinite(v)) return '—';
    return v.toFixed(1) + 'x';
  }

  return { render: render };
})();
