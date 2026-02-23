// Pre-loaded firm financial data (3 years, $ millions unless noted)
// Sources: SEC 10-K filings, S-1 filings. Data standardized to common categories.
// All figures approximate for educational use.
var FIRMS_DATA = {

"JPM": {
  name: "JPMorgan Chase",
  ticker: "JPM",
  sector: "Banking",
  caseType: "Global banking entity",
  sharesOutstanding: 2870, // millions
  currentPrice: 245,
  beta: 1.10,
  description: "Largest US bank by assets. Diversified across consumer banking, investment banking, asset management, and commercial banking.",
  years: [2022, 2023, 2024],
  incomeStatement: {
    interestIncome: {
      loansAndLeases:    [60000, 95000, 100000],
      investmentSecurities: [16000, 18000, 20000],
      otherInterest:     [10000, 15000, 16800]
    },
    interestExpense: {
      deposits:          [5200, 22000, 25000],
      borrowings:        [8800, 15500, 17000]
    },
    provisionForCreditLosses: [6389, 9800, 11200],
    nonInterestIncome: {
      serviceChargesAndFees: [7200, 7800, 8500],
      tradingRevenue:    [28000, 30000, 33000],
      advisoryFees:      [10000, 12000, 14000],
      technologyPlatformFees: [0, 0, 0],
      gainOnSaleOfLoans: [500, 400, 350],
      otherNonInterest:  [8000, 10000, 12500]
    },
    nonInterestExpense: {
      compensationAndBenefits: [43000, 45500, 47500],
      technologyAndComm: [10000, 11500, 12500],
      occupancyAndEquipment: [5000, 5300, 5500],
      marketingAndAcquisition: [3500, 3800, 4000],
      otherOperating:    [16000, 17500, 18500]
    },
    incomeTaxExpense: [8200, 12000, 12750]
  },
  balanceSheet: {
    assets: {
      cashAndEquivalents:   [567236, 538600, 510000],
      investmentSecurities: [625600, 598000, 585000],
      loansAndLeases:       [1070800, 1113000, 1145000],
      tradingAssets:        [425000, 445000, 460000],
      intangiblesGoodwill:  [52000, 52500, 53000],
      technologyAssets:     [0, 0, 0],
      otherAssets:          [620000, 644000, 649000]
    },
    liabilities: {
      deposits:            [2340000, 2290000, 2250000],
      shortTermBorrowings: [175000, 190000, 200000],
      longTermDebt:        [290000, 310000, 325000],
      tradingLiabilities:  [175000, 185000, 195000],
      otherLiabilities:    [145000, 150000, 155000]
    },
    equity: {
      commonEquity:        [215000, 225000, 232000],
      retainedEarnings:    [35636, 53100, 55000],
      aoci:                [-15000, -12000, -10000]
    }
  }
},

"GS": {
  name: "Goldman Sachs",
  ticker: "GS",
  sector: "Investment Banking",
  caseType: "Global investment bank",
  sharesOutstanding: 340, // millions
  currentPrice: 590,
  beta: 1.35,
  description: "Leading global investment bank and financial services firm. Revenue driven by advisory, trading, and asset management fees.",
  years: [2022, 2023, 2024],
  incomeStatement: {
    interestIncome: {
      loansAndLeases:    [8200, 10500, 11000],
      investmentSecurities: [5600, 6200, 6500],
      otherInterest:     [3800, 5100, 5400]
    },
    interestExpense: {
      deposits:          [2800, 7200, 8000],
      borrowings:        [6400, 8500, 9000]
    },
    provisionForCreditLosses: [2715, 1028, 900],
    nonInterestIncome: {
      serviceChargesAndFees: [1200, 1400, 1500],
      tradingRevenue:    [18900, 18000, 20000],
      advisoryFees:      [9500, 9500, 11500],
      technologyPlatformFees: [1500, 1700, 1900],
      gainOnSaleOfLoans: [300, 200, 250],
      otherNonInterest:  [3800, 4500, 5000]
    },
    nonInterestExpense: {
      compensationAndBenefits: [15500, 15500, 16500],
      technologyAndComm: [4200, 4500, 4800],
      occupancyAndEquipment: [1100, 1200, 1300],
      marketingAndAcquisition: [600, 650, 700],
      otherOperating:    [6600, 6500, 6800]
    },
    incomeTaxExpense: [2000, 3000, 3500]
  },
  balanceSheet: {
    assets: {
      cashAndEquivalents:   [124000, 132000, 138000],
      investmentSecurities: [155000, 148000, 152000],
      loansAndLeases:       [179000, 186000, 192000],
      tradingAssets:        [480000, 510000, 530000],
      intangiblesGoodwill:  [6500, 6600, 6700],
      technologyAssets:     [0, 0, 0],
      otherAssets:          [184000, 210000, 232000]
    },
    liabilities: {
      deposits:            [356000, 372000, 385000],
      shortTermBorrowings: [55000, 60000, 63000],
      longTermDebt:        [255000, 270000, 285000],
      tradingLiabilities:  [280000, 295000, 310000],
      otherLiabilities:    [80000, 85000, 90000]
    },
    equity: {
      commonEquity:        [95000, 99000, 102000],
      retainedEarnings:    [12500, 15600, 18700],
      aoci:                [-5000, -4000, -3000]
    }
  }
},

"COF": {
  name: "Capital One Financial",
  ticker: "COF",
  sector: "Consumer Finance",
  caseType: "Credit card issuer",
  sharesOutstanding: 385, // millions
  currentPrice: 185,
  beta: 1.20,
  description: "Major credit card issuer and consumer lender. High net interest margin from card portfolio. Also operates auto lending and banking.",
  years: [2022, 2023, 2024],
  incomeStatement: {
    interestIncome: {
      loansAndLeases:    [27500, 33500, 36000],
      investmentSecurities: [2800, 3100, 3200],
      otherInterest:     [1200, 1800, 2000]
    },
    interestExpense: {
      deposits:          [2500, 6000, 7000],
      borrowings:        [2200, 2800, 3000]
    },
    provisionForCreditLosses: [7980, 11400, 12500],
    nonInterestIncome: {
      serviceChargesAndFees: [3800, 4200, 4500],
      tradingRevenue:    [0, 0, 0],
      advisoryFees:      [0, 0, 0],
      technologyPlatformFees: [0, 0, 0],
      gainOnSaleOfLoans: [200, 150, 120],
      otherNonInterest:  [1500, 1600, 1700]
    },
    nonInterestExpense: {
      compensationAndBenefits: [5800, 6200, 6600],
      technologyAndComm: [3800, 4200, 4600],
      occupancyAndEquipment: [1200, 1300, 1400],
      marketingAndAcquisition: [3500, 3800, 4100],
      otherOperating:    [2500, 2700, 2800]
    },
    incomeTaxExpense: [1600, 1500, 1200]
  },
  balanceSheet: {
    assets: {
      cashAndEquivalents:   [42000, 44000, 46000],
      investmentSecurities: [90000, 86000, 83000],
      loansAndLeases:       [314000, 325000, 338000],
      tradingAssets:        [0, 0, 0],
      intangiblesGoodwill:  [15000, 15100, 15200],
      technologyAssets:     [0, 0, 0],
      otherAssets:          [15000, 16000, 17000]
    },
    liabilities: {
      deposits:            [308000, 320000, 335000],
      shortTermBorrowings: [15000, 14000, 13000],
      longTermDebt:        [45000, 48000, 50000],
      tradingLiabilities:  [0, 0, 0],
      otherLiabilities:    [28000, 31000, 31000]
    },
    equity: {
      commonEquity:        [63000, 62000, 61000],
      retainedEarnings:    [20000, 14100, 12200],
      aoci:                [-3000, -3000, -3000]
    }
  }
},

"USB": {
  name: "U.S. Bancorp",
  ticker: "USB",
  sector: "Banking",
  caseType: "Regional bank",
  sharesOutstanding: 1550, // millions
  currentPrice: 52,
  beta: 1.05,
  description: "Fifth-largest US bank. Traditional banking model with strong deposit franchise. Known for operational efficiency.",
  years: [2022, 2023, 2024],
  incomeStatement: {
    interestIncome: {
      loansAndLeases:    [14800, 19200, 19800],
      investmentSecurities: [3200, 3500, 3600],
      otherInterest:     [1100, 1500, 1600]
    },
    interestExpense: {
      deposits:          [1800, 5500, 6000],
      borrowings:        [1800, 3200, 3500]
    },
    provisionForCreditLosses: [2885, 2500, 2800],
    nonInterestIncome: {
      serviceChargesAndFees: [2200, 2300, 2400],
      tradingRevenue:    [400, 450, 480],
      advisoryFees:      [1500, 1600, 1700],
      technologyPlatformFees: [1200, 1300, 1400],
      gainOnSaleOfLoans: [600, 500, 450],
      otherNonInterest:  [3500, 3700, 3900]
    },
    nonInterestExpense: {
      compensationAndBenefits: [7500, 7500, 7800],
      technologyAndComm: [2500, 2800, 3000],
      occupancyAndEquipment: [1500, 1600, 1700],
      marketingAndAcquisition: [800, 850, 900],
      otherOperating:    [3500, 3700, 3800]
    },
    incomeTaxExpense: [1200, 1500, 1400]
  },
  balanceSheet: {
    assets: {
      cashAndEquivalents:   [60000, 55000, 52000],
      investmentSecurities: [160000, 150000, 145000],
      loansAndLeases:       [380000, 375000, 370000],
      tradingAssets:        [8000, 8500, 9000],
      intangiblesGoodwill:  [20000, 19800, 19600],
      technologyAssets:     [0, 0, 0],
      otherAssets:          [30000, 31000, 32000]
    },
    liabilities: {
      deposits:            [510000, 495000, 488000],
      shortTermBorrowings: [28000, 30000, 28000],
      longTermDebt:        [42000, 45000, 47000],
      tradingLiabilities:  [2000, 2200, 2400],
      otherLiabilities:    [31000, 20800, 15000]
    },
    equity: {
      commonEquity:        [47000, 48000, 49000],
      retainedEarnings:    [6000, 5300, 4200],
      aoci:                [-8000, -7000, -6000]
    }
  }
},

"MET": {
  name: "MetLife",
  ticker: "MET",
  sector: "Insurance",
  caseType: "Global insurance company",
  sharesOutstanding: 710, // millions
  currentPrice: 82,
  beta: 0.95,
  description: "One of the largest global insurance companies. Revenue from premiums, investment income, and fee-based businesses. Unique balance sheet with policy reserves.",
  years: [2022, 2023, 2024],
  incomeStatement: {
    interestIncome: {
      loansAndLeases:    [3500, 4200, 4500],
      investmentSecurities: [15000, 16500, 17200],
      otherInterest:     [2000, 2400, 2600]
    },
    interestExpense: {
      deposits:          [0, 0, 0],
      borrowings:        [1200, 1500, 1600]
    },
    provisionForCreditLosses: [300, 350, 400],
    nonInterestIncome: {
      serviceChargesAndFees: [42000, 44000, 46000],
      tradingRevenue:    [0, 0, 0],
      advisoryFees:      [0, 0, 0],
      technologyPlatformFees: [0, 0, 0],
      gainOnSaleOfLoans: [0, 0, 0],
      otherNonInterest:  [5000, 5500, 5800]
    },
    nonInterestExpense: {
      compensationAndBenefits: [7000, 7500, 7800],
      technologyAndComm: [2500, 2800, 3000],
      occupancyAndEquipment: [1500, 1600, 1700],
      marketingAndAcquisition: [800, 850, 900],
      otherOperating:    [48500, 51000, 53200]
    },
    incomeTaxExpense: [1600, 2200, 2500]
  },
  balanceSheet: {
    assets: {
      cashAndEquivalents:   [18000, 20000, 22000],
      investmentSecurities: [350000, 340000, 335000],
      loansAndLeases:       [55000, 58000, 60000],
      tradingAssets:        [0, 0, 0],
      intangiblesGoodwill:  [12000, 11800, 11600],
      technologyAssets:     [0, 0, 0],
      otherAssets:          [270000, 280000, 290000]
    },
    liabilities: {
      deposits:            [0, 0, 0],
      shortTermBorrowings: [5000, 5500, 6000],
      longTermDebt:        [18000, 19000, 20000],
      tradingLiabilities:  [0, 0, 0],
      otherLiabilities:    [650000, 651000, 652000]
    },
    equity: {
      commonEquity:        [42000, 40000, 42000],
      retainedEarnings:    [15000, 16300, 17600],
      aoci:                [-25000, -22000, -19000]
    }
  }
},

"FNMA": {
  name: "Fannie Mae",
  ticker: "FNMA",
  sector: "Mortgage Finance",
  caseType: "Mortgage finance company",
  sharesOutstanding: 1158, // millions
  currentPrice: 3.5,
  beta: 1.80,
  description: "Government-sponsored enterprise (GSE). Guarantees and securitizes residential mortgages. Unique balance sheet dominated by mortgage assets and guarantee obligations.",
  years: [2022, 2023, 2024],
  incomeStatement: {
    interestIncome: {
      loansAndLeases:    [95000, 125000, 130000],
      investmentSecurities: [15000, 18000, 19000],
      otherInterest:     [2000, 3000, 3500]
    },
    interestExpense: {
      deposits:          [0, 0, 0],
      borrowings:        [83000, 121000, 126000]
    },
    provisionForCreditLosses: [1700, 700, 800],
    nonInterestIncome: {
      serviceChargesAndFees: [11000, 10500, 10800],
      tradingRevenue:    [0, 0, 0],
      advisoryFees:      [0, 0, 0],
      technologyPlatformFees: [0, 0, 0],
      gainOnSaleOfLoans: [500, 300, 350],
      otherNonInterest:  [-3000, -1500, -1000]
    },
    nonInterestExpense: {
      compensationAndBenefits: [2200, 2400, 2500],
      technologyAndComm: [1800, 2000, 2200],
      occupancyAndEquipment: [400, 420, 440],
      marketingAndAcquisition: [100, 110, 120],
      otherOperating:    [3000, 3200, 3400]
    },
    incomeTaxExpense: [8500, 8500, 9000]
  },
  balanceSheet: {
    assets: {
      cashAndEquivalents:   [55000, 60000, 58000],
      investmentSecurities: [170000, 165000, 160000],
      loansAndLeases:       [3850000, 3780000, 3750000],
      tradingAssets:        [0, 0, 0],
      intangiblesGoodwill:  [1200, 1200, 1200],
      technologyAssets:     [0, 0, 0],
      otherAssets:          [35000, 37000, 38000]
    },
    liabilities: {
      deposits:            [0, 0, 0],
      shortTermBorrowings: [120000, 115000, 110000],
      longTermDebt:        [3870000, 3810000, 3780000],
      tradingLiabilities:  [0, 0, 0],
      otherLiabilities:    [60000, 55200, 56200]
    },
    equity: {
      commonEquity:        [62000, 66000, 64000],
      retainedEarnings:    [6200, 3000, 2000],
      aoci:                [-7000, -6000, -5000]
    }
  }
},

"SOFI": {
  name: "SoFi Technologies",
  ticker: "SOFI",
  sector: "Fintech",
  caseType: "Fintech consumer lender",
  sharesOutstanding: 1070, // millions
  currentPrice: 14,
  beta: 1.65,
  description: "Digital financial services company with bank charter (2022). Started in student loan refinancing, expanded to personal loans, investing, and banking. High-growth fintech with improving profitability.",
  years: [2022, 2023, 2024],
  incomeStatement: {
    interestIncome: {
      loansAndLeases:    [1000, 1800, 2600],
      investmentSecurities: [50, 80, 120],
      otherInterest:     [30, 60, 100]
    },
    interestExpense: {
      deposits:          [50, 300, 600],
      borrowings:        [380, 500, 550]
    },
    provisionForCreditLosses: [120, 175, 210],
    nonInterestIncome: {
      serviceChargesAndFees: [350, 420, 520],
      tradingRevenue:    [0, 0, 0],
      advisoryFees:      [0, 0, 0],
      technologyPlatformFees: [340, 390, 450],
      gainOnSaleOfLoans: [350, 280, 320],
      otherNonInterest:  [120, 160, 200]
    },
    nonInterestExpense: {
      compensationAndBenefits: [700, 800, 850],
      technologyAndComm: [380, 430, 470],
      occupancyAndEquipment: [60, 70, 80],
      marketingAndAcquisition: [450, 400, 380],
      otherOperating:    [350, 380, 400]
    },
    incomeTaxExpense: [-50, -20, 10]
  },
  balanceSheet: {
    assets: {
      cashAndEquivalents:   [3000, 4500, 5800],
      investmentSecurities: [2000, 3500, 5000],
      loansAndLeases:       [18000, 24000, 28000],
      tradingAssets:        [0, 0, 0],
      intangiblesGoodwill:  [2500, 2400, 2300],
      technologyAssets:     [800, 900, 1000],
      otherAssets:          [2700, 3200, 3700]
    },
    liabilities: {
      deposits:            [7300, 18000, 25000],
      shortTermBorrowings: [5000, 4000, 3500],
      longTermDebt:        [10000, 8500, 8000],
      tradingLiabilities:  [0, 0, 0],
      otherLiabilities:    [2500, 3700, 4300]
    },
    equity: {
      commonEquity:        [5500, 5800, 6200],
      retainedEarnings:    [-1200, -1400, -1100],
      aoci:                [-100, -100, -100]
    }
  }
},

"ENVA": {
  name: "Enova International",
  ticker: "ENVA",
  sector: "Fintech",
  caseType: "Fintech SMB lender",
  sharesOutstanding: 28, // millions
  currentPrice: 85,
  beta: 1.45,
  description: "Online lending platform serving non-prime consumers and small businesses. Acquired OnDeck Capital in 2020. AI/ML-driven underwriting. High-yield, high-provision model.",
  years: [2022, 2023, 2024],
  incomeStatement: {
    interestIncome: {
      loansAndLeases:    [1700, 2100, 2500],
      investmentSecurities: [5, 10, 15],
      otherInterest:     [10, 15, 20]
    },
    interestExpense: {
      deposits:          [0, 0, 0],
      borrowings:        [220, 310, 370]
    },
    provisionForCreditLosses: [700, 820, 950],
    nonInterestIncome: {
      serviceChargesAndFees: [50, 60, 70],
      tradingRevenue:    [0, 0, 0],
      advisoryFees:      [0, 0, 0],
      technologyPlatformFees: [0, 0, 0],
      gainOnSaleOfLoans: [10, 15, 20],
      otherNonInterest:  [20, 25, 30]
    },
    nonInterestExpense: {
      compensationAndBenefits: [210, 240, 270],
      technologyAndComm: [95, 110, 125],
      occupancyAndEquipment: [15, 18, 20],
      marketingAndAcquisition: [230, 270, 310],
      otherOperating:    [130, 150, 170]
    },
    incomeTaxExpense: [40, 55, 70]
  },
  balanceSheet: {
    assets: {
      cashAndEquivalents:   [200, 250, 280],
      investmentSecurities: [50, 60, 70],
      loansAndLeases:       [2800, 3500, 4200],
      tradingAssets:        [0, 0, 0],
      intangiblesGoodwill:  [280, 270, 260],
      technologyAssets:     [100, 120, 140],
      otherAssets:          [150, 170, 190]
    },
    liabilities: {
      deposits:            [0, 0, 0],
      shortTermBorrowings: [500, 600, 700],
      longTermDebt:        [2100, 2700, 3300],
      tradingLiabilities:  [0, 0, 0],
      otherLiabilities:    [90, 80, 80]
    },
    equity: {
      commonEquity:        [650, 700, 720],
      retainedEarnings:    [250, 300, 350],
      aoci:                [-10, -10, -10]
    }
  }
},

"PYPL": {
  name: "PayPal Holdings",
  ticker: "PYPL",
  sector: "Payments",
  caseType: "Payments/fintech platform",
  sharesOutstanding: 1060, // millions
  currentPrice: 78,
  beta: 1.30,
  description: "Global digital payments platform. Revenue primarily from transaction fees. Includes Venmo. Minimal interest income — fee-driven business model.",
  years: [2022, 2023, 2024],
  incomeStatement: {
    interestIncome: {
      loansAndLeases:    [900, 1200, 1400],
      investmentSecurities: [300, 500, 600],
      otherInterest:     [100, 200, 250]
    },
    interestExpense: {
      deposits:          [0, 0, 0],
      borrowings:        [350, 450, 500]
    },
    provisionForCreditLosses: [1200, 1500, 1600],
    nonInterestIncome: {
      serviceChargesAndFees: [25400, 27200, 29500],
      tradingRevenue:    [0, 0, 0],
      advisoryFees:      [0, 0, 0],
      technologyPlatformFees: [0, 0, 0],
      gainOnSaleOfLoans: [0, 0, 0],
      otherNonInterest:  [1300, 1400, 1500]
    },
    nonInterestExpense: {
      compensationAndBenefits: [4800, 4900, 5100],
      technologyAndComm: [2900, 3100, 3300],
      occupancyAndEquipment: [400, 420, 440],
      marketingAndAcquisition: [1800, 1900, 2000],
      otherOperating:    [12800, 13500, 14200]
    },
    incomeTaxExpense: [900, 1100, 1300]
  },
  balanceSheet: {
    assets: {
      cashAndEquivalents:   [7776, 9800, 11000],
      investmentSecurities: [5800, 5400, 5200],
      loansAndLeases:       [7400, 7800, 8200],
      tradingAssets:        [0, 0, 0],
      intangiblesGoodwill:  [12400, 12200, 12000],
      technologyAssets:     [3000, 3200, 3400],
      otherAssets:          [42000, 43000, 44000]
    },
    liabilities: {
      deposits:            [0, 0, 0],
      shortTermBorrowings: [0, 0, 0],
      longTermDebt:        [10800, 11500, 12000],
      tradingLiabilities:  [0, 0, 0],
      otherLiabilities:    [49000, 50900, 51800]
    },
    equity: {
      commonEquity:        [15800, 15200, 14800],
      retainedEarnings:    [3776, 4700, 6000],
      aoci:                [-1000, -900, -800]
    }
  }
},

"UPST": {
  name: "Upstart Holdings",
  ticker: "UPST",
  sector: "Fintech",
  caseType: "AI lending platform",
  sharesOutstanding: 87, // millions
  currentPrice: 72,
  beta: 2.10,
  description: "AI-native lending marketplace. Uses ML models to price credit risk. Originates loans via bank partners. Revenue from platform/referral fees. Minimal balance sheet lending.",
  years: [2022, 2023, 2024],
  incomeStatement: {
    interestIncome: {
      loansAndLeases:    [160, 110, 180],
      investmentSecurities: [10, 20, 30],
      otherInterest:     [15, 25, 35]
    },
    interestExpense: {
      deposits:          [0, 0, 0],
      borrowings:        [60, 80, 100]
    },
    provisionForCreditLosses: [200, 180, 160],
    nonInterestIncome: {
      serviceChargesAndFees: [700, 480, 600],
      tradingRevenue:    [0, 0, 0],
      advisoryFees:      [0, 0, 0],
      technologyPlatformFees: [150, 100, 140],
      gainOnSaleOfLoans: [50, 30, 45],
      otherNonInterest:  [20, 15, 20]
    },
    nonInterestExpense: {
      compensationAndBenefits: [350, 280, 310],
      technologyAndComm: [180, 160, 175],
      occupancyAndEquipment: [25, 22, 24],
      marketingAndAcquisition: [250, 150, 180],
      otherOperating:    [100, 90, 95]
    },
    incomeTaxExpense: [-15, -20, 0]
  },
  balanceSheet: {
    assets: {
      cashAndEquivalents:   [600, 450, 520],
      investmentSecurities: [300, 350, 400],
      loansAndLeases:       [1200, 900, 1100],
      tradingAssets:        [0, 0, 0],
      intangiblesGoodwill:  [150, 140, 135],
      technologyAssets:     [200, 220, 250],
      otherAssets:          [200, 180, 200]
    },
    liabilities: {
      deposits:            [0, 0, 0],
      shortTermBorrowings: [200, 150, 180],
      longTermDebt:        [900, 850, 920],
      tradingLiabilities:  [0, 0, 0],
      otherLiabilities:    [560, 630, 800]
    },
    equity: {
      commonEquity:        [1200, 950, 1100],
      retainedEarnings:    [-200, -330, -380],
      aoci:                [-10, -10, -15]
    }
  }
},

"AFRM": {
  name: "Affirm Holdings",
  ticker: "AFRM",
  sector: "Fintech",
  caseType: "BNPL fintech lender",
  sharesOutstanding: 310, // millions
  currentPrice: 55,
  beta: 2.30,
  description: "Buy Now, Pay Later (BNPL) fintech. Point-of-sale consumer lending integrated with merchants. Revenue from merchant fees and interest on loans held. High growth, not yet profitable.",
  years: [2022, 2023, 2024],
  incomeStatement: {
    interestIncome: {
      loansAndLeases:    [680, 1050, 1450],
      investmentSecurities: [20, 40, 60],
      otherInterest:     [15, 30, 50]
    },
    interestExpense: {
      deposits:          [0, 0, 0],
      borrowings:        [180, 350, 480]
    },
    provisionForCreditLosses: [400, 550, 650],
    nonInterestIncome: {
      serviceChargesAndFees: [500, 600, 750],
      tradingRevenue:    [0, 0, 0],
      advisoryFees:      [0, 0, 0],
      technologyPlatformFees: [150, 200, 280],
      gainOnSaleOfLoans: [200, 180, 220],
      otherNonInterest:  [30, 40, 50]
    },
    nonInterestExpense: {
      compensationAndBenefits: [550, 500, 520],
      technologyAndComm: [400, 420, 450],
      occupancyAndEquipment: [40, 45, 50],
      marketingAndAcquisition: [200, 180, 200],
      otherOperating:    [400, 380, 370]
    },
    incomeTaxExpense: [0, 0, 0]
  },
  balanceSheet: {
    assets: {
      cashAndEquivalents:   [2200, 1900, 2100],
      investmentSecurities: [1500, 1800, 2200],
      loansAndLeases:       [5500, 6800, 8500],
      tradingAssets:        [0, 0, 0],
      intangiblesGoodwill:  [600, 580, 560],
      technologyAssets:     [350, 400, 450],
      otherAssets:          [500, 600, 700]
    },
    liabilities: {
      deposits:            [0, 0, 0],
      shortTermBorrowings: [800, 900, 1100],
      longTermDebt:        [5500, 6200, 7500],
      tradingLiabilities:  [0, 0, 0],
      otherLiabilities:    [3400, 3930, 4460]
    },
    equity: {
      commonEquity:        [3500, 4200, 5000],
      retainedEarnings:    [-2500, -3100, -3500],
      aoci:                [-50, -50, -50]
    }
  }
},

"LC": {
  name: "LendingClub",
  ticker: "LC",
  sector: "Fintech",
  caseType: "Marketplace lending → bank charter",
  sharesOutstanding: 110, // millions
  currentPrice: 12,
  beta: 1.75,
  description: "Pioneer of marketplace lending, now a full bank (Radius Bank acquisition 2021). Transitioned from fee-only marketplace to hybrid model holding loans on balance sheet. Interesting case of fintech-to-bank evolution.",
  years: [2022, 2023, 2024],
  incomeStatement: {
    interestIncome: {
      loansAndLeases:    [700, 900, 1050],
      investmentSecurities: [80, 100, 110],
      otherInterest:     [30, 40, 50]
    },
    interestExpense: {
      deposits:          [80, 280, 350],
      borrowings:        [50, 70, 80]
    },
    provisionForCreditLosses: [310, 370, 400],
    nonInterestIncome: {
      serviceChargesAndFees: [200, 180, 200],
      tradingRevenue:    [0, 0, 0],
      advisoryFees:      [0, 0, 0],
      technologyPlatformFees: [100, 90, 100],
      gainOnSaleOfLoans: [250, 150, 180],
      otherNonInterest:  [30, 25, 30]
    },
    nonInterestExpense: {
      compensationAndBenefits: [310, 280, 290],
      technologyAndComm: [100, 110, 115],
      occupancyAndEquipment: [20, 22, 24],
      marketingAndAcquisition: [120, 100, 110],
      otherOperating:    [200, 200, 210]
    },
    incomeTaxExpense: [20, 10, 30]
  },
  balanceSheet: {
    assets: {
      cashAndEquivalents:   [1200, 1100, 1000],
      investmentSecurities: [3000, 2800, 2700],
      loansAndLeases:       [5200, 5000, 5300],
      tradingAssets:        [0, 0, 0],
      intangiblesGoodwill:  [150, 140, 135],
      technologyAssets:     [100, 110, 120],
      otherAssets:          [400, 380, 400]
    },
    liabilities: {
      deposits:            [7200, 7000, 7200],
      shortTermBorrowings: [300, 250, 230],
      longTermDebt:        [1200, 1100, 1000],
      tradingLiabilities:  [0, 0, 0],
      otherLiabilities:    [500, 410, 355]
    },
    equity: {
      commonEquity:        [1100, 1050, 1100],
      retainedEarnings:    [-50, -100, -70],
      aoci:                [-200, -180, -160]
    }
  }
},

"ZG": {
  name: "Zillow Group",
  ticker: "ZG",
  sector: "Proptech",
  caseType: "Proptech platform",
  sharesOutstanding: 230, // millions
  currentPrice: 55,
  beta: 1.50,
  description: "Leading real estate technology platform. Revenue from advertising (Premier Agent), mortgage origination, and rentals. Exited iBuying (Zillow Offers) in 2021 with large losses.",
  years: [2022, 2023, 2024],
  incomeStatement: {
    interestIncome: {
      loansAndLeases:    [100, 120, 150],
      investmentSecurities: [30, 50, 60],
      otherInterest:     [10, 20, 25]
    },
    interestExpense: {
      deposits:          [0, 0, 0],
      borrowings:        [80, 90, 100]
    },
    provisionForCreditLosses: [10, 15, 20],
    nonInterestIncome: {
      serviceChargesAndFees: [1600, 1700, 1850],
      tradingRevenue:    [0, 0, 0],
      advisoryFees:      [0, 0, 0],
      technologyPlatformFees: [300, 350, 400],
      gainOnSaleOfLoans: [50, 40, 45],
      otherNonInterest:  [100, 120, 140]
    },
    nonInterestExpense: {
      compensationAndBenefits: [750, 800, 850],
      technologyAndComm: [550, 600, 650],
      occupancyAndEquipment: [80, 85, 90],
      marketingAndAcquisition: [350, 370, 400],
      otherOperating:    [200, 220, 240]
    },
    incomeTaxExpense: [20, 30, 40]
  },
  balanceSheet: {
    assets: {
      cashAndEquivalents:   [3200, 3000, 2800],
      investmentSecurities: [1200, 1100, 1050],
      loansAndLeases:       [1000, 1100, 1200],
      tradingAssets:        [0, 0, 0],
      intangiblesGoodwill:  [2800, 2700, 2600],
      technologyAssets:     [800, 850, 900],
      otherAssets:          [600, 650, 700]
    },
    liabilities: {
      deposits:            [0, 0, 0],
      shortTermBorrowings: [200, 180, 170],
      longTermDebt:        [2500, 2400, 2300],
      tradingLiabilities:  [0, 0, 0],
      otherLiabilities:    [2100, 2000, 1940]
    },
    equity: {
      commonEquity:        [5500, 5400, 5300],
      retainedEarnings:    [-600, -500, -400],
      aoci:                [-100, -80, -60]
    }
  }
},

"WF_PRIV": {
  name: "Wealthfront",
  ticker: "Private",
  sector: "Fintech",
  caseType: "Robo-advisor / wealth management",
  sharesOutstanding: null,
  currentPrice: null,
  beta: 1.40,
  description: "Automated investment management (robo-advisor). S-1 filed but IPO withdrawn. UBS acquisition announced at $1.4B then also terminated. Revenue from AUM-based advisory fees. Minimal lending.",
  years: [2020, 2021, 2022],
  incomeStatement: {
    interestIncome: {
      loansAndLeases:    [5, 3, 15],
      investmentSecurities: [2, 1, 5],
      otherInterest:     [1, 1, 3]
    },
    interestExpense: {
      deposits:          [0, 0, 0],
      borrowings:        [2, 2, 5]
    },
    provisionForCreditLosses: [0, 0, 0],
    nonInterestIncome: {
      serviceChargesAndFees: [60, 95, 115],
      tradingRevenue:    [0, 0, 0],
      advisoryFees:      [0, 0, 0],
      technologyPlatformFees: [0, 0, 0],
      gainOnSaleOfLoans: [0, 0, 0],
      otherNonInterest:  [5, 8, 12]
    },
    nonInterestExpense: {
      compensationAndBenefits: [55, 75, 85],
      technologyAndComm: [25, 35, 40],
      occupancyAndEquipment: [5, 6, 7],
      marketingAndAcquisition: [20, 30, 35],
      otherOperating:    [15, 20, 25]
    },
    incomeTaxExpense: [0, 0, 0]
  },
  balanceSheet: {
    assets: {
      cashAndEquivalents:   [150, 200, 180],
      investmentSecurities: [20, 30, 40],
      loansAndLeases:       [100, 200, 350],
      tradingAssets:        [0, 0, 0],
      intangiblesGoodwill:  [10, 10, 10],
      technologyAssets:     [30, 40, 50],
      otherAssets:          [30, 40, 50]
    },
    liabilities: {
      deposits:            [0, 0, 0],
      shortTermBorrowings: [0, 0, 0],
      longTermDebt:        [50, 80, 100],
      tradingLiabilities:  [0, 0, 0],
      otherLiabilities:    [140, 220, 300]
    },
    equity: {
      commonEquity:        [250, 370, 480],
      retainedEarnings:    [-100, -150, -200],
      aoci:                [0, 0, 0]
    }
  }
}

};
