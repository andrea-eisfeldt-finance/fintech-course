// Pro Forma Builder — Tab 2: 5-year projections from assumptions
var ProForma = (function() {

  var defaults = {
    revenueGrowth: 0.05,
    nimTarget: null, // auto from historical
    provisionRate: null, // auto from historical
    opexRatio: null, // auto
    taxRate: 0.21,
    assetGrowth: 0.05,
    depositGrowthPremium: 0.00, // vs asset growth
    terminalGrowth: 0.03
  };

  function getAssumptions(firm) {
    var t = Financials.computeTotals(firm, 2);
    var prevT = Financials.computeTotals(firm, 1);
    var avgAssets = (t.totalAssets + prevT.totalAssets) / 2;

    return {
      revenueGrowth: defaults.revenueGrowth,
      nim: t.netInterestIncome / avgAssets,
      provisionRate: t.loans > 0 ? t.provision / t.loans : 0.01,
      nonIntIncGrowth: 0.05,
      opexRatio: t.nonInterestExpense / (t.netInterestIncome + t.nonInterestIncome),
      taxRate: t.preTaxIncome > 0 ? t.incomeTaxExpense / t.preTaxIncome : 0.21,
      assetGrowth: 0.05,
      depositGrowthPremium: 0.00,
      loanToAssetRatio: t.loans / t.totalAssets,
      depositToLiabRatio: t.deposits / t.totalLiabilities
    };
  }

  function project(firm, assumptions) {
    var a = assumptions;
    var t2 = Financials.computeTotals(firm, 2);
    var years = [];
    var baseYear = firm.years[2];

    // Base values from most recent year
    var prevAssets = t2.totalAssets;
    var prevLoans = t2.loans;
    var prevDeposits = t2.deposits;
    var prevEquity = t2.totalEquity;
    var prevNonIntInc = t2.nonInterestIncome;

    for (var y = 1; y <= 5; y++) {
      var totalAssets = prevAssets * (1 + a.assetGrowth);
      var loans = totalAssets * a.loanToAssetRatio;
      var avgAssets = (prevAssets + totalAssets) / 2;

      // Income statement
      var nii = a.nim * avgAssets;
      var provision = a.provisionRate * loans;
      var niiAfterProv = nii - provision;
      var nonIntInc = prevNonIntInc * (1 + a.nonIntIncGrowth);
      var totalRevenue = nii + nonIntInc;
      var opex = a.opexRatio * totalRevenue;
      var preTax = niiAfterProv + nonIntInc - opex;
      var tax = Math.max(0, preTax * a.taxRate);
      var netIncome = preTax - tax;

      // Balance sheet
      var totalLiabilities = totalAssets - prevEquity - netIncome;
      var deposits = a.depositToLiabRatio > 0 ? totalLiabilities * a.depositToLiabRatio : 0;
      var otherLiab = totalLiabilities - deposits;
      var equity = prevEquity + netIncome;

      years.push({
        year: baseYear + y,
        totalAssets: totalAssets,
        loans: loans,
        avgAssets: avgAssets,
        nii: nii,
        provision: provision,
        niiAfterProv: niiAfterProv,
        nonIntInc: nonIntInc,
        totalRevenue: totalRevenue,
        opex: opex,
        preTax: preTax,
        tax: tax,
        netIncome: netIncome,
        deposits: deposits,
        otherLiab: otherLiab,
        totalLiabilities: totalLiabilities,
        equity: equity,
        equityToAssets: equity / totalAssets,
        roe: netIncome / ((prevEquity + equity) / 2),
        nim_actual: nii / avgAssets,
        efficiencyRatio: opex / totalRevenue
      });

      prevAssets = totalAssets;
      prevLoans = loans;
      prevDeposits = deposits;
      prevEquity = equity;
      prevNonIntInc = nonIntInc;
    }
    return years;
  }

  function render(containerId, firm) {
    var el = document.getElementById(containerId);
    if (!el || !firm) return;

    var a = getAssumptions(firm);
    var projected = project(firm, a);

    var html = '';

    // Assumptions controls
    html += '<h3 class="val-section-title">Projection Assumptions</h3>';
    html += '<p class="val-help">Adjust assumptions below. Pro forma statements update instantly.</p>';
    html += '<div class="assumptions-grid">';

    html += '<div class="assumption-group"><h4>Growth</h4>';
    html += assumptionSlider('pf-asset-growth', 'Asset Growth', a.assetGrowth, -0.05, 0.20, 0.005, '%');
    html += assumptionSlider('pf-nonint-growth', 'Non-Int Inc Growth', a.nonIntIncGrowth, -0.10, 0.30, 0.01, '%');
    html += '</div>';

    html += '<div class="assumption-group"><h4>Margins & Rates</h4>';
    html += assumptionSlider('pf-nim', 'Net Interest Margin', a.nim, 0.001, 0.10, 0.001, '%');
    html += assumptionSlider('pf-provision', 'Provision / Loans', a.provisionRate, 0, 0.10, 0.001, '%');
    html += assumptionSlider('pf-opex', 'Efficiency Ratio', a.opexRatio, 0.30, 1.20, 0.01, '%');
    html += '</div>';

    html += '<div class="assumption-group"><h4>Other</h4>';
    html += assumptionSlider('pf-tax', 'Tax Rate', a.taxRate, 0, 0.35, 0.01, '%');
    html += assumptionSlider('pf-loan-asset', 'Loan / Asset Ratio', a.loanToAssetRatio, 0.05, 0.95, 0.01, '%');
    html += '</div>';

    html += '</div>';

    // Pro forma IS
    html += '<h3 class="val-section-title">Pro Forma Income Statement</h3>';
    html += '<div id="pf-is-table"></div>';

    // Pro forma BS summary
    html += '<h3 class="val-section-title">Pro Forma Balance Sheet Summary</h3>';
    html += '<div id="pf-bs-table"></div>';

    // Charts
    html += '<div class="charts-row">';
    html += '<div class="chart-container" style="height:280px" id="chart-pf-revenue"></div>';
    html += '<div class="chart-container" style="height:280px" id="chart-pf-margins"></div>';
    html += '</div>';

    el.innerHTML = html;

    // Wire up sliders
    function rebind() {
      a.assetGrowth = getSliderVal('pf-asset-growth');
      a.nonIntIncGrowth = getSliderVal('pf-nonint-growth');
      a.nim = getSliderVal('pf-nim');
      a.provisionRate = getSliderVal('pf-provision');
      a.opexRatio = getSliderVal('pf-opex');
      a.taxRate = getSliderVal('pf-tax');
      a.loanToAssetRatio = getSliderVal('pf-loan-asset');
      projected = project(firm, a);
      renderTables(firm, projected);
      renderPFCharts(firm, projected);
    }

    var sliders = el.querySelectorAll('input[type="range"]');
    sliders.forEach(function(s) {
      s.addEventListener('input', rebind);
    });

    renderTables(firm, projected);
    renderPFCharts(firm, projected);
  }

  function assumptionSlider(id, label, value, min, max, step, unit) {
    var displayVal = unit === '%' ? (value * 100).toFixed(1) + '%' : value.toFixed(2);
    return '<div class="assumption-row">' +
      '<label for="' + id + '">' + label + '</label>' +
      '<input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + value + '">' +
      '<span class="unit" id="' + id + '-val">' + displayVal + '</span>' +
      '</div>';
  }

  function getSliderVal(id) {
    var slider = document.getElementById(id);
    if (!slider) return 0;
    var v = parseFloat(slider.value);
    var display = document.getElementById(id + '-val');
    if (display) display.textContent = (v * 100).toFixed(1) + '%';
    return v;
  }

  function renderTables(firm, projected) {
    var isEl = document.getElementById('pf-is-table');
    var bsEl = document.getElementById('pf-bs-table');
    if (!isEl) return;

    var fmtM = Financials.fmtM;
    var years = projected.map(function(p) { return p.year; });

    // IS table
    var isRows = [
      { label: 'Net Interest Income', key: 'nii', cls: '' },
      { label: 'Provision for Credit Losses', key: 'provision', cls: '' },
      { label: 'NII After Provision', key: 'niiAfterProv', cls: 'row-subtotal' },
      { label: 'Non-Interest Income', key: 'nonIntInc', cls: '' },
      { label: 'Total Revenue', key: 'totalRevenue', cls: 'row-subtotal' },
      { label: 'Operating Expenses', key: 'opex', cls: '' },
      { label: 'Pre-Tax Income', key: 'preTax', cls: 'row-subtotal' },
      { label: 'Income Tax', key: 'tax', cls: '' },
      { label: 'NET INCOME', key: 'netIncome', cls: 'row-total' }
    ];

    var html = '<div class="val-table-wrap"><table class="val-table"><thead><tr><th>($M)</th>';
    years.forEach(function(y) { html += '<th>' + y + 'E</th>'; });
    html += '</tr></thead><tbody>';
    isRows.forEach(function(r) {
      html += '<tr class="' + r.cls + '"><td>' + r.label + '</td>';
      projected.forEach(function(p) {
        var v = fmtM(p[r.key]);
        var cls = v.indexOf('(') === 0 ? ' class="negative"' : '';
        html += '<td' + cls + '>' + v + '</td>';
      });
      html += '</tr>';
    });
    html += '</tbody></table></div>';
    isEl.innerHTML = html;

    // BS table
    var bsRows = [
      { label: 'Total Assets', key: 'totalAssets', cls: 'row-subtotal' },
      { label: '  Loans & Leases', key: 'loans', cls: 'row-indent' },
      { label: 'Total Liabilities', key: 'totalLiabilities', cls: 'row-subtotal' },
      { label: '  Deposits', key: 'deposits', cls: 'row-indent' },
      { label: 'Total Equity', key: 'equity', cls: 'row-total' },
      { label: 'Equity / Assets', key: 'equityToAssets', cls: '', fmt: 'pct' },
      { label: 'ROE', key: 'roe', cls: '', fmt: 'pct' }
    ];

    html = '<div class="val-table-wrap"><table class="val-table"><thead><tr><th>($M)</th>';
    years.forEach(function(y) { html += '<th>' + y + 'E</th>'; });
    html += '</tr></thead><tbody>';
    bsRows.forEach(function(r) {
      html += '<tr class="' + r.cls + '"><td>' + r.label + '</td>';
      projected.forEach(function(p) {
        var v = r.fmt === 'pct' ? Financials.fmtPct(p[r.key]) : fmtM(p[r.key]);
        html += '<td>' + v + '</td>';
      });
      html += '</tr>';
    });
    html += '</tbody></table></div>';
    bsEl.innerHTML = html;
  }

  function renderPFCharts(firm, projected) {
    var years = projected.map(function(p) { return p.year + 'E'; });

    ValCharts.barChart('chart-pf-revenue', years, [
      { label: 'NII', data: projected.map(function(p) { return p.nii; }) },
      { label: 'Non-Int Inc', data: projected.map(function(p) { return p.nonIntInc; }) }
    ], { title: 'Projected Revenue Mix' });

    ValCharts.lineChart('chart-pf-margins', years, [
      { label: 'ROE', data: projected.map(function(p) { return p.roe; }) },
      { label: 'Efficiency', data: projected.map(function(p) { return p.efficiencyRatio; }) },
      { label: 'Equity/Assets', data: projected.map(function(p) { return p.equityToAssets; }) }
    ], { title: 'Key Ratios Over Time', pct: true, beginAtZero: false });
  }

  return {
    render: render,
    getAssumptions: getAssumptions,
    project: project
  };
})();
