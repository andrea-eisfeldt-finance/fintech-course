---
layout: default
title: Valuation Lessons
nav_exclude: true
---

# What We Learn from the Valuation Exercises

These takeaways emerge from working through the valuation tool across different firm types. They connect to case discussions throughout the course — the Unidentified Financial Firms exercise (Week 5b), the Wealthfront IPO case, SoFi's bank charter, and the broader fintech valuation landscape.

---

## 1. Financial Statement Structure Reveals the Business Model

When you load different firms into Tab 1 and compare their diagnostic ratios, patterns emerge immediately:

| Ratio | Traditional Bank (USB) | Fintech Lender (SOFI) | Payments (PYPL) | Insurance (MET) |
|-------|----------------------|---------------------|-----------------|----------------|
| Interest Inc / Total Revenue | ~75% | ~60% | ~5% | ~25% |
| Loans / Assets | ~55% | ~60% | ~10% | ~8% |
| Deposits / Liabilities | ~80% | ~60% | 0% | 0% |
| Efficiency Ratio | ~60% | ~85% | ~75% | ~90% |

**Takeaway:** The income statement tells you *how* a firm makes money (spread income vs. fee income). The balance sheet tells you *what* the firm owns and *how* it funds itself. A high interest-income share means the firm is in the business of maturity transformation and credit risk. A low share means it earns fees for services. This is the foundation of the Unidentified Firms exercise.

---

## 2. Valuation Methodology Must Match the Business

The DCF tab forces a fundamental question: what cash flows are you discounting, and at what rate?

**For banks and balance-sheet lenders:**
- Interest expense is an operating cost (like COGS), not a financing decision
- Deposits are an operating liability, not capital structure debt
- The EV-to-equity bridge is ambiguous: should you subtract deposits from enterprise value?
- If you already deducted interest expense on deposits in computing FCFF, subtracting deposits again double-counts

**For fee-driven fintechs (PayPal, Upstart marketplace model):**
- Standard FCFF/WACC works cleanly
- Debt is a financing choice, not an input to the business
- CapEx and working capital are well-defined
- The EV-to-equity bridge is straightforward

**Takeaway:** There is no single "correct" valuation framework for all financial firms. The right approach depends on whether debt is an operating input or a financing decision. This ambiguity is the point — understanding *why* bank valuation is hard is more important than getting the "right" number.

---

## 3. The Discount Rate Is Doing a Lot of Work

The sensitivity table on Tab 3 makes this viscerally clear. A 1% change in WACC can swing the implied equity value by 20–40%. The inputs that drive WACC are:

**Beta reflects systematic risk — and firm type matters enormously:**

| Category | Beta Range | Why |
|----------|-----------|-----|
| Traditional banks | 0.95 – 1.10 | Stable deposits, diversified income, regulatory guardrails |
| Fintech lenders | 1.45 – 1.75 | Credit cycle exposure, less proven models, higher growth uncertainty |
| Pre-profit fintechs | 2.10 – 2.30 | Revenue volatile, business model unproven, high equity duration |

**Illiquidity premium matters for private firms:**
- Wealthfront, as a private company, has no public market for its shares
- An illiquidity premium of 2–4% on the discount rate can reduce implied equity value by 20–30%
- This directly affects IPO pricing: what discount do investors demand for buying into an illiquid investment that will *become* liquid?
- The toggle in the tool lets you see this impact directly

**Takeaway:** Valuation is more sensitive to the discount rate than to most operating assumptions. Getting the cost of capital right — or at least understanding the range of reasonable estimates — matters more than refining revenue growth by 50 basis points.

---

## 4. Liability-Side Value Creation Is Real

The liability analysis in Tab 3 quantifies something that's often hand-waved: **the value of cheap funding**.

**Example from the tool data:**
- JPMorgan's cost of deposits: ~1.5%
- Risk-free rate (10-year Treasury): ~4.3%
- Spread advantage: ~2.8%
- Deposit base: ~$2.25 trillion
- Annual funding savings: ~$63 billion
- Capitalized value of deposit franchise: enormous

This is why:
- **SoFi pursued a bank charter** — converting from warehouse lines at ~5–6% to deposits at ~2% fundamentally changes the economics
- **Enova (no deposits) trades at a discount** to bank-chartered lenders, despite similar loan products
- **The UBS/Wealthfront acquisition** (at $1.4B) was partly about acquiring assets that could be funded on UBS's balance sheet at lower cost

**Takeaway:** For financial firms, value isn't created only on the asset side (making good loans, earning fees). It's also created on the liability side (funding cheaply). A bank charter is valuable not because of what it lets you *do* but because of how it lets you *fund* what you do. Students trained on non-financial firm valuation often miss this entirely.

