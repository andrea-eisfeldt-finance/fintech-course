---
layout: default
title: "Week 7: Stablecoins and Digital Currency"
parent: Weekly Schedule
nav_order: 7
---

# Week 7 — May 19: Stablecoins and Digital Currency

**Topic:** Stablecoin mechanics, stablecoin runs, CBDC design, digital currency policy

**Case Group:** None
**Business Proposal Assignment Group:** B
**Assignments Due:** Group B Incumbent Analysis Due

## Pre-class Reading

- Stablecoin Lecture slides (posted below)
- Stablecoin economics: [Catalini, de Gortari & Shah — "Some Simple Economics of Stablecoins"](https://www.annualreviews.org/doi/abs/10.1146/annurev-financial-110921-101330) (Annual Review of Financial Economics)

## Optional Reading

- Stablecoin runs: [Ma, Zeng & Zhang — "Stablecoin Runs"](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4398546) (SSRN 4398546)
- Stablecoins and banking: [Cong — "Stablecoins and Banking"](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4950002) (SSRN, 2026)
- Tokenized deposits: [Huang & Keister — "Tokenized Deposits"](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4950789) (SSRN, 2026)
- Digital currency policy: [G30 — "Digital Currencies and Stablecoins"](https://group30.org/) (Duffie)
- CBDC global tracker: [Atlantic Council CBDC Tracker](https://www.atlanticcouncil.org/cbdctracker/)
- Facebook Libra (A) case: [Facebook's Libra](https://hbsp.harvard.edu/product/120021-PDF-ENG)
- Facebook Libra (B) case: [Facebook's Libra (B)](https://www.hbs.edu/faculty/Pages/item.aspx?num=59952)

## Guest Speaker

**Juan Suarez** — Board member, Stand With Crypto; Board of Trustees, Saint John's Health Center Foundation. Formerly Vice President and Deputy General Counsel at Coinbase (2014–2022); founding member and director, Crypto Ratings Council (2019–2022).

---

## Discussion Questions

These are lecture discussion questions — no written submission required.

1. What are stablecoins, and why do they exist? What problem do they solve that traditional currencies and traditional crypto don't? Using the Catalini, de Gortari & Shah framework, explain the "simple economics" — how does seignorage revenue create equity value for stablecoin issuers, and why does the decision not to pay interest to holders matter for the economics and legal classification?

2. Construct the market value balance sheet for each of the three major stablecoin models:
   - **Tether (USDT)** — centralized, fiat-backed. What assets back USDT? How transparent are Tether's reserves, and why has this been controversial?
   - **Circle (USDC)** — centralized, fiat-backed. How does USDC differ from USDT in terms of transparency and regulatory posture? What happened to USDC during the SVB collapse (March 2023), and what does this reveal about run risk?
   - **DAI (MakerDAO)** — decentralized, crypto-collateralized. How does the 150% collateralization ratio work? What happens during liquidation events?

   Using current data from CoinMarketCap, compare market capitalizations and market shares. Which model is winning, and why?

3. Explain how Terra/Luna's algorithmic stablecoin (UST) worked — and why it collapsed in May 2022. Using Makarov & Schoar's "Anatomy of a Run," describe the death spiral mechanism. What are the parallels between Terra's collapse and traditional bank runs? What does this teach about the viability of algorithmic (undercollateralized) stablecoins?

4. Ma, Zeng & Zhang model the key tradeoff in stablecoin design: more arbitrageurs lead to lower price deviations during normal times but may increase run risk during stress. Explain this tradeoff intuitively. How does it apply to USDC's 15% depeg during the SVB collapse? Does increasing the number of authorized redeemers make stablecoins safer or more fragile?

5. What are the major use cases for stablecoins today? Consider: crypto trading (on/off ramps), remittances and cross-border payments, DeFi collateral and liquidity, programmable money and smart contract settlement, and financial inclusion in countries with unstable local currencies. Using data from stablecoin transaction volumes on major blockchains, which use cases dominate? Are stablecoins primarily a crypto-native tool, or are they finding mainstream adoption?

6. Gorton & Zhang ("Taming Wildcat Stablecoins") draw parallels between today's stablecoins and 19th-century private banknotes. What are the similarities and differences? Why do they argue stablecoins should be regulated like narrow banks or money market funds? What would the consequences be for DeFi if stablecoins were subject to banking regulation?

7. Central Bank Digital Currencies (CBDCs): Using the [Atlantic Council CBDC Tracker](https://www.atlanticcouncil.org/cbdctracker/), how many countries are actively exploring or have launched CBDCs? What are the key design choices — retail vs. wholesale, account-based vs. token-based, intermediated vs. direct? Why has the U.S. been slower than China (digital yuan) or the EU (digital euro) to pursue a CBDC? Using Huang & Keister and Cong, what are the potential impacts of CBDCs on commercial bank deposits, monetary policy transmission, and financial privacy?

8. The U.S. stablecoin regulatory landscape is evolving rapidly. What legislation has been proposed or passed (e.g., the GENIUS Act, Lummis-Gillibrand)? How would requiring stablecoin issuers to hold 1:1 reserves in Treasuries or bank deposits affect the economics of issuance? Consider the implications for Tether (offshore, opaque reserves) vs. Circle (onshore, regulated). Could regulation paradoxically benefit stablecoins by providing legitimacy and enabling broader adoption?

---

## Slide Outlines

### Deck 7: Stablecoins & Digital Currency (~28 slides)

| # | Title | Content |
|---|-------|---------|
| 1 | Title | Week 7: Stablecoins & Digital Currency |
| 2 | Why Stablecoins? | The need for price stability in crypto; use cases overview |
| 3 | Outline | Overview, models/types, examples, runs, CBDCs, regulation |
| 4 | Stablecoin Market Overview | CoinMarketCap stablecoin market cap chart; growth trajectory |
| 5 | Catalini, de Gortari & Shah | Simple economics — seignorage, no interest payments, legal classification |
| 6–7 | Three Stablecoin Models | Centralized fiat-backed (USDT, USDC), decentralized collateralized (DAI), algorithmic (Terra — defunct); comparison table |
| 8–9 | Tether & Circle Balance Sheets | Market value balance sheets; asset composition; transparency comparison |
| 10 | USDC and SVB: Run in Real Time | March 2023 depeg — 15% drop; timeline; Circle's $3.3B exposure to SVB |
| 11–12 | DAI / MakerDAO Mechanics | CDP, 150% collateral, liquidation, governance; multi-collateral DAI |
| 13–14 | Terra/Luna Collapse | Algorithmic design; death spiral mechanism; Makarov & Schoar anatomy of run; $40B → $0 |
| 15 | Ma, Zeng & Zhang: Run Tradeoff | More arbitrageurs = lower normal deviations but higher run risk; graph |
| 16 | d'Avernas & Vandewyer | Stablecoin pricing and depegging dynamics |
| 17 | Ethena USDe | Synthetic dollar via delta-neutral crypto positions; market value balance sheet |
| 18 | Gorton & Zhang: Wildcat Stablecoins | Historical parallel to private banknotes; case for regulation |
| 19 | Stablecoin Use Cases Data | Transaction volumes by use case; on-chain data from major blockchains |
| 20 | Coinbase White Paper | Stablecoin infrastructure vision; payments, savings, programmability |
| 21–22 | CBDCs: Global Landscape | Atlantic Council tracker; design choices (retail vs. wholesale); who's ahead |
| 23 | Huang & Keister: Tokenized Deposits | Disintermediation risk; impact on bank deposits and monetary policy |
| 24 | Cong: Stablecoins and Banking | How stablecoins interact with traditional banking system |
| 25–26 | U.S. Stablecoin Regulation | GENIUS Act, Lummis-Gillibrand; reserve requirements; onshore vs. offshore |
| 27 | G30 / Duffie Perspective | Digital currency policy recommendations |
| 28 | Discussion & Guest Speaker | Key questions for Juan Suarez; crypto regulation from inside Coinbase |
