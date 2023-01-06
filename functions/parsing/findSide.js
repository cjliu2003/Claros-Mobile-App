export const findSide = (home_ev, away_ev) => {
    if (home_ev > away_ev) {
        return "home"
    } else {
        return "away"
    }
}