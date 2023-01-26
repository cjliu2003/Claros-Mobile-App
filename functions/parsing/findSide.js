export const findSide = (home_ev, away_ev, draw_ev) => {
    if (home_ev > away_ev && (draw_ev === null | home_ev > draw_ev)) {
        return "home"
    } else if (away_ev > home_ev && (draw_ev === null | away_ev > draw_ev)) {
        return "away"
    } else {
        return "draw"
    }
}