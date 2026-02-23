// DCF Valuation — Tab 3: Enterprise Value → Capital Structure → Equity Value
var DCF = (function() {

  var defaultParams = {
    riskFreeRate: 0.043,
    equityBeta: 1.2,
    equityPremium: 0.055,
    illiquidityOn: false,      // toggle for illiquidity adjustment
    illiquidityPremium: 0.03,  // additive premium to cost of equity
    costOfDebt: 0.05,
    debtToCapital: 0.50,
    taxRate: 0.21,
    terminalGrowth: 0.03,
    daRate: 0.02,      // D&A as % of revenue (for FCFF)
    capexRate: 0.025,   // CapEx as % of revenue
    nwcRate: 0.02       // change in NWC as % of revenue growth
  };

  function calcWACC(params) {
    var ke = params.riskFreeRate + params.equityBeta * params.equityPremium;
    if (params.illiquidityOn) {
      ke += params.illiquidityPremium;
    }
    var kd = params.costOfDebt * (1 - params.taxRate);
    var we = 1 - params.debtToCapital;
    var wd = params.debtToCapital;
    return {
      ke: ke,
      keBase: params.riskFreeRate + params.equityBeta * params.equityPremium,
      illiqAdj: params.illiquidityOn ? params.illiquidityPremium : 0,
      kdAfterTax: kd,
      kdPreTax: params.costOfDebt,
      we: we,
      wd: wd,
      wacc: we * ke + wd * kd
    };
  }

  function render(containerId, firm) {
    var el = document.getElementById(containerId);
    if (!el || !firm) return;

    var params = Object.assign({}, defaultParams);

    // Auto-set beta from firm data
    if (firm.beta) params.equityBeta = firm.beta;

    // Auto-set debt-to-capital from historical
    var t2 = Financials.computeTotals(firm, 2);
    var totalDebt = (firm.balanceSheet.liabilities.shortTermBorrowings[2] || 0)
                  + (firm.balanceSheet.liabilities.longTermDebt[2] || 0);
    var mktEquity = (firm.sharesOutstanding && firm.currentPrice)
                  ? firm.sharesOutstanding * firm.currentPrice : t2.totalEquity;
    var totalCapital = totalDebt + mktEquity;
    if (totalCapital > 0) params.debtToCapital = totalDebt / totalCapital;

    // Auto-set cost of debt from interest expense / avg debt
    var t1 = Financials.computeTotals(firm, 1);
    var totalDebt1 = (firm.balanceSheet.liabilities.shortTermBorrowings[1] || 0)
                   + (firm.balanceSheet.liabilities.longTermDebt[1] || 0);
    var avgDebt = (totalDebt + totalDebt1) / 2;
    if (avgDebt > 0) {
      params.costOfDebt = t2.interestExpense / avgDebt;
    }

    // Auto-set tax rate
    if (t2.preTaxIncome > 0) params.taxRate = t2.incomeTaxExpense / t2.preTaxIncome;

    var w = calcWACC(params);

    var html = '';

    // ═══════════════════════════════════════════════════
    // SECTION 1: WACC
    // ═══════════════════════════════════════════════════
    html += '<h3 class="val-section-title">Weighted Average Cost of Capital (WACC)</h3>';
    html += '<p class="val-help">WACC = (E/V) × Ke + (D/V) × Kd × (1 − t). We value the entire enterprise first, then analyze capital structure and back into equity value.</p>';
    html += '<div class="assumptions-grid">';

    // Auto-detect small/private firms for illiquidity default
    var mktCapForIlliq = (firm.sharesOutstanding && firm.currentPrice)
      ? firm.sharesOutstanding * firm.currentPrice : 0;
    var isSmallOrPrivate = !firm.currentPrice || mktCapForIlliq < 10000; // < $10B or private
    params.illiquidityOn = isSmallOrPrivate;

    // Recompute WACC with illiquidity if toggled on
    w = calcWACC(params);

    html += '<div class="assumption-group"><h4>Cost of Equity (CAPM)</h4>';
    html += slider('dcf-rfr', 'Risk-Free Rate', params.riskFreeRate, 0.01, 0.08, 0.001);
    html += slider('dcf-beta', 'Equity Beta', params.equityBeta, 0.3, 3.0, 0.05, 'x');
    html += slider('dcf-erp', 'Equity Risk Premium', params.equityPremium, 0.03, 0.10, 0.005);

    // Illiquidity premium toggle
    html += '<div class="assumption-row" style="margin-top:0.5rem;padding-top:0.5rem;border-top:1px dashed #d1d5db">';
    html += '<label for="dcf-illiq-toggle" style="flex:1">';
    html += '<input type="checkbox" id="dcf-illiq-toggle"' + (params.illiquidityOn ? ' checked' : '') + ' style="display:inline;width:auto;margin-right:0.4rem">';
    html += 'Illiquidity Premium</label>';
    html += '<span id="dcf-illiq-status" style="font-size:0.8rem;color:' + (params.illiquidityOn ? '#003B5C' : '#9ca3af') + '">' + (params.illiquidityOn ? 'ON' : 'OFF') + '</span>';
    html += '</div>';
    html += '<div id="dcf-illiq-slider" style="' + (params.illiquidityOn ? '' : 'opacity:0.4;pointer-events:none') + '">';
    html += slider('dcf-illiq', 'Illiquidity Premium', params.illiquidityPremium, 0.005, 0.10, 0.005);
    html += '</div>';
    if (isSmallOrPrivate) {
      html += '<div style="font-size:0.75rem;color:#6b7280;margin-top:0.25rem;font-style:italic">';
      if (!firm.currentPrice) {
        html += 'Auto-enabled: private firm (no public market for shares)';
      } else {
        html += 'Auto-enabled: small cap (market cap ' + Financials.fmtM(mktCapForIlliq) + ')';
      }
      html += '</div>';
    }

    html += '<div class="assumption-row"><label><strong>Cost of Equity (Ke)</strong></label><span id="dcf-ke-val" style="font-weight:700;color:#003B5C">' + pf(w.ke) + '</span></div>';
    if (params.illiquidityOn) {
      html += '<div style="font-size:0.75rem;color:#6b7280">CAPM: ' + pf(w.keBase) + ' + Illiquidity: ' + pf(w.illiqAdj) + '</div>';
    }
    html += '<div id="dcf-ke-breakdown"></div>';
    html += '</div>';

    html += '<div class="assumption-group"><h4>Cost of Debt & Capital Structure</h4>';
    html += slider('dcf-kd', 'Pre-Tax Cost of Debt', params.costOfDebt, 0.01, 0.15, 0.0025);
    html += slider('dcf-dc', 'Debt / Total Capital', params.debtToCapital, 0.0, 0.95, 0.01);
    html += slider('dcf-tax', 'Tax Rate', params.taxRate, 0.0, 0.35, 0.01);
    html += '<div class="assumption-row"><label><strong>WACC</strong></label><span id="dcf-wacc-val" style="font-weight:700;color:#003B5C">' + pf(w.wacc) + '</span></div>';
    html += '</div>';

    html += '<div class="assumption-group"><h4>Terminal Value & FCFF Adjustments</h4>';
    html += slider('dcf-tg', 'Terminal Growth Rate', params.terminalGrowth, 0.00, 0.05, 0.0025);
    html += slider('dcf-da', 'D&A / Revenue', params.daRate, 0.0, 0.10, 0.005);
    html += slider('dcf-capex', 'CapEx / Revenue', params.capexRate, 0.0, 0.15, 0.005);
    html += slider('dcf-nwc', 'ΔNWC / ΔRevenue', params.nwcRate, -0.05, 0.15, 0.005);
    html += '</div>';

    html += '</div>';

    // Beta reference table
    html += '<h3 class="val-section-title">Equity Beta Reference</h3>';
    html += '<p class="val-help">Pre-loaded betas reflect systematic risk differences across firm types. Traditional banks have lower betas (stable cash flows, deposit insurance). Fintechs have higher betas (growth stocks, unproven models, macro sensitivity). Private firms use estimated betas from public comparables.</p>';
    html += '<div class="val-table-wrap"><table class="val-table"><thead><tr>';
    html += '<th>Firm</th><th>Ticker</th><th>Type</th><th>Beta</th><th>Rationale</th>';
    html += '</tr></thead><tbody>';
    var betaRows = [
      ['MetLife', 'MET', 'Insurance', 0.95, 'Insurance cash flows less correlated with market; long-duration liabilities'],
      ['U.S. Bancorp', 'USB', 'Regional Bank', 1.05, 'Stable deposit franchise, low trading exposure'],
      ['JPMorgan Chase', 'JPM', 'Global Bank', 1.10, 'Diversified across banking, trading, asset mgmt'],
      ['Capital One', 'COF', 'Credit Cards', 1.20, 'Consumer credit cycle exposure; high-NIM card book'],
      ['PayPal', 'PYPL', 'Payments', 1.30, 'Tech platform; fee revenue less cyclical than lending'],
      ['Goldman Sachs', 'GS', 'Investment Bank', 1.35, 'Trading and advisory revenue highly market-sensitive'],
      ['Wealthfront', 'Private', 'Robo-Advisor', 1.40, 'Estimated from public wealth/fintech peers'],
      ['Enova', 'ENVA', 'Subprime Lending', 1.45, 'Non-prime borrowers; high loss rates in downturns'],
      ['Zillow', 'ZG', 'Proptech', 1.50, 'Real estate cycle exposure; ad revenue + mortgage'],
      ['SoFi', 'SOFI', 'Fintech Bank', 1.65, 'High-growth consumer fintech; recent bank charter'],
      ['LendingClub', 'LC', 'Fintech Bank', 1.75, 'Small cap, evolving business model'],
      ['Fannie Mae', 'FNMA', 'GSE', 1.80, 'Extreme leverage; conservatorship / political risk'],
      ['Upstart', 'UPST', 'AI Lending', 2.10, 'AI model risk; revenue collapsed 2022; high vol'],
      ['Affirm', 'AFRM', 'BNPL', 2.30, 'Pre-profit, BNPL model unproven through credit cycle']
    ];
    betaRows.forEach(function(r) {
      var highlight = firm.name === r[0] ? ' style="background:#fffbe6;font-weight:600"' : '';
      html += '<tr' + highlight + '>';
      html += '<td>' + r[0] + '</td><td>' + r[1] + '</td><td>' + r[2] + '</td>';
      html += '<td style="text-align:center"><strong>' + r[3].toFixed(2) + '</strong></td>';
      html += '<td style="font-size:0.8rem;color:#4b5563">' + r[4] + '</td>';
      html += '</tr>';
    });
    html += '</tbody></table></div>';

    // Results containers
    html += '<h3 class="val-section-title">Free Cash Flow to the Firm (FCFF)</h3>';
    html += '<p class="val-help">FCFF = EBIT × (1 − t) + D&A − CapEx − ΔNWC. This is the cash available to ALL capital providers (debt + equity) before financing decisions.</p>';
    html += '<div id="dcf-fcff"></div>';

    html += '<h3 class="val-section-title">Enterprise Value</h3>';
    html += '<div id="dcf-ev"></div>';

    html += '<h3 class="val-section-title">From Enterprise Value to Equity Value</h3>';
    html += '<p class="val-help">Enterprise Value − Net Debt = Equity Value. Capital structure determines how enterprise value is divided between debt holders and equity holders.</p>';
    html += '<div id="dcf-bridge"></div>';

    html += '<h3 class="val-section-title">Liability-Side Value Creation</h3>';
    html += '<p class="val-help">Financial firms can create value through below-market funding costs. A deposit franchise or cheap warehouse lines represent a competitive advantage on the liability side of the balance sheet.</p>';
    html += '<div id="dcf-liability"></div>';

    html += '<h3 class="val-section-title">Sensitivity: WACC vs. Terminal Growth</h3>';
    html += '<div id="dcf-sensitivity"></div>';

    html += '<div class="charts-row">';
    html += '<div class="chart-container" style="height:280px" id="chart-dcf-bridge"></div>';
    html += '<div class="chart-container" style="height:280px" id="chart-dcf-funding"></div>';
    html += '</div>';

    el.innerHTML = html;

    function recompute() {
      params.riskFreeRate = gv('dcf-rfr');
      params.equityBeta = gv('dcf-beta');
      params.equityPremium = gv('dcf-erp');
      params.costOfDebt = gv('dcf-kd');
      params.debtToCapital = gv('dcf-dc');
      params.taxRate = gv('dcf-tax');
      params.terminalGrowth = gv('dcf-tg');
      params.daRate = gv('dcf-da');
      params.capexRate = gv('dcf-capex');
      params.nwcRate = gv('dcf-nwc');

      // Illiquidity
      var illiqToggle = document.getElementById('dcf-illiq-toggle');
      params.illiquidityOn = illiqToggle && illiqToggle.checked;
      params.illiquidityPremium = gv('dcf-illiq');

      var illiqSliderWrap = document.getElementById('dcf-illiq-slider');
      var illiqStatus = document.getElementById('dcf-illiq-status');
      if (illiqSliderWrap) {
        illiqSliderWrap.style.opacity = params.illiquidityOn ? '1' : '0.4';
        illiqSliderWrap.style.pointerEvents = params.illiquidityOn ? 'auto' : 'none';
      }
      if (illiqStatus) {
        illiqStatus.textContent = params.illiquidityOn ? 'ON' : 'OFF';
        illiqStatus.style.color = params.illiquidityOn ? '#003B5C' : '#9ca3af';
      }

      w = calcWACC(params);
      document.getElementById('dcf-ke-val').textContent = pf(w.ke);
      document.getElementById('dcf-wacc-val').textContent = pf(w.wacc);

      // Update Ke breakdown
      var bkdn = document.getElementById('dcf-ke-breakdown');
      if (bkdn) {
        if (params.illiquidityOn) {
          bkdn.innerHTML = '<div style="font-size:0.75rem;color:#6b7280">CAPM: ' + pf(w.keBase) + ' + Illiquidity: ' + pf(w.illiqAdj) + '</div>';
        } else {
          bkdn.innerHTML = '';
        }
      }

      renderAll(firm, params);
    }

    el.querySelectorAll('input[type="range"]').forEach(function(s) {
      s.addEventListener('input', recompute);
    });

    // Illiquidity toggle
    var illiqToggle = document.getElementById('dcf-illiq-toggle');
    if (illiqToggle) {
      illiqToggle.addEventListener('change', recompute);
    }

    renderAll(firm, params);
  }

  function renderAll(firm, params) {
    var w = calcWACC(params);
    var a = ProForma.getAssumptions(firm);
    var projected = ProForma.project(firm, a);
    var t2 = Financials.computeTotals(firm, 2);
    var fmtM = Financials.fmtM;

    // ═══════════════════════════════════════════════════
    // FCFF TABLE
    // ═══════════════════════════════════════════════════
    var fcffs = [];
    var prevRevenue = t2.totalRevenue;
    projected.forEach(function(p, i) {
      var ebit = p.preTax; // using pre-tax as proxy for EBIT (interest already in operating for financials)
      var nopat = ebit * (1 - params.taxRate);
      var da = p.totalRevenue * params.daRate;
      var capex = p.totalRevenue * params.capexRate;
      var deltaRev = p.totalRevenue - prevRevenue;
      var deltaNWC = deltaRev * params.nwcRate;
      var fcff = nopat + da - capex - deltaNWC;

      fcffs.push({
        year: p.year,
        revenue: p.totalRevenue,
        ebit: ebit,
        nopat: nopat,
        da: da,
        capex: capex,
        deltaNWC: deltaNWC,
        fcff: fcff,
        pvFactor: 1 / Math.pow(1 + w.wacc, i + 1),
        pvFCFF: fcff / Math.pow(1 + w.wacc, i + 1)
      });
      prevRevenue = p.totalRevenue;
    });

    var fcffEl = document.getElementById('dcf-fcff');
    var h = '<div class="val-table-wrap"><table class="val-table"><thead><tr><th>($M)</th>';
    fcffs.forEach(function(f) { h += '<th>' + f.year + 'E</th>'; });
    h += '</tr></thead><tbody>';
    h += tblRow('Revenue', fcffs, 'revenue');
    h += tblRow('EBIT', fcffs, 'ebit', 'row-subtotal');
    h += tblRow('NOPAT [EBIT × (1−t)]', fcffs, 'nopat');
    h += tblRow('+ D&A', fcffs, 'da');
    h += tblRow('− CapEx', fcffs, 'capex');
    h += tblRow('− ΔNWC', fcffs, 'deltaNWC');
    h += tblRow('= FCFF', fcffs, 'fcff', 'row-total');
    h += tblRow('PV of FCFF', fcffs, 'pvFCFF', 'row-subtotal');
    h += '</tbody></table></div>';
    fcffEl.innerHTML = h;

    // ═══════════════════════════════════════════════════
    // ENTERPRISE VALUE
    // ═══════════════════════════════════════════════════
    var pvFCFFsum = fcffs.reduce(function(s, f) { return s + f.pvFCFF; }, 0);
    var lastFCFF = fcffs[fcffs.length - 1].fcff;
    var termFCFF = lastFCFF * (1 + params.terminalGrowth);
    var tv = (w.wacc > params.terminalGrowth) ? termFCFF / (w.wacc - params.terminalGrowth) : 0;
    var pvTV = tv / Math.pow(1 + w.wacc, 5);
    var enterpriseValue = pvFCFFsum + pvTV;

    var evEl = document.getElementById('dcf-ev');
    var evH = '<div class="val-summary">';
    evH += summaryCard('PV of FCFFs (Yr 1–5)', fmtM(pvFCFFsum), 'Discounted at WACC ' + pf(w.wacc));
    evH += summaryCard('PV of Terminal Value', fmtM(pvTV), 'Perpetuity growth @ ' + pf(params.terminalGrowth));
    evH += summaryCard('Enterprise Value', fmtM(enterpriseValue), 'Total value of the firm', true);
    evH += '</div>';

    evH += '<div class="val-steps">';
    evH += stepLine('PV of FCFFs (Years 1–5)', fmtM(pvFCFFsum));
    evH += stepLine('+ PV of Terminal Value', fmtM(pvTV));
    evH += stepLine('= Enterprise Value', fmtM(enterpriseValue), true);
    evH += stepLine('TV as % of EV', pvTV > 0 && enterpriseValue > 0 ? pf(pvTV / enterpriseValue) : '—');
    evH += '</div>';
    evEl.innerHTML = evH;

    // ═══════════════════════════════════════════════════
    // EV → EQUITY BRIDGE
    // ═══════════════════════════════════════════════════
    var totalDebt = (firm.balanceSheet.liabilities.shortTermBorrowings[2] || 0)
                  + (firm.balanceSheet.liabilities.longTermDebt[2] || 0);
    var cash = firm.balanceSheet.assets.cashAndEquivalents[2] || 0;
    var netDebt = totalDebt - cash;
    var deposits = firm.balanceSheet.liabilities.deposits[2] || 0;
    var otherLiab = (firm.balanceSheet.liabilities.tradingLiabilities[2] || 0)
                  + (firm.balanceSheet.liabilities.otherLiabilities[2] || 0);
    var equityValue = enterpriseValue - netDebt;
    // For firms with deposits, students can discuss whether deposits are "debt" to subtract
    // or an operating liability that's already accounted for in the cash flows
    var equityValueExDeposits = enterpriseValue - netDebt - deposits;

    var bridgeEl = document.getElementById('dcf-bridge');
    var bH = '<div class="val-steps">';
    bH += stepLine('Enterprise Value', fmtM(enterpriseValue));
    bH += stepLine('− Total Financial Debt', fmtM(totalDebt));
    bH += '<div class="step-line row-indent"><span class="step-label">  Short-term borrowings</span><span class="step-value">' + fmtM(firm.balanceSheet.liabilities.shortTermBorrowings[2]) + '</span></div>';
    bH += '<div class="step-line row-indent"><span class="step-label">  Long-term debt</span><span class="step-value">' + fmtM(firm.balanceSheet.liabilities.longTermDebt[2]) + '</span></div>';
    bH += stepLine('+ Cash & Equivalents', fmtM(cash));
    bH += stepLine('= Equity Value (ex-deposits)', fmtM(equityValue), true);

    if (deposits > 0) {
      bH += '<div style="margin:0.75rem 0;padding:0.75rem;background:#fffbe6;border:1px solid #ffd100;border-radius:6px;font-size:0.85rem">';
      bH += '<strong>Capital Structure Question:</strong> Should deposits (' + fmtM(deposits) + ') be subtracted from EV? ';
      bH += 'For non-financial firms, all liabilities are subtracted. For banks, deposits are an operating liability — ';
      bH += 'they fund the loan portfolio and generate the NIM that drives the FCFF above. ';
      bH += 'If you\'ve already deducted interest expense on deposits in computing EBIT/FCFF, subtracting deposits again would double-count. ';
      bH += 'This is why bank valuation is hard and why this discussion matters.';
      bH += '</div>';

      bH += stepLine('Deposits (for reference)', fmtM(deposits));
      bH += stepLine('Other liabilities', fmtM(otherLiab));
    }
    bH += '</div>';

    // Per-share
    if (firm.sharesOutstanding) {
      bH += '<div class="val-summary">';
      bH += summaryCard('Implied Price / Share', '$' + (equityValue / firm.sharesOutstanding).toFixed(2),
        'Current: $' + (firm.currentPrice || '—'));
      if (firm.currentPrice) {
        var updown = ((equityValue / firm.sharesOutstanding) / firm.currentPrice - 1) * 100;
        bH += summaryCard('vs. Market', (updown >= 0 ? '+' : '') + updown.toFixed(1) + '%',
          updown >= 0 ? 'Undervalued' : 'Overvalued');
      }
      bH += summaryCard('Shares Outstanding', firm.sharesOutstanding.toFixed(0) + 'M', '');
      bH += '</div>';
    } else {
      // Private company (e.g., Wealthfront) — IPO pricing discussion
      bH += '<div style="margin:1rem 0;padding:1rem;background:#e8f0fe;border:1px solid #003B5C;border-radius:6px;font-size:0.85rem">';
      bH += '<strong>IPO / Private Valuation:</strong> This company is private. The implied equity value of ';
      bH += fmtM(equityValue) + ' represents what the firm\'s equity should be worth at the enterprise level. ';
      bH += 'In an IPO, the offering price per share = Equity Value ÷ shares offered (pre-money). ';
      bH += 'Compare this to known transaction values (see Transaction Comps tab).';
      bH += '</div>';
    }

    bridgeEl.innerHTML = bH;

    // ═══════════════════════════════════════════════════
    // LIABILITY-SIDE VALUE CREATION
    // ═══════════════════════════════════════════════════
    renderLiabilityAnalysis(firm, params, t2, enterpriseValue);

    // ═══════════════════════════════════════════════════
    // SENSITIVITY
    // ═══════════════════════════════════════════════════
    renderSensitivity(firm, params, w, fcffs, enterpriseValue, netDebt);

    // ═══════════════════════════════════════════════════
    // CHARTS
    // ═══════════════════════════════════════════════════
    ValCharts.barChart('chart-dcf-bridge',
      ['PV of FCFFs', 'PV of TV', 'Enterprise Value', '− Net Debt', 'Equity Value'],
      [{ label: '$M', data: [pvFCFFsum, pvTV, enterpriseValue, -netDebt, equityValue] }],
      { title: 'EV to Equity Bridge', beginAtZero: false }
    );

    renderFundingChart(firm, params, t2);
  }

  function renderLiabilityAnalysis(firm, params, t2, ev) {
    var el = document.getElementById('dcf-liability');
    if (!el) return;
    var fmtM = Financials.fmtM;

    var deposits = firm.balanceSheet.liabilities.deposits[2] || 0;
    var stDebt = firm.balanceSheet.liabilities.shortTermBorrowings[2] || 0;
    var ltDebt = firm.balanceSheet.liabilities.longTermDebt[2] || 0;
    var totalFunding = deposits + stDebt + ltDebt;

    // Compute cost of each funding source
    var depExp = firm.incomeStatement.interestExpense.deposits[2] || 0;
    var borExp = firm.incomeStatement.interestExpense.borrowings[2] || 0;
    var costOfDeposits = deposits > 0 ? depExp / deposits : 0;
    var costOfBorrowings = (stDebt + ltDebt) > 0 ? borExp / (stDebt + ltDebt) : 0;
    var blendedCostOfFunds = totalFunding > 0 ? (depExp + borExp) / totalFunding : 0;

    // Market rate comparison
    var marketRate = params.riskFreeRate; // use risk-free as benchmark
    var depositAdvantage = marketRate - costOfDeposits;
    var annualSavings = deposits > 0 ? depositAdvantage * deposits : 0;
    // PV of deposit franchise
    var depositFranchiseValue = annualSavings > 0 && params.costOfDebt > 0
      ? annualSavings / params.costOfDebt : 0; // perpetuity of savings

    var h = '';

    // Funding mix table
    h += '<div class="val-table-wrap"><table class="val-table"><thead><tr>';
    h += '<th>Funding Source</th><th>Balance ($M)</th><th>% of Funding</th><th>Cost</th><th>Market Rate</th><th>Spread vs. Market</th>';
    h += '</tr></thead><tbody>';

    if (deposits > 0) {
      h += '<tr><td>Deposits</td>';
      h += '<td>' + fmtM(deposits) + '</td>';
      h += '<td>' + pf(deposits / totalFunding) + '</td>';
      h += '<td>' + pf(costOfDeposits) + '</td>';
      h += '<td>' + pf(marketRate) + '</td>';
      h += '<td class="' + (depositAdvantage > 0 ? 'positive' : 'negative') + '">' + (depositAdvantage > 0 ? '+' : '') + pf(depositAdvantage) + '</td>';
      h += '</tr>';
    }

    if (stDebt + ltDebt > 0) {
      h += '<tr><td>Borrowings (ST + LT Debt)</td>';
      h += '<td>' + fmtM(stDebt + ltDebt) + '</td>';
      h += '<td>' + pf((stDebt + ltDebt) / totalFunding) + '</td>';
      h += '<td>' + pf(costOfBorrowings) + '</td>';
      h += '<td>' + pf(marketRate + 0.015) + '</td>';
      var borrowSpread = (marketRate + 0.015) - costOfBorrowings;
      h += '<td class="' + (borrowSpread > 0 ? 'positive' : 'negative') + '">' + (borrowSpread > 0 ? '+' : '') + pf(borrowSpread) + '</td>';
      h += '</tr>';
    }

    if (totalFunding > 0) {
      h += '<tr class="row-total"><td>Blended Cost of Funds</td>';
      h += '<td>' + fmtM(totalFunding) + '</td>';
      h += '<td>100%</td>';
      h += '<td>' + pf(blendedCostOfFunds) + '</td>';
      h += '<td colspan="2"></td></tr>';
    }

    h += '</tbody></table></div>';

    // Value creation analysis
    if (deposits > 0 && depositAdvantage > 0) {
      h += '<div class="val-steps">';
      h += '<div style="font-weight:700;margin-bottom:0.5rem;color:#003B5C">Deposit Franchise Value</div>';
      h += stepLine('Below-market deposit spread', pf(depositAdvantage) + ' advantage');
      h += stepLine('× Deposit base', fmtM(deposits));
      h += stepLine('= Annual funding savings', fmtM(annualSavings));
      h += stepLine('÷ Cost of debt (capitalization rate)', pf(params.costOfDebt));
      h += stepLine('= Deposit franchise value (perpetuity)', fmtM(depositFranchiseValue), true);
      if (ev > 0) {
        h += stepLine('As % of Enterprise Value', pf(depositFranchiseValue / ev));
      }
      h += '</div>';

      h += '<div style="margin:0.75rem 0;padding:0.75rem;background:#f0fdf4;border:1px solid #16a34a;border-radius:6px;font-size:0.85rem">';
      h += '<strong>Discussion:</strong> The deposit franchise is a key source of value for banks. ';
      h += 'Sticky, low-cost deposits create a sustainable funding advantage. ';
      h += 'This is why fintechs like SoFi pursued bank charters — access to deposits as cheap funding. ';
      h += 'Compare Enova (100% wholesale funding at ~' + pf(costOfBorrowings) + ') vs. JPMorgan (deposits at ~' + pf(costOfDeposits) + '). ';
      h += 'The cost of funds difference directly impacts NIM and enterprise value.';
      h += '</div>';
    } else if (totalFunding > 0 && deposits === 0) {
      h += '<div style="margin:0.75rem 0;padding:0.75rem;background:#fef3c7;border:1px solid #d97706;border-radius:6px;font-size:0.85rem">';
      h += '<strong>No Deposit Funding:</strong> This firm funds entirely through wholesale borrowing at ' + pf(costOfBorrowings) + '. ';
      h += 'Without a deposit franchise, the firm lacks the liability-side value creation that banks enjoy. ';
      h += 'Consider: what would happen to this firm\'s valuation if it obtained a bank charter and shifted to deposit funding? ';
      h += 'How much NIM expansion would result from replacing ' + pf(costOfBorrowings) + ' wholesale funding with ~2% deposits?';
      h += '</div>';
    }

    el.innerHTML = h;
  }

  function renderFundingChart(firm, params, t2) {
    var deposits = firm.balanceSheet.liabilities.deposits[2] || 0;
    var stDebt = firm.balanceSheet.liabilities.shortTermBorrowings[2] || 0;
    var ltDebt = firm.balanceSheet.liabilities.longTermDebt[2] || 0;

    if (deposits + stDebt + ltDebt === 0) return;

    var depExp = firm.incomeStatement.interestExpense.deposits[2] || 0;
    var borExp = firm.incomeStatement.interestExpense.borrowings[2] || 0;
    var costOfDeposits = deposits > 0 ? depExp / deposits : 0;
    var costOfBorrowings = (stDebt + ltDebt) > 0 ? borExp / (stDebt + ltDebt) : 0;

    var labels = [];
    var costs = [];
    var sizes = [];

    if (deposits > 0) {
      labels.push('Deposits');
      costs.push(costOfDeposits);
      sizes.push(deposits);
    }
    if (stDebt > 0) {
      labels.push('ST Borrowings');
      costs.push(stDebt > 0 ? borExp * (stDebt / (stDebt + ltDebt)) / stDebt : 0);
      sizes.push(stDebt);
    }
    if (ltDebt > 0) {
      labels.push('LT Debt');
      costs.push(ltDebt > 0 ? borExp * (ltDebt / (stDebt + ltDebt)) / ltDebt : 0);
      sizes.push(ltDebt);
    }
    labels.push('Market Rate');
    costs.push(params.riskFreeRate);
    sizes.push(0);

    ValCharts.barChart('chart-dcf-funding', labels,
      [{ label: 'Cost of Funds', data: costs }],
      { title: 'Cost of Funding by Source', pct: true }
    );
  }

  function renderSensitivity(firm, params, w, fcffs, ev, netDebt) {
    var el = document.getElementById('dcf-sensitivity');
    if (!el) return;

    var tgRange = [0.01, 0.015, 0.02, 0.025, 0.03, 0.035, 0.04];
    var waccRange = [];
    for (var d = -0.03; d <= 0.031; d += 0.01) {
      waccRange.push(w.wacc + d);
    }

    var fmtM = Financials.fmtM;

    var h = '<div class="val-table-wrap"><table class="sensitivity-table">';
    h += '<thead><tr><th class="corner">WACC \\ g</th>';
    tgRange.forEach(function(tg) { h += '<th>' + pf(tg) + '</th>'; });
    h += '</tr></thead><tbody>';

    waccRange.forEach(function(waccVal) {
      h += '<tr><td class="row-label">' + pf(waccVal) + '</td>';
      tgRange.forEach(function(tg) {
        if (waccVal <= tg || waccVal <= 0) {
          h += '<td>N/A</td>';
          return;
        }
        // Recompute TV with this WACC/tg combo, keep same FCFFs
        var pvSum = 0;
        fcffs.forEach(function(f, i) {
          pvSum += f.fcff / Math.pow(1 + waccVal, i + 1);
        });
        var lastF = fcffs[fcffs.length - 1].fcff;
        var tvLocal = lastF * (1 + tg) / (waccVal - tg);
        var pvTVLocal = tvLocal / Math.pow(1 + waccVal, 5);
        var evLocal = pvSum + pvTVLocal;
        var eqLocal = evLocal - netDebt;

        var isBase = Math.abs(waccVal - w.wacc) < 0.001 && Math.abs(tg - params.terminalGrowth) < 0.001;
        var cls = isBase ? ' class="highlight"' : '';

        if (firm.sharesOutstanding && firm.currentPrice) {
          h += '<td' + cls + '>$' + (eqLocal / firm.sharesOutstanding).toFixed(1) + '</td>';
        } else {
          h += '<td' + cls + '>' + fmtM(eqLocal) + '</td>';
        }
      });
      h += '</tr>';
    });

    h += '</tbody></table></div>';
    h += '<p class="val-help">' + (firm.sharesOutstanding ? 'Implied equity price per share.' : 'Implied equity value ($M).') + ' Highlighted cell = base case.</p>';
    el.innerHTML = h;
  }

  // ─── Helpers ───
  function slider(id, label, value, min, max, step, unit) {
    unit = unit || '%';
    var disp = unit === 'x' ? value.toFixed(2) + 'x' : pf(value);
    return '<div class="assumption-row">' +
      '<label for="' + id + '">' + label + '</label>' +
      '<input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + value + '">' +
      '<span class="unit" id="' + id + '-val">' + disp + '</span></div>';
  }

  function gv(id) {
    var s = document.getElementById(id);
    if (!s) return 0;
    var v = parseFloat(s.value);
    var d = document.getElementById(id + '-val');
    if (d) {
      if (id === 'dcf-beta') d.textContent = v.toFixed(2) + 'x';
      else d.textContent = pf(v);
    }
    return v;
  }

  function pf(v) { return (v * 100).toFixed(1) + '%'; }

  function tblRow(label, data, key, cls) {
    var fmtM = Financials.fmtM;
    var h = '<tr class="' + (cls || '') + '"><td>' + label + '</td>';
    data.forEach(function(d) { h += '<td>' + fmtM(d[key]) + '</td>'; });
    h += '</tr>';
    return h;
  }

  function summaryCard(label, value, sub, gold) {
    return '<div class="val-summary-card' + (gold ? ' gold' : '') + '">' +
      '<div class="summary-label">' + label + '</div>' +
      '<div class="summary-value">' + value + '</div>' +
      (sub ? '<div class="summary-sub">' + sub + '</div>' : '') + '</div>';
  }

  function stepLine(label, value, isTotal) {
    return '<div class="step-line' + (isTotal ? ' step-total' : '') + '">' +
      '<span class="step-label">' + label + '</span>' +
      '<span class="step-value">' + value + '</span></div>';
  }

  return {
    render: render,
    calcWACC: calcWACC
  };
})();
