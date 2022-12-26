export const findTeam = (side, homeTeam, awayTeam, market) => {
    if (side === "Home") {
        if (market === "totals") {
            return "Over"
        } else {
            return homeTeam
        }
    } else if (side === "Away") {
        if (market === "totals") {
            return "Under"
        } else {
            return awayTeam
        }
    }
    
}