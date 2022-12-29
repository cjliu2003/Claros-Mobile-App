const calculateSinglePayout = (betAmount, odds, outcome) => {
    if (outcome === 'W') {
        if (odds > 0 ) return odds * betAmount / 100
        return betAmount * 100 / -odds
    } else {
      return -betAmount;
    }
  }
  
export const calculateROI = (unitsize, bettingLines) => {
    let initialBankroll = 100
    let bankroll = 100
    for (const bettingLine of bettingLines) {
      const odds = bettingLine.odds;
      const outcome = bettingLine.outcome;
      const payout = calculateSinglePayout(bankroll * (unitsize / 100), odds, outcome);
      bankroll += payout
    }
    return ((bankroll - initialBankroll) * 100 / initialBankroll).toFixed(2);
}
  