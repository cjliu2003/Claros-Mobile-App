export const parseLeague = (league) => {
    if (league === "baseball_mlb") {
        return "MLB"
    } else if (league === "americanfootball_ncaaf") {
        return "NCAAF"
    } else if (league === "americanfootball_nfl") {
        return "NFL"
    } else if (league === "icehockey_nhl") {
        return "NHL"
    } else if (league === "basketball_nba") {
        return "NBA"
    } else if (league === "soccer_england_efl_cup") {
        return "EFL Cup"
    } else if (league === "soccer_england_league1") {
        return "League 1"
    } else if (league === "soccer_england_league2") {
        return "League 2"
    } else if (league === "soccer_epl") {
        return "EPL"
    } else if (league === "soccer_france_ligue_one") {
        return "Ligue 1 - France"
    } else if (league === "soccer_france_ligue_two") {
        return "Ligue 2 - France"
    } else if (league === "soccer_germany_bundesliga") {
        return "Bundesliga - Germany"
    } else if (league === "soccer_italy_serie_a") {
        return "Serie A - Italy"
    } else if (league === "soccer_spain_la_liga") {
        return "La Liga - Spain"
    } else if (league === "soccer_uefa_champs_league") {
        return "UEFA Champions"
    } else if (league === "soccer_uefa_europa_league") {
        return "UEFA Europa"
    } else if (league === "basketball_ncaab") {
        return "NCAAB"
    } else {
        return ""
    }
}