// Main App — Valuation Tool
(function() {
  var app = document.getElementById('valuation-app');
  if (!app) return;

  var currentFirm = null;
  var currentTicker = null;

  // Build the shell
  var html = '';

  // Header
  html += '<div class="val-header">';
  html += '<h1>Financial Firm Valuation Tool</h1>';
  html += '<p>Pro forma projections, DCF, multiples, and transaction comps for banks and fintechs</p>';
  html += '<p style="font-size:0.75rem;opacity:0.7;margin-top:0.5rem">This tool was built by Claude Code (Anthropic) and may contain errors in data or calculations. Financial data is approximate and for educational use only — always verify against primary sources (SEC EDGAR, company filings). See <a href="about/" style="color:#FFD100">How This Tool Was Built</a> for methodology and source code decisions.</p>';
  html += '</div>';

  // Company selector
  html += '<div class="val-selector">';
  html += '<label for="firm-select">Select Firm:</label>';
  html += '<select id="firm-select">';
  html += '<option value="">— Choose a company —</option>';

  // Group by sector
  var bySector = {};
  Object.keys(FIRMS_DATA).forEach(function(tk) {
    var f = FIRMS_DATA[tk];
    if (!bySector[f.sector]) bySector[f.sector] = [];
    bySector[f.sector].push(tk);
  });

  Object.keys(bySector).sort().forEach(function(sector) {
    html += '<optgroup label="' + sector + '">';
    bySector[sector].forEach(function(tk) {
      var f = FIRMS_DATA[tk];
      html += '<option value="' + tk + '">' + f.name + ' (' + f.ticker + ')' + '</option>';
    });
    html += '</optgroup>';
  });

  html += '</select>';
  html += '<span id="firm-info"></span>';
  html += '</div>';

  // Tabs
  html += '<div class="val-tabs" id="val-tabs">';
  var tabs = [
    { id: 'tab-financials', label: 'Historical Financials' },
    { id: 'tab-proforma', label: 'Pro Forma Builder' },
    { id: 'tab-dcf', label: 'DCF Valuation' },
    { id: 'tab-multiples', label: 'Multiples' },
    { id: 'tab-transactions', label: 'Transaction Comps' }
  ];
  tabs.forEach(function(t, i) {
    html += '<button class="val-tab' + (i === 0 ? ' active' : '') + '" data-tab="' + t.id + '">' + t.label + '</button>';
  });
  html += '</div>';

  // Panels
  tabs.forEach(function(t, i) {
    html += '<div class="val-panel' + (i === 0 ? ' active' : '') + '" id="' + t.id + '">';
    if (i === 0) {
      html += '<p class="val-help">Select a company above to view its financial statements and diagnostic ratios.</p>';
    }
    html += '<div id="' + t.id + '-content"></div>';
    html += '</div>';
  });

  app.innerHTML = html;

  // Tab switching
  var tabBtns = document.querySelectorAll('.val-tab');
  var panels = document.querySelectorAll('.val-panel');

  tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      tabBtns.forEach(function(b) { b.classList.remove('active'); });
      panels.forEach(function(p) { p.classList.remove('active'); });
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
      renderActiveTab(btn.dataset.tab);
    });
  });

  // Company selection
  var select = document.getElementById('firm-select');
  select.addEventListener('change', function() {
    var tk = select.value;
    if (!tk || !FIRMS_DATA[tk]) {
      currentFirm = null;
      currentTicker = null;
      document.getElementById('firm-info').innerHTML = '';
      clearPanels();
      return;
    }
    currentTicker = tk;
    currentFirm = FIRMS_DATA[tk];
    updateFirmInfo();
    renderAllTabs();
  });

  function updateFirmInfo() {
    var info = document.getElementById('firm-info');
    if (!currentFirm) { info.innerHTML = ''; return; }
    var h = '<span class="firm-badge">' + currentFirm.caseType + '</span> ';
    h += '<span class="firm-meta">';
    if (currentFirm.currentPrice) {
      h += '<strong>$' + currentFirm.currentPrice + '</strong> per share';
      if (currentFirm.sharesOutstanding) {
        var mc = currentFirm.sharesOutstanding * currentFirm.currentPrice;
        h += ' · Mkt Cap: ' + Financials.fmtM(mc);
      }
    } else {
      h += '<strong>Private</strong>';
    }
    h += '</span>';
    info.innerHTML = h;
  }

  function clearPanels() {
    tabs.forEach(function(t) {
      var content = document.getElementById(t.id + '-content');
      if (content) content.innerHTML = '<p class="val-help">Select a company above to begin.</p>';
    });
  }

  function getActiveTab() {
    var active = document.querySelector('.val-tab.active');
    return active ? active.dataset.tab : 'tab-financials';
  }

  function renderActiveTab(tabId) {
    if (!currentFirm) return;
    switch (tabId) {
      case 'tab-financials':
        Financials.render('tab-financials-content', currentFirm);
        break;
      case 'tab-proforma':
        ProForma.render('tab-proforma-content', currentFirm);
        break;
      case 'tab-dcf':
        DCF.render('tab-dcf-content', currentFirm);
        break;
      case 'tab-multiples':
        Multiples.render('tab-multiples-content', currentFirm);
        break;
      case 'tab-transactions':
        Transactions.render('tab-transactions-content', currentFirm);
        break;
    }
  }

  function renderAllTabs() {
    ValCharts.destroyAll();
    renderActiveTab(getActiveTab());
  }

  // Auto-select first firm for demo
  // (Uncomment to auto-load): select.value = 'JPM'; select.dispatchEvent(new Event('change'));
})();