---

## 5. Multiples Are Descriptive, Not Prescriptive

Tab 4 (Multiples) shows how peer selection drives the implied valuation. Select different peers, get different answers:

**SoFi valued using:**
- Bank peers (JPM, USB, COF): P/E of 10–15x → lower valuation
- Fintech peers (UPST, AFRM, LC): P/E of 20–40x → higher valuation
- Both tell you something different: is SoFi a bank that happens to have an app, or a tech company that happens to have a bank charter?

**Key multiples for financial firms:**
- **P/E** — works when firms are profitable; useless for pre-profit fintechs
- **P/B and P/TBV** — fundamental for banks (reflects ROE vs. cost of equity); goodwill-heavy fintechs distort book value
- **P/Revenue** — necessary for pre-profit firms but ignores profitability entirely

**Takeaway:** The peer group you choose is an argument about what the company *is*. Multiples don't tell you what a firm is worth — they tell you what the market is paying for firms you believe are similar. The analysis is in the peer selection, not the arithmetic.

---

## 6. Transaction Comps Reveal Market Pricing of Strategic Value

Tab 5 shows that M&A prices often differ dramatically from public market multiples:

| Transaction | EV/Revenue | Context |
|-------------|-----------|---------|
| OnDeck / Enova (2020) | 0.2x | Fire sale during COVID; distressed seller |
| Wealthfront / UBS (2022) | 10.8x | Strategic value of AUM + client base; later terminated |
| Afterpay / Block (2021) | 36.3x | Peak BNPL hype; all-stock deal |
| Discover / Capital One (2024) | 2.2x | Mature business; synergy-driven; near book value |
| Plaid / Visa (2020) | 26.5x | Infrastructure value; DOJ blocked it |

**What drives the spread:**
- **Strategic vs. financial buyer** — strategic acquirers pay for synergies (cost savings, cross-sell, data)
- **Market timing** — 2021 multiples were 5–10x higher than 2023 for similar businesses
- **Regulatory risk** — Plaid/Visa was blocked; Discover/Capital One is pending; regulatory uncertainty discounts value
- **Distress** — OnDeck sold at 0.2x revenue because it had no choice

**Takeaway:** Transaction multiples are data points about what specific buyers paid in specific circumstances. They're not benchmarks. Understanding *why* Afterpay sold at 36x revenue (peak BNPL, all-stock, frothy market) while OnDeck sold at 0.2x (COVID distress, impaired book) teaches more than the numbers themselves.

---

## 7. Fintech Valuation Is Converging Toward Financial Firm Valuation

The 2020–2021 era treated fintechs as pure technology companies: high revenue multiples, no expectation of near-term profitability, valuation driven by TAM and growth. By 2023–2025, the market repriced fintechs toward traditional financial metrics:

- **SoFi** went from 8x revenue (SPAC, 2021) to trading at bank-like P/E multiples
- **Upstart** went from $400/share to $15 and back to $72 — the market couldn't decide if it was a tech company or a lender
- **Affirm** is still pre-profit after 4+ years public — the market is losing patience with the "growth first" narrative
- **LendingClub** completed the full journey: marketplace platform → bank charter → valued like a bank

**Takeaway:** As fintechs mature, they converge toward the valuation frameworks of the industries they serve. A lending fintech eventually gets valued on NIM, provision rates, and ROE — the same metrics used for banks. The "tech premium" erodes as the business scales and the unit economics become visible. The interesting question is whether AI-native models (Upstart) or platform network effects (PayPal) justify a persistent premium, or whether they too will converge.

---

## Summary: What Makes Financial Firm Valuation Different

1. **Debt is the business** — for banks and lenders, not just a financing decision
2. **Capital structure is regulated** — not optimized by the CFO
3. **Value exists on both sides of the balance sheet** — asset quality AND funding cost
4. **The right methodology depends on the firm type** — there is no universal approach
5. **The discount rate dominates** — small changes in WACC swamp operating assumptions
6. **Peer selection is an argument** — not a mechanical exercise
7. **Market pricing changes with cycles** — 2021 multiples ≠ 2024 multiples for the same businesses

These lessons apply directly to:
- **Week 5b:** Unidentified Financial Firms (statement structure and ratio analysis)
- **Week 6:** Wealthfront IPO (private valuation, illiquidity discount, why the deal fell apart)
- **Week 7:** SoFi and Lending (bank charter economics, liability-side value)
- **Business Proposals:** Valuing your proposed fintech venture

---

*Use the [Valuation Tool]({{ site.baseurl }}/tools/valuation/) to explore these concepts interactively.*
