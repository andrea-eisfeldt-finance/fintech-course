---
layout: default
title: "Week 6: Crypto and Blockchain"
parent: Weekly Schedule
nav_order: 6
---

# Week 6 — May 12: Crypto and Blockchain

**Topic:** Blockchain economics, crypto trading, DeFi, token governance, MEV

**Case Group:** None
**Business Proposal Assignment Group:** A
**Assignments Due:** Group A Incumbent Analysis Due

## Pre-class Reading

- CryptoFinance Lecture slides (posted below)

## Optional Reading

- Blockchain economics: [Catalini & Gans — "Some Simple Economics of the Blockchain"](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2874598) (SSRN)
- Cryptocurrency trading: [Makarov & Schoar — "Trading and Arbitrage in Cryptocurrency Markets"](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3171204) (SSRN)
- DeFi overview: [Harvey, Ramachandran & Santoro — "DeFi and the Future of Finance"](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3711777) (SSRN)
- Proof of Stake economics: [Fanti, Kogan & Viswanath — "Economics of Proof-of-Stake"](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4214354) (SSRN)
- Trust and blockchain: [Budish — "Trust at Scale"](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4148014) (SSRN / QJE)
- Data privacy in blockchain: [Chen, Huang, Ouyang & Xiong — "The Data Privacy Paradox"](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3856834) (SSRN)
- Bitcoin reference text: [Narayanan et al. — *Bitcoin and Cryptocurrency Technologies*](https://www.amazon.com/Bitcoin-Cryptocurrency-Technologies-Comprehensive-Introduction/dp/0691171696)
- Crypto research roundup: [SSRN Blog — Crypto Research](https://www.ssrn.com/index.cfm/en/)
- MEV foundational paper: [Daian et al. — "Flash Boys 2.0"](https://arxiv.org/abs/1904.05234) (arXiv)
- Current MEV analysis: [ESMA — MEV Report (July 2025)](https://www.esma.europa.eu/)

## Guest Speaker

None

---

## Discussion Questions

These are lecture discussion questions — no written submission required.

1. Explain how a cryptographic hash function works and why the three properties — collision resistance, hiding, and puzzle friendliness — are essential for Bitcoin's security. What is the "proof of work" consensus mechanism, and why does it require enormous computational resources? Using current data from [Bitinfocharts](https://bitinfocharts.com/bitcoin/) or [Cambridge Bitcoin Electricity Consumption Index](https://ccaf.io/cbnsi/cbeci), how much energy does Bitcoin mining currently consume, and how has the energy mix evolved since the 2021 China mining ban?

2. Bitcoin's supply is capped at 21 million coins, with block rewards halving approximately every four years. Using data from [bitcoinblockhalf.com](https://www.bitcoinblockhalf.com/), when was the most recent halving, and what was the price impact? Construct a supply-and-demand framework: if demand grows but new supply falls by 50% at each halving, what does this predict for price dynamics? Does Bitcoin behave more like digital gold, a speculative asset, or a currency? Use price and volatility data from CoinGecko to support your argument.

3. Ethereum introduced smart contracts — self-executing code on the blockchain. What are the key differences between Bitcoin and Ethereum in terms of purpose, consensus mechanism (PoW vs. PoS since "The Merge" in September 2022), and ecosystem? Using Catalini & Gans's framework, explain how blockchain reduces (a) the cost of verification and (b) the cost of networking. Give a concrete financial services example for each.

4. Explain the concept of DeFi (Decentralized Finance). Using Harvey et al. as a reference:
   - What are the main DeFi primitives (lending/borrowing, DEXs, derivatives, yield farming)?
   - How do automated market makers (AMMs) like Uniswap work, and how do they differ from traditional order-book exchanges?
   - What is Total Value Locked (TVL)? Pull current TVL data from [DeFi Llama](https://defillama.com/) and compare to the 2021 peak. What happened to DeFi after the Terra/Luna collapse and FTX failure?

5. What is MEV (Maximal Extractable Value)? Using Daian et al. ("Flash Boys 2.0") and the ESMA report:
   - How do validators extract value from transaction ordering (front-running, sandwich attacks, arbitrage)?
   - Why is MEV a fundamental tension between blockchain's promise of fairness and the reality of information advantages?
   - How does MEV in crypto compare to front-running concerns in traditional equity markets?

6. Makarov & Schoar document large, persistent price differences for Bitcoin across exchanges and countries. What explains these arbitrage opportunities — capital controls, transaction costs, counterparty risk, or market segmentation? Why don't arbitrageurs eliminate these gaps? What does this tell you about how "efficient" crypto markets actually are compared to traditional financial markets?

7. Budish ("Trust at Scale") argues that the cost of maintaining trust on a proof-of-work blockchain scales with the value secured on it, creating fundamental economic limits. Summarize his argument. What are the implications for whether blockchain can support large-scale financial infrastructure? Does proof of stake solve this problem, or create new ones?

8. Since the 2022–23 crypto crash (Terra/Luna, FTX, Celsius, BlockFi), how has the regulatory landscape for crypto in the U.S. changed? Consider SEC enforcement actions, the approval of spot Bitcoin ETFs (January 2024), and recent congressional proposals. Using current data, compare total crypto market capitalization today to the November 2021 peak. Where has institutional adoption accelerated, and where has it stalled?

---

## Slide Outlines

### Deck 6: CryptoFinance (~30 slides)

| # | Title | Content |
|---|-------|---------|
| 1 | Title | Week 6: CryptoFinance |
| 2 | Discussion Opener | Coinmarketcap.com screenshot — current total market cap vs. 2021 peak |
| 3 | Crypto Summary Table | Major coins: BTC, ETH, BNB, USDT, SOL, ADA — type, founded, current market cap |
| 4–5 | Cryptographic Hash Functions | SHA-256; collision resistance, hiding, puzzle friendliness; interactive demo link |
| 6 | Hexadecimal System | Base 16; 256-bit hash = 64 hex digits; why this matters for blockchain |
| 7 | Blockchain Demo | andersbrownworth.com/blockchain — blocks, mining, distributed ledger |
| 8–9 | Bitcoin Mechanics | Mining, proof of work, block rewards, halvings; energy consumption data |
| 10 | Bitcoin Halving & Price | Historical halving dates and price trajectories; 2024 halving data |
| 11 | Catalini & Gans Framework | Cost of verification + cost of networking; how blockchain reduces both |
| 12–13 | Bitcoin vs. Ethereum | Purpose, consensus, smart contracts; The Merge (Sept 2022) to PoS |
| 14–15 | DeFi Overview | Lending (Aave, Compound), DEXs (Uniswap AMMs), derivatives; TVL chart from DeFi Llama |
| 16 | DeFi: How AMMs Work | Constant product formula x*y=k; liquidity pools vs. order books |
| 17–18 | Crypto Market Structure | Exchanges (centralized vs. DEX); Makarov & Schoar arbitrage findings; price gaps |
| 19 | MEV: Flash Boys 2.0 | Front-running, sandwich attacks, arbitrage extraction; ESMA findings |
| 20 | Budish: Trust at Scale | Core argument — security cost scales with value; economic limits of PoW |
| 21 | Proof of Stake Economics | Fanti, Kogan & Viswanath; staking yields, validator economics, centralization risk |
| 22–23 | Crypto Crashes & Lessons | 2022 timeline: Terra/Luna → 3AC → Celsius → FTX; $2T → $800B; what survived |
| 24–25 | Regulation Post-Crash | SEC enforcement vs. legislation; spot Bitcoin ETFs (Jan 2024); FIT21; global approaches |
| 26 | Institutional Adoption | BlackRock, Fidelity spot ETFs; JPM Onyx; Goldman crypto desk; custody solutions |
| 27 | Data Privacy Paradox | Chen et al. — transparent ledger vs. privacy; zero-knowledge proofs |
| 28–29 | Crypto Market Data Exercise | Pull from CoinGecko/CoinMarketCap: market cap trends, dominance, correlations |
| 30 | Discussion | Where does crypto create genuine economic value vs. speculation? What's the killer app? |
