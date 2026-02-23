// Transaction Comps — Tab 5: M&A and IPO Transactions
var Transactions = (function() {

  var sectors = ['All', 'Banking', 'Consumer Finance', 'Fintech', 'Payments', 'Wealth/Brokerage', 'Mortgage Tech', 'Insurance', 'Insurtech', 'Data/Infrastructure', 'Payments/Infrastructure', 'Personal Finance', 'SMB Lending', 'BNPL', 'Neobank', 'Crypto', 'Fintech/Lending', 'Fintech/Consumer', 'Proptech'];

  function render(containerId, firm) {
    var el = document.getElementById(containerId);
    if (!el) return;

    var html = '';
    html += '<h3 class="val-section-title">Recent Fintech & Finance Transactions (2020–2025)</h3>';
    html += '<p class="val-help">Filter by sector. Click a transaction to apply its multiples to the selected firm.</p>';

    // Sector filters
    var usedSectors = {};
    TRANSACTIONS_DATA.forEach(function(tx) { usedSectors[tx.sector] = true; });
    html += '<div class="tx-filters" id="tx-filters">';
    html += '<button class="tx-filter-btn active" data-sector="All">All</button>';
    Object.keys(usedSectors).sort().forEach(function(s) {
      html += '<button class="tx-filter-btn" data-sector="' + s + '">' + s + '</button>';
    });
    html += '</div>';

    // Transaction table
    html += '<div id="tx-table"></div>';

    // Applied valuation
    if (firm) {
      html += '<h3 class="val-section-title">Apply Transaction Multiples to ' + firm.name + '</h3>';
      html += '<div id="tx-applied"></div>';
    }

    el.innerHTML = html;

    var activeFilter = 'All';

    // Filter buttons
    el.querySelectorAll('.tx-filter-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        el.querySelectorAll('.tx-filter-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        activeFilter = btn.dataset.sector;
        renderTable(activeFilter);
      });
    });

    function renderTable(sector) {
      var filtered = TRANSACTIONS_DATA.filter(function(tx) {
        return sector === 'All' || tx.sector === sector;
      });

      var fmtM = Financials.fmtM;
      var tableEl = document.getElementById('tx-table');

      var h = '<div class="val-table-wrap"><table class="val-table"><thead><tr>';
      h += '<th>Date</th><th>Target</th><th>Acquirer</th><th>Sector</th><th>Deal Value</th>';
      h += '<th>Type</th><th>EV/Rev</th><th>P/E</th><th>P/B</th>';
      h += '</tr></thead><tbody>';

      filtered.forEach(function(tx, idx) {
        h += '<tr class="tx-row" data-idx="' + TRANSACTIONS_DATA.indexOf(tx) + '" style="cursor:pointer">';
        h += '<td>' + tx.date + '</td>';
        h += '<td><strong>' + tx.target + '</strong></td>';
        h += '<td>' + tx.acquirer + '</td>';
        h += '<td>' + tx.sector + '</td>';
        h += '<td>' + fmtM(tx.dealValue) + '</td>';
        h += '<td>' + tx.dealType + '</td>';
        h += '<td>' + fmtR(tx.evRevenue) + '</td>';
        h += '<td>' + fmtR(tx.pe) + '</td>';
        h += '<td>' + fmtR(tx.pb) + '</td>';
        h += '</tr>';
        // Notes row
        h += '<tr class="row-indent" style="display:none" id="tx-notes-' + TRANSACTIONS_DATA.indexOf(tx) + '">';
        h += '<td colspan="9" style="font-style:italic;color:#6b7280;font-size:0.8rem">' + tx.notes + '</td>';
        h += '</tr>';
      });

      if (filtered.length === 0) {
        h += '<tr><td colspan="9" style="text-align:center;color:#9ca3af">No transactions in this sector</td></tr>';
      }

      h += '</tbody></table></div>';

      // Summary stats
      if (filtered.length > 0) {
        var evRevs = filtered.map(function(tx) { return tx.evRevenue; }).filter(function(v) { return v != null; });
        var pes = filtered.map(function(tx) { return tx.pe; }).filter(function(v) { return v != null; });
        var pbs = filtered.map(function(tx) { return tx.pb; }).filter(function(v) { return v != null; });

        h += '<div class="ratios-grid" style="margin-top:1rem">';
        if (evRevs.length > 0) {
          evRevs.sort(function(a,b) { return a-b; });
          h += ratioCard('EV/Revenue', fmtR(median(evRevs)), 'Range: ' + fmtR(evRevs[0]) + ' – ' + fmtR(evRevs[evRevs.length-1]));
        }
        if (pes.length > 0) {
          pes.sort(function(a,b) { return a-b; });
          h += ratioCard('P/E', fmtR(median(pes)), 'Range: ' + fmtR(pes[0]) + ' – ' + fmtR(pes[pes.length-1]));
        }
        if (pbs.length > 0) {
          pbs.sort(function(a,b) { return a-b; });
          h += ratioCard('P/B', fmtR(median(pbs)), 'Range: ' + fmtR(pbs[0]) + ' – ' + fmtR(pbs[pbs.length-1]));
        }
        h += '</div>';
      }

      tableEl.innerHTML = h;

      // Toggle notes on click
      tableEl.querySelectorAll('.tx-row').forEach(function(row) {
        row.addEventListener('click', function() {
          var notesRow = document.getElementById('tx-notes-' + row.dataset.idx);
          if (notesRow) {
            notesRow.style.display = notesRow.style.display === 'none' ? '' : 'none';
          }
          if (firm) applyTransaction(TRANSACTIONS_DATA[parseInt(row.dataset.idx)], firm);
        });
      });
    }

    function applyTransaction(tx, firm) {
      var appEl = document.getElementById('tx-applied');
      if (!appEl) return;

      var t = Financials.computeTotals(firm, 2);
      var fmtM = Financials.fmtM;

      var h = '<div class="val-steps">';
      h += '<div style="font-weight:700;margin-bottom:0.5rem;color:#003B5C">Applying ' + tx.target + ' multiples to ' + firm.name + ':</div>';

      if (tx.evRevenue) {
        var impliedRev = t.totalRevenue * tx.evRevenue;
        h += stepLine('EV/Revenue (' + fmtR(tx.evRevenue) + ') × Revenue (' + fmtM(t.totalRevenue) + ')', fmtM(impliedRev));
      }
      if (tx.pe && t.netIncome > 0) {
        var impliedPE = t.netIncome * tx.pe;
        h += stepLine('P/E (' + fmtR(tx.pe) + ') × Net Income (' + fmtM(t.netIncome) + ')', fmtM(impliedPE));
      }
      if (tx.pb) {
        var impliedPB = t.totalEquity * tx.pb;
        h += stepLine('P/B (' + fmtR(tx.pb) + ') × Book Value (' + fmtM(t.totalEquity) + ')', fmtM(impliedPB));
      }

      if (firm.currentPrice && firm.sharesOutstanding) {
        var currentMC = firm.sharesOutstanding * firm.currentPrice;
        h += '<div style="margin-top:0.5rem;padding-top:0.5rem;border-top:1px solid #d1d5db">';
        h += stepLine('Current Market Cap', fmtM(currentMC));
        h += stepLine('Deal value (' + tx.target + ')', fmtM(tx.dealValue));
        h += '</div>';
      }

      h += '</div>';

      h += '<p class="val-help">Consider premium/discount drivers: strategic vs. financial buyer, market conditions, growth trajectory, regulatory risk, technology value.</p>';

      appEl.innerHTML = h;
    }

    renderTable('All');
  }

  function median(sorted) {
    var mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) return (sorted[mid-1] + sorted[mid]) / 2;
    return sorted[mid];
  }

  function fmtR(v) {
    if (v == null || !isFinite(v)) return '—';
    return v.toFixed(1) + 'x';
  }

  function ratioCard(label, value, desc) {
    return '<div class="ratio-card"><div class="ratio-label">' + label + '</div>' +
      '<div class="ratio-value">' + value + '</div>' +
      '<div class="ratio-desc">' + desc + '</div></div>';
  }

  function stepLine(label, value) {
    return '<div class="step-line"><span class="step-label">' + label + '</span><span class="step-value">' + value + '</span></div>';
  }

  return { render: render };
})();
