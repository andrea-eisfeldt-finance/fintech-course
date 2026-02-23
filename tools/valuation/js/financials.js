// Financials module — Tab 1: Historical Financial Statements & Diagnostic Ratios
var Financials = (function() {

  function sumObj(obj, yearIdx) {
    var total = 0;
    for (var k in obj) {
      if (Array.isArray(obj[k])) total += obj[k][yearIdx];
    }
    return total;
  }

  // Compute derived totals for a firm at a given year index
  function computeTotals(firm, yi) {
    var is = firm.incomeStatement;
    var bs = firm.balanceSheet;

    var intInc = sumObj(is.interestIncome, yi);
    var intExp = sumObj(is.interestExpense, yi);
    var nii = intInc - intExp;
    var provision = is.provisionForCreditLosses[yi];
    var niiAfterProv = nii - provision;
    var nonIntInc = sumObj(is.nonInterestIncome, yi);
    var nonIntExp = sumObj(is.nonInterestExpense, yi);
    var preTax = niiAfterProv + nonIntInc - nonIntExp;
    var tax = is.incomeTaxExpense[yi];
    var netIncome = preTax - tax;
    var totalRevenue = intInc + nonIntInc;

    var totalAssets = sumObj(bs.assets, yi);
    var totalLiabilities = sumObj(bs.liabilities, yi);
    var totalEquity = sumObj(bs.equity, yi);

    return {
      interestIncome: intInc,
      interestExpense: intExp,
      netInterestIncome: nii,
      provision: provision,
      niiAfterProvision: niiAfterProv,
      nonInterestIncome: nonIntInc,
      nonInterestExpense: nonIntExp,
      preTaxIncome: preTax,
      incomeTaxExpense: tax,
      netIncome: netIncome,
      totalRevenue: totalRevenue,
      totalAssets: totalAssets,
      totalLiabilities: totalLiabilities,
      totalEquity: totalEquity,
      loans: bs.assets.loansAndLeases[yi],
      deposits: bs.liabilities.deposits[yi]
    };
  }

  function fmtM(v) {
    if (v == null) return '—';
    var neg = v < 0;
    var av = Math.abs(v);
    var s;
    if (av >= 1e6) s = (av / 1e6).toFixed(1) + 'T';
    else if (av >= 1e3) s = (av / 1e3).toFixed(1) + 'B';
    else s = av.toFixed(0) + 'M';
    return (neg ? '(' : '') + '$' + s + (neg ? ')' : '');
  }

  function fmtPct(v) {
    if (v == null || isNaN(v) || !isFinite(v)) return '—';
    return (v * 100).toFixed(1) + '%';
  }

  function buildISTable(firm) {
    var is = firm.incomeStatement;
    var years = firm.years;
    var rows = [];

    function addSection(label) { rows.push({ label: label, cls: 'row-section', values: ['', '', ''] }); }
    function addRow(label, arr, cls) { rows.push({ label: label, cls: cls || '', values: arr.map(function(v) { return fmtM(v); }) }); }
    function addCalcRow(label, fn, cls) {
      rows.push({ label: label, cls: cls || '', values: [0,1,2].map(function(yi) { return fmtM(fn(yi)); }) });
    }

    addSection('Interest Income');
    for (var k in is.interestIncome) {
      var readable = k.replace(/([A-Z])/g, ' $1').replace(/^./, function(s) { return s.toUpperCase(); });
      addRow('  ' + readable, is.interestIncome[k], 'row-indent');
    }
    addCalcRow('Total Interest Income', function(yi) { return sumObj(is.interestIncome, yi); }, 'row-subtotal');

    addSection('Interest Expense');
    for (var k2 in is.interestExpense) {
      var readable2 = k2.replace(/([A-Z])/g, ' $1').replace(/^./, function(s) { return s.toUpperCase(); });
      addRow('  ' + readable2, is.interestExpense[k2], 'row-indent');
    }
    addCalcRow('Total Interest Expense', function(yi) { return sumObj(is.interestExpense, yi); }, 'row-subtotal');

    addCalcRow('NET INTEREST INCOME', function(yi) {
      return sumObj(is.interestIncome, yi) - sumObj(is.interestExpense, yi);
    }, 'row-total');

    addRow('Provision for Credit Losses', is.provisionForCreditLosses);

    addCalcRow('Net Interest Income After Provision', function(yi) {
      return sumObj(is.interestIncome, yi) - sumObj(is.interestExpense, yi) - is.provisionForCreditLosses[yi];
    }, 'row-subtotal');

    addSection('Non-Interest Income');
    for (var k3 in is.nonInterestIncome) {
      var readable3 = k3.replace(/([A-Z])/g, ' $1').replace(/^./, function(s) { return s.toUpperCase(); });
      addRow('  ' + readable3, is.nonInterestIncome[k3], 'row-indent');
    }
    addCalcRow('Total Non-Interest Income', function(yi) { return sumObj(is.nonInterestIncome, yi); }, 'row-subtotal');

    addSection('Non-Interest Expense');
    for (var k4 in is.nonInterestExpense) {
      var readable4 = k4.replace(/([A-Z])/g, ' $1').replace(/^./, function(s) { return s.toUpperCase(); });
      addRow('  ' + readable4, is.nonInterestExpense[k4], 'row-indent');
    }
    addCalcRow('Total Non-Interest Expense', function(yi) { return sumObj(is.nonInterestExpense, yi); }, 'row-subtotal');

    addCalcRow('PRE-TAX INCOME', function(yi) { return computeTotals(firm, yi).preTaxIncome; }, 'row-total');
    addRow('Income Tax Expense', is.incomeTaxExpense);
    addCalcRow('NET INCOME', function(yi) { return computeTotals(firm, yi).netIncome; }, 'row-total');

    return renderTable(years, rows);
  }

  function buildBSTable(firm) {
    var bs = firm.balanceSheet;
    var years = firm.years;
    var rows = [];

    function addSection(label) { rows.push({ label: label, cls: 'row-section', values: ['', '', ''] }); }
    function addRow(label, arr, cls) { rows.push({ label: label, cls: cls || '', values: arr.map(function(v) { return fmtM(v); }) }); }
    function addCalcRow(label, fn, cls) {
      rows.push({ label: label, cls: cls || '', values: [0,1,2].map(function(yi) { return fmtM(fn(yi)); }) });
    }

    addSection('ASSETS');
    for (var k in bs.assets) {
      var readable = k.replace(/([A-Z])/g, ' $1').replace(/^./, function(s) { return s.toUpperCase(); });
      addRow('  ' + readable, bs.assets[k], 'row-indent');
    }
    addCalcRow('TOTAL ASSETS', function(yi) { return sumObj(bs.assets, yi); }, 'row-total');

    addSection('LIABILITIES');
    for (var k2 in bs.liabilities) {
      var readable2 = k2.replace(/([A-Z])/g, ' $1').replace(/^./, function(s) { return s.toUpperCase(); });
      addRow('  ' + readable2, bs.liabilities[k2], 'row-indent');
    }
    addCalcRow('TOTAL LIABILITIES', function(yi) { return sumObj(bs.liabilities, yi); }, 'row-total');

    addSection('EQUITY');
    for (var k3 in bs.equity) {
      var readable3 = k3.replace(/([A-Z])/g, ' $1').replace(/^./, function(s) { return s.toUpperCase(); });
      addRow('  ' + readable3, bs.equity[k3], 'row-indent');
    }
    addCalcRow('TOTAL EQUITY', function(yi) { return sumObj(bs.equity, yi); }, 'row-total');

    return renderTable(years, rows);
  }

  function renderTable(years, rows) {
    var html = '<div class="val-table-wrap"><table class="val-table">';
    html += '<thead><tr><th>($M)</th>';
    years.forEach(function(y) { html += '<th>' + y + '</th>'; });
    html += '</tr></thead><tbody>';
    rows.forEach(function(r) {
      html += '<tr class="' + r.cls + '">';
      html += '<td>' + r.label + '</td>';
      r.values.forEach(function(v) {
        var cls = '';
        if (typeof v === 'string' && v.indexOf('(') === 0) cls = ' class="negative"';
        html += '<td' + cls + '>' + v + '</td>';
      });
      html += '</tr>';
    });
    html += '</tbody></table></div>';
    return html;
  }

  function buildRatios(firm) {
    var t = computeTotals(firm, 2); // most recent year
    var prevT = computeTotals(firm, 1);
    var ratios = [
      {
        label: 'Equity / Assets',
        value: t.totalEquity / t.totalAssets,
        desc: 'Leverage indicator',
        fmt: 'pct'
      },
      {
        label: 'Loans / Assets',
        value: t.loans / t.totalAssets,
        desc: 'Lending intensity',
        fmt: 'pct'
      },
      {
        label: 'Deposits / Liabilities',
        value: t.deposits > 0 ? t.deposits / t.totalLiabilities : 0,
        desc: 'Funding model',
        fmt: 'pct'
      },
      {
        label: 'Interest Inc / Total Revenue',
        value: t.interestIncome / t.totalRevenue,
        desc: 'Spread vs. fee income',
        fmt: 'pct'
      },
      {
        label: 'Net Interest Margin',
        value: t.netInterestIncome / ((t.totalAssets + prevT.totalAssets) / 2),
        desc: 'NII / avg assets',
        fmt: 'pct'
      },
      {
        label: 'Provision / Loans',
        value: t.loans > 0 ? t.provision / t.loans : 0,
        desc: 'Credit quality',
        fmt: 'pct'
      },
      {
        label: 'Efficiency Ratio',
        value: t.nonInterestExpense / (t.netInterestIncome + t.nonInterestIncome),
        desc: 'Non-int expense / revenue',
        fmt: 'pct'
      },
      {
        label: 'ROE',
        value: t.netIncome / ((t.totalEquity + prevT.totalEquity) / 2),
        desc: 'Return on equity',
        fmt: 'pct'
      }
    ];

    // Add tech spend ratio if tech assets exist
    var techAssets = firm.balanceSheet.assets.technologyAssets;
    if (techAssets && techAssets[2] > 0) {
      var techSpend = firm.incomeStatement.nonInterestExpense.technologyAndComm[2];
      ratios.push({
        label: 'Tech Spend / Revenue',
        value: techSpend / t.totalRevenue,
        desc: 'Fintech diagnostic',
        fmt: 'pct'
      });
    }

    var html = '<div class="ratios-grid">';
    ratios.forEach(function(r) {
      html += '<div class="ratio-card">';
      html += '<div class="ratio-label">' + r.label + '</div>';
      html += '<div class="ratio-value">' + fmtPct(r.value) + '</div>';
      html += '<div class="ratio-desc">' + r.desc + '</div>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  }

  function render(containerId, firm) {
    var el = document.getElementById(containerId);
    if (!el || !firm) return;

    var html = '';
    html += '<h3 class="val-section-title">Income Statement</h3>';
    html += buildISTable(firm);
    html += '<h3 class="val-section-title">Balance Sheet</h3>';
    html += buildBSTable(firm);
    html += '<h3 class="val-section-title">Diagnostic Ratios (' + firm.years[2] + ')</h3>';
    html += buildRatios(firm);

    // Revenue composition chart
    html += '<div class="charts-row">';
    html += '<div class="chart-container" style="height:280px" id="chart-rev-composition"></div>';
    html += '<div class="chart-container" style="height:280px" id="chart-rev-trend"></div>';
    html += '</div>';

    el.innerHTML = html;

    // Render charts
    var years = firm.years;
    var intIncData = years.map(function(y, i) { return sumObj(firm.incomeStatement.interestIncome, i); });
    var nonIntIncData = years.map(function(y, i) { return sumObj(firm.incomeStatement.nonInterestIncome, i); });
    var niData = years.map(function(y, i) { return computeTotals(firm, i).netIncome; });

    ValCharts.barChart('chart-rev-composition', years.map(String), [
      { label: 'Interest Income', data: intIncData },
      { label: 'Non-Interest Income', data: nonIntIncData }
    ], { title: 'Revenue Composition' });

    ValCharts.lineChart('chart-rev-trend', years.map(String), [
      { label: 'Net Income', data: niData }
    ], { title: 'Net Income Trend', beginAtZero: false });
  }

  return {
    render: render,
    computeTotals: computeTotals,
    sumObj: sumObj,
    fmtM: fmtM,
    fmtPct: fmtPct
  };
})();
