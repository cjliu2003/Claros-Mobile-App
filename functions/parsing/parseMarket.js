export const parseMarket = (market) => {
    if (market === "h2h") {
        return "Moneyline"
    } else if (market === "totals"){
        return "Total"
    } else if (market === "spreads") {
        return "Spread"
    } else {
        return ""
    }
}