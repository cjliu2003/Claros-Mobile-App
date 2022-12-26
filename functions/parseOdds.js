export const parseOdds = (odds) => {
    if (odds > 0) return '+' + odds
    return odds
}