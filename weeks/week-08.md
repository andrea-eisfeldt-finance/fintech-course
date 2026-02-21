---
layout: default
title: "Week 8: Tokenization & Fluidity"
parent: Weekly Schedule
nav_order: 8
---

# Week 8 — May 26: Tokenization & Fluidity

**Topic:** Tokenization of real estate assets, blockchain-based securities issuance, fractional ownership, liquidity in private markets

## Case

**Fluidity: The Tokenization of Real Estate Assets** (Di Maggio, Lane & Ma) — [HBS Case Pack](https://hbsp.harvard.edu/import/1387361)

*Fluidity was a Brooklyn-based blockchain startup (founded 2017 by Michael Oved, formerly of Virtu Financial) that attempted to tokenize a 12-unit Manhattan luxury condo (~$30M) into debt and equity tokens via a partnership with broker-dealer Propellr. The deal was quietly shelved in summer 2019 — making this a rich case for discussing both the promise and practical barriers to real asset tokenization. Since then, the broader RWA tokenization market has grown dramatically to $36B+ by late 2025, with major institutions like BlackRock now launching tokenized funds.*

**Case Group:** B
**Business Proposal Assignment Group:** None
**Assignments Due:** Group B Fluidity

## Pre-class Reading

- Fluidity case (HBS Case Pack link above)

## Optional Reading

- Tokenized real estate forecast: [Deloitte 2025 — Tokenized Real Estate](https://www.deloitte.com/us/en/insights/industry/financial-services/financial-services-industry-predictions/2025/tokenized-real-estate.html) — projects $4T by 2035
- Security token offerings: [Lambert, Liebau & Roosenboom — "Security Token Offerings"](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3634626) (SSRN 3634626)
- Tokenized real estate market maturation: [Bergkamp, Sifat & Swinkels — "Market Maturation and Democratization"](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5195172) (SSRN 5195172, 2025)
- Secondary market limits for tokens: [Ebadi — "Real Estate Tokenization: From Theory to Practice"](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5366013) (SSRN 5366013, 2025)
- Real-time tokenized asset data: [RWA.xyz Dashboard](https://app.rwa.xyz/)
- Postmortem on Fluidity deal: [CoinDesk — Tokenized Real Estate Falters](https://www.coindesk.com/business/2019/11/26/tokenized-real-estate-falters-as-another-hyped-deal-falls-apart/)
- BlackRock institutional tokenization: [BlackRock BUIDL Fund](https://finance.yahoo.com/news/rwa-called-pipe-dream-then-110000727.html)
- Tokenization framework: [IMF — "Tokenization and Financial Market Inefficiencies" (2025)](https://www.imf.org/en/publications/fintech-notes/issues/2025/01/29/tokenization-and-financial-market-inefficiencies-561256)
- Regulatory perspective: [IOSCO — Tokenization of Financial Assets (2025)](https://www.iosco.org/library/pubdocs/pdf/IOSCOPD809.pdf)
- Financial stability analysis: [FSB — Financial Stability Implications of Tokenisation (2024)](https://www.fsb.org/uploads/P221024-2.pdf)

## Guest Speaker

None

---

## Case Questions

See the [Case Assignment Guidelines]({% link case-guidelines.md %}) for format and grading details.

1. Describe the traditional commercial real estate (CRE) financing market. Who are the key participants (developers, banks, institutional investors, REITs), and what are the major frictions — illiquidity, high minimum investment, intermediary fees, slow settlement, geographic barriers to investor participation? Quantify where possible: what is a typical CRE loan rate, minimum investment size, and transaction timeline?

2. Describe Fluidity's business model. What specific frictions is Fluidity trying to solve with tokenization?
   - How does Fluidity make money?
   - What is Propellr's role, and why is a broker-dealer partner essential for regulatory compliance (AML/KYC, securities law)?
   - How does the "Two Token Waterfall" (A-tokens for debt, B-tokens for preferred equity) restructure the CRE capital stack?
   - How does tokenized financing compare to traditional bank financing for the Thirteen East+West deal? (6.7% coupon vs. 10–18% bank rate, $25K minimum vs. typical institutional minimums)

3. What are the similarities and differences between cryptocurrencies, tokens, and ICOs?
   - What is a utility token vs. a security token? Why does the distinction matter for regulation?
   - How are tokens different from traditional debt or equity? What do token holders actually own in the Fluidity structure — and critically, are the tokens collateralized by the underlying real estate?
   - Why does capital structure matter, and what market frictions make tokens potentially add value to the capital structure?

4. Describe the market for digital token and coin exchanges at the time of the case.
   - What are the key differences between centralized exchanges (Coinbase, Binance) and decentralized exchanges?
   - Describe AirSwap (Fluidity's P2P trading network). How is it unique, and why did Fluidity build its own exchange rather than use an existing one?
   - What are the pros and cons of a decentralized secondary market for tokenized real estate?

5. The Fluidity/Propellr deal collapsed in summer 2019. The $3B in expressions of interest turned out to include mostly developers who couldn't get traditional financing — a classic adverse selection problem. What went wrong? Specifically:
   - Why did institutional investors stay away?
   - How does the "chicken and egg" liquidity problem apply — tokens are only valuable if there's a liquid secondary market, but a secondary market only develops if there are enough tokens?
   - What lessons does this teach about the difference between technological feasibility and market readiness?

6. The tokenization landscape has evolved dramatically since Fluidity's failure. Compare Fluidity's 2018 approach to current platforms:
   - **RealT** — fractional tokenized rental properties on Ethereum, $50 minimum, daily stablecoin dividends, $100M+ tokenized
   - **Lofty** — tokenized rental homes, instant yield, retail-accessible
   - **BlackRock BUIDL** — tokenized Treasury/money market fund, $500M+ AUM, institutional-grade
   - **Figure Technologies** — blockchain-based HELOCs ($10B+ originated on Provenance blockchain, IPO at ~$4B)
   - What has changed in infrastructure, regulation, and institutional appetite that allows these platforms to succeed where Fluidity failed?

7. Using data from [RWA.xyz](https://app.rwa.xyz/), analyze the current state of tokenized assets. The dashboard tracks 400+ tokenized assets across categories including:
   - **Private credit** (~$19B active value, $34B cumulative originations)
   - **U.S. Treasuries** (~$9B)
   - **Commodities/gold** (~$3.5B)
   - **Institutional funds** (~$3B)
   - **Real estate** (smaller share — why?)

   Pull the current data and create a visualization showing the breakdown by asset class. Why has private credit dominated tokenization while real estate — the asset Fluidity targeted — has lagged? Consider: standardization of cash flows, legal complexity of property rights, valuation transparency, regulatory clarity, and investor familiarity.

8. Not all assets are equally suited for tokenization. Using the IMF's framework from ["Tokenization and Financial Market Inefficiencies" (2025)](https://www.imf.org/en/publications/fintech-notes/issues/2025/01/29/tokenization-and-financial-market-inefficiencies-561256), analyze the asset lifecycle — issuance, exchange, servicing, and redemption — for each of the following asset types. For each, assess whether tokenization meaningfully reduces frictions or introduces new risks:

   | Asset Type | Current Friction | Tokenization Benefit | Remaining/New Risk |
   |-----------|-----------------|---------------------|-------------------|
   | U.S. Treasuries | Already liquid, settlement T+1 | Instant settlement, 24/7 trading, global access | Low friction to begin with — incremental gain |
   | Private credit | Illiquid, opaque, high minimums | Fractional ownership, automated coupons, transparent cash flows | Credit risk persists; valuation subjective |
   | Commercial real estate | Highly illiquid, large lots, complex legal title | Fractional access, global investors, reduced intermediary costs | Property rights hard to encode on-chain; adverse selection |
   | Art / collectibles | Extremely illiquid, subjective valuation | Fractional ownership of high-value pieces | Valuation opaque, storage/insurance, thin markets |
   | Equities | Already highly liquid, low-cost | Marginal benefit | Regulatory duplication, unclear benefit |

   Which assets have the highest "tokenization premium"? Why does the data from RWA.xyz confirm (or contradict) your analysis?

9. If you were launching a real estate tokenization platform today, how would you design it differently from Fluidity? Consider:
   - Asset selection (residential vs. commercial vs. debt vs. equity)
   - Token structure (collateralized or not? Debt, equity, or hybrid?)
   - Regulatory strategy (SEC-registered securities, Reg D, Reg A+, international)
   - Technology stack (which blockchain, how to handle compliance in smart contracts)
   - Distribution (institutional vs. retail, embedded vs. standalone)
   - How could AI assist with property valuation, due diligence, investor matching, and compliance automation?

---

## Slide Outlines

### Deck 8: Tokenization & Fluidity Case Discussion (~24 slides)

| # | Title | Content |
|---|-------|---------|
| 1 | Title | Week 8: Tokenization & Fluidity |
| 2 | Discussion Opener | RWA.xyz dashboard screenshot — $36B+ tokenized; where did this come from? |
| 3–4 | CRE Financing Landscape | Traditional players (banks, REITs, CMBS, PE); frictions — illiquidity, high minimums, slow settlement; typical rates and timelines |
| 5 | Tokenization: What Is It? | Distinguish from stablecoins and crypto; tokens as digital wrappers on real assets |
| 6 | Types of Tokens | Payment, governance, utility, security tokens; the Howey test |
| 7 | ICO Boom and Bust | Case Exhibit 2; peak May 2018 → SEC enforcement → pivot to STOs |
| 8–9 | Fluidity's Business Model | Two Token Waterfall (A-tokens debt, B-tokens preferred equity); Propellr as broker-dealer; AirSwap P2P exchange; 6.7% vs. 10-18% bank rate |
| 10 | The Deal: 13 East+West | 12-unit Manhattan condo, $34M appraised, $25M raise, 73.5% LTV |
| 11–12 | What Went Wrong | $3B interest → adverse selection; no direct collateral; institutional investors stayed away; chicken-and-egg liquidity; deal shelved 2019 |
| 13 | Lessons from Failure | Technological feasibility ≠ market readiness; adverse selection in new markets; need for institutional credibility |
| 14–15 | Tokenization Since Fluidity | Timeline: 2019 → DeFi summer → BlackRock enters → institutional adoption; RWA market growth chart |
| 16 | Current Platforms Comparison | RealT, Lofty, BlackRock BUIDL, Figure Technologies; what changed? |
| 17–18 | RWA.xyz Data Analysis | Breakdown by asset class: private credit $19B, Treasuries $9B, commodities $3.5B, real estate lagging; why? |
| 19–20 | IMF Framework: Which Assets Tokenize Best? | Asset lifecycle analysis; tokenization premium by asset type; table from Q8 |
| 21 | Why Real Estate Lags | Property rights hard to encode; legal complexity; valuation subjectivity; local regulation |
| 22 | Academic Perspectives | Lambert et al. on STOs; Bergkamp et al. on democratization; Ebadi on secondary market limits |
| 23 | Q9: Build a Better Platform | Design exercise discussion — asset selection, token structure, regulatory strategy, AI applications |
| 24 | Key Takeaways | Tokenization solves real frictions but faces adverse selection and liquidity bootstrapping; institutional entry is the inflection; not all assets benefit equally |
