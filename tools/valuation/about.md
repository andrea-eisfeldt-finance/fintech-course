---
layout: default
title: How It Was Built
parent: Valuation Tool
grand_parent: Resources
nav_order: 1
---

# How This Valuation Tool Was Built

{: .warning }
> **Disclaimer:** This tool was built by [Claude Code](https://claude.ai/claude-code) (Anthropic's AI coding assistant) in collaboration with Professor Eisfeldt. It may contain errors in financial data, calculations, or modeling assumptions. All financial figures are approximate and drawn from public SEC filings for educational purposes only. **Always verify against primary sources** ([SEC EDGAR](https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany), company 10-K filings, Bloomberg, Capital IQ) before using any figures for investment decisions or professional analysis.

---

## Why Build This?

MBA students learn valuation from textbooks and spreadsheets, but the connection between financial statement structure, valuation methodology, and firm type is often lost in static Excel models. This tool lets you:

1. **See how financial statements differ** across banks, fintechs, insurers, and payment companies — all in the same standardized format
2. **Change assumptions and see valuations update instantly** — no circular references or broken formulas
3. **Compare methods side by side** — DCF, multiples, and transaction comps for the same firm
4. **Understand capital structure** — how enterprise value divides between debt and equity, and why liability-side value creation matters for financial firms

---

## The Prompt-to-Tool Process

This entire tool — HTML, CSS, JavaScript, financial data, and documentation — was generated through a series of conversational prompts with Claude Code. Here is how the process worked, and how you could replicate it for your own projects.

### Step 1: Define the Problem and Scope

The initial prompt described the pedagogical goal: students need a hands-on tool to build pro forma financials and value finance/fintech firms using multiple methods. The prompt specified:

- **Firms to include** (drawn from the Unidentified Financial Firms case)
- **Three valuation methods** (DCF, multiples, transaction comps)
- **Financial statement categories** (standardized across all firm types)
- **Technical constraints** (pure client-side, no server, hosted on GitHub Pages)

**Lesson:** Be specific about what you want, what constraints exist, and who the audience is. Vague prompts produce vague tools.

### Step 2: Plan the Architecture

Before writing any code, we planned:

- **File structure:** Separate JS modules for each tab (financials, pro forma, DCF, multiples, transactions) plus shared utilities (charts, data)
- **Data format:** JSON files with standardized income statement and balance sheet categories across all firms
- **Tech stack:** Vanilla JavaScript (no React/Vue — keep it simple, no build step), Chart.js for visualizations, CSS with UCLA branding variables

**Lesson:** Architecture decisions happen before code. The choice to use vanilla JS instead of a framework was deliberate — it means any student can read the source code without knowing React. The choice to use JSON data files means students can inspect and modify the underlying data.

### Step 3: Build the Data Layer

The financial data required the most judgment. For each of the 14 pre-loaded firms, we needed:

- 3 years of income statement data, mapped to standardized categories
- 3 years of balance sheet data, same treatment
- Market data (share price, shares outstanding, beta)

**Key decisions:**
- **Standardized categories across firm types.** A bank's "interest income on loans" and a fintech's equivalent get the same field name. This is what makes the Unidentified Firms exercise work — you can compare structures.
- **Approximate figures, not exact.** The data is drawn from 10-K filings but rounded and simplified. For Wealthfront (private), we used S-1 filing data. Precision to the dollar would give false confidence — the pedagogical value is in the ratios and relationships, not the exact numbers.
- **Betas reflect systematic risk differences.** MetLife (0.95) has lower systematic risk than Affirm (2.30). The table in the DCF tab explains why.

**Lesson:** Data quality determines tool quality. Garbage in, garbage out. But for teaching, *approximately right* data that illustrates the right concepts is more valuable than perfectly precise data that obscures the lesson.

### Step 4: Build Iteratively, with Course Corrections

The tool was not built in one pass. The conversation included several important redirections:

1. **First version used equity cash flows (Damodaran approach)** — discounting equity cash flows at the cost of equity, skipping enterprise value entirely. This is defensible for banks but wrong for SaaS fintechs (PayPal, Zillow, Upstart). More importantly, it skipped the capital structure discussion entirely.

2. **Professor Eisfeldt redirected:** "I don't want to value only equity. I want to value the entire enterprise first, then discuss IPO or equity value. I want to discuss capital structure and value creation on the liability side." This led to a complete rebuild of the DCF tab around FCFF → WACC → Enterprise Value → Capital Structure Bridge → Equity Value.

3. **Illiquidity premium was added** as an additive adjustment to the discount rate (not a beta modification), with auto-detection for small-cap and private firms.

**Lesson:** The first version of anything is wrong. The value of iterative building is that domain experts (the professor) can redirect the tool toward the right pedagogy. AI generates fast; humans provide judgment.

### Step 5: Decisions That Required Finance Expertise

Several decisions could not be made by the AI alone:

| Decision | Options Considered | Choice Made | Why |
|----------|-------------------|-------------|-----|
| Valuation framework | Equity CF only vs. Enterprise value first | Enterprise value (FCFF/WACC) | Enables capital structure and liability-side analysis |
| Discount rate | CAPM only vs. CAPM + illiquidity | CAPM + toggleable illiquidity premium | Private firms (Wealthfront) and small caps need the adjustment |
| Illiquidity adjustment | Increase beta vs. additive premium on Ke | Additive premium on discount rate | Cleaner — illiquidity is not systematic risk, it's a separate friction |
| Deposits in EV bridge | Subtract deposits vs. leave in operating | Leave as discussion question | This is the key teaching point — the tool highlights the ambiguity |
| Data precision | Exact 10-K figures vs. approximate | Approximate | Pedagogical tool, not Bloomberg terminal |

---

## Technical Architecture

### File Structure
```
tools/valuation/
├── index.md                     # Jekyll page (loads the tool)
├── about.md                     # This page
├── lessons.md                   # Valuation lessons summary
├── css/
│   └── valuation.css            # UCLA-branded styles
├── js/
│   ├── app.js                   # Main app shell, tab management, company selector
│   ├── financials.js            # Tab 1: Historical IS/BS display, diagnostic ratios
│   ├── proforma.js              # Tab 2: 5-year projection engine with sliders
│   ├── dcf.js                   # Tab 3: FCFF/WACC, EV bridge, liability analysis
│   ├── multiples.js             # Tab 4: Peer selection, comparable multiples
│   ├── transactions.js          # Tab 5: M&A/IPO transaction database
│   └── charts.js                # Chart.js wrapper (bar, line, football field)
└── data/
    ├── firms.json.js            # 14 firms × 3 years of financials
    └── transactions.json.js     # 18 M&A/IPO transactions (2020–2025)
```

### How the Code Works

**Data flow:**
1. `firms.json.js` and `transactions.json.js` load as global variables (`FIRMS_DATA`, `TRANSACTIONS_DATA`)
2. User selects a firm from the dropdown → `app.js` passes the firm object to the active tab's render function
3. Each tab module (e.g., `dcf.js`) reads the firm data, computes derived values, renders HTML tables and Chart.js visualizations
4. Sliders and inputs trigger recomputation — everything updates in the browser, no server calls

**Key patterns:**
- **Module pattern:** Each JS file is an IIFE (Immediately Invoked Function Expression) that returns a public API. This avoids polluting the global namespace.
- **No framework:** Vanilla JS with string-based HTML rendering. This is intentionally simple — students can view source and understand what's happening.
- **Responsive design:** CSS grid and flexbox with media queries for mobile. Tables scroll horizontally on small screens.

### How to Modify This Tool

**To add a new firm:**
1. Open `data/firms.json.js`
2. Add a new entry following the existing structure (income statement + balance sheet + metadata)
3. The firm will appear automatically in the dropdown, grouped by sector

**To add a new transaction:**
1. Open `data/transactions.json.js`
2. Add a new object with date, target, acquirer, sector, deal value, and implied multiples
3. It will appear in the Transaction Comps tab automatically

**To change the valuation methodology:**
1. The DCF logic lives in `js/dcf.js`
2. The `calcWACC()` function computes WACC from inputs
3. The `renderAll()` function runs the full FCFF → EV → equity bridge
4. Modify these functions to change how valuation works

---

## How to Build Your Own AI-Generated Tool

If you want to build something similar for a different course or application:

### 1. Start with the Pedagogy, Not the Technology
What do you want students to *learn*? What exercise do you want them to *do*? The tool should serve the learning objective, not the other way around.

### 2. Specify Constraints Clearly
Tell the AI:
- Who is the audience (MBA students, not software engineers)
- Where it will be hosted (GitHub Pages = no server)
- What data is available (public filings, not proprietary databases)
- What level of precision you need (educational vs. production)

### 3. Use Domain Expertise to Redirect
The AI will make plausible-sounding but sometimes wrong methodological choices. You need to catch these. In our case:
- The initial equity-only DCF approach was a reasonable default but wrong for our pedagogical goal
- The illiquidity premium as a beta adjustment vs. additive premium is a subtle but important distinction
- Whether to subtract deposits from enterprise value is genuinely ambiguous — the right choice was to flag it as a discussion question

### 4. Verify the Output
- Check the financial data against actual filings
- Run sanity checks on valuations (does JPMorgan's implied value make sense?)
- Test edge cases (what happens with negative net income? private firms?)
- Have students try to break it

### 5. Document Everything
Future you (and your students) will want to know why decisions were made. This page exists because documentation is as important as code.

---

## Tools Used

| Tool | Purpose |
|------|---------|
| [Claude Code](https://claude.ai/claude-code) | AI coding assistant that generated all HTML, CSS, JS, and data files |
| [Jekyll](https://jekyllrb.com/) | Static site generator (powers the course website) |
| [GitHub Pages](https://pages.github.com/) | Free hosting for the course site |
| [Chart.js](https://www.chartjs.org/) | Open-source charting library (loaded from CDN) |
| [just-the-docs](https://just-the-docs.github.io/just-the-docs/) | Jekyll theme for documentation sites |

---

*Last updated: February 2026*
