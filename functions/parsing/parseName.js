import {parseMarket} from './parseMarket'
import { parsePoint } from './parsePoint'

export const parseName = (league, team, market, point) => {
    let parsedMarket = parseMarket(market)
    if (parsedMarket === "Moneyline") {
        return league + ": " + team + " " + parsedMarket
    } else if (parsedMarket === "Spreads") {
        return league + ": " + team + " " + parsePoint(point) + " " + "Spread"
    } else {
        return league + ": " + team + " " + point + " Total"
    }
} 