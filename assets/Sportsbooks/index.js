import OneXBet from '../Sportsbooks/Sportsbook-Logos-Horizontal1xBet.png'
import EightSport from '../Sportsbooks/Sportsbook-Logos-Horizontal888sport.png'
import Barstool from '../Sportsbooks/Sportsbook-Logos-HorizontalBarstool.png'
import BetClic from '../Sportsbooks/Sportsbook-Logos-HorizontalBetclic.png'
import BetFair from '../Sportsbooks/Sportsbook-Logos-HorizontalBetfair.png'
import BetMGM from '../Sportsbooks/Sportsbook-Logos-HorizontalBetMGM.png'
import BetOnline from '../Sportsbooks/Sportsbook-Logos-HorizontalBetOnline.png'
import BetRivers from '../Sportsbooks/Sportsbook-Logos-HorizontalBetRivers.png'
import Betsson from '../Sportsbooks/Sportsbook-Logos-HorizontalBetsson.png'
import BetUS from '../Sportsbooks/Sportsbook-Logos-HorizontalBetUS.png'
import BetVictor from '../Sportsbooks/Sportsbook-Logos-HorizontalBetVictor.png'
import Bovada from '../Sportsbooks/Sportsbook-Logos-HorizontalBovada.png'
import Caesars from '../Sportsbooks/Sportsbook-Logos-HorizontalCaesars.png'
import CircaSports from '../Sportsbooks/Sportsbook-Logos-HorizontalCircaSports.png'
import DraftKings from '../Sportsbooks/Sportsbook-Logos-HorizontalDraftKings.png'
import FanDuel from '../Sportsbooks/Sportsbook-Logos-HorizontalFanduel.png'
import FOXBet from '../Sportsbooks/Sportsbook-Logos-HorizontalFOXBet.png'
import GTBets from '../Sportsbooks/Sportsbook-Logos-HorizontalGTBets.png'
import Intertops from '../Sportsbooks/Sportsbook-Logos-HorizontalIntertops.png'
import LowVig from '../Sportsbooks/Sportsbook-Logos-HorizontalLowvig.png'
import Marathon from '../Sportsbooks/Sportsbook-Logos-HorizontalMarathon.png'
import Matchbook from '../Sportsbooks/Sportsbook-Logos-HorizontalMatchbook.png'
import MyBookie from '../Sportsbooks/Sportsbook-Logos-HorizontalMyBookie.png'
import PointsBet from '../Sportsbooks/Sportsbook-Logos-HorizontalPointsBET.png'
import SugarHouse from '../Sportsbooks/Sportsbook-Logos-HorizontalSugarHouse.png'
import Superbook from '../Sportsbooks/Sportsbook-Logos-HorizontalSuperbook.png'
import TwinSpires from '../Sportsbooks/Sportsbook-Logos-HorizontalTwinSpires.png'
import Unibet from '../Sportsbooks/Sportsbook-Logos-HorizontalUnibet.png'
import WilliamHill from '../Sportsbooks/Sportsbook-Logos-HorizontalWilliam-Hill.png'
import WynnBet from '../Sportsbooks/Sportsbook-Logos-HorizontalWynnBET.png'
import NordicBet from'../Sportsbooks/Sportsbook-Logos-HorizontalNordic-Bet.png'

const Sportsbooks = {
    onexbet: {
        logo: OneXBet,
        name: "1xbet",
        location: {
            US: false,
            EU: true
        },
        link: "https://1xbet.com/",
        NBA: "https://1xbet.com/en/line/basketball/13589-nba",
        NFL: "https://1xbet.com/line/american-football/68315-usa-nfl",
        NCAAF: "https://1xbet.com/en/line/american-football/93369-ncaa",
        NHL: "https://1xbet.com/line/ice-hockey/30619-nhl",
        MLB: "https://1xbet.com/line/baseball/166775-usa-mlb",
    },
    sport888: {
        logo: EightSport,
        name: "888sport",
        location: {
            US: false,
            EU: true
        },
        link: "https://www.888sport.com/",
        NBA: "https://www.888sport.com/",
        NFL: "https://www.888sport.com/",
        NCAAF: "https://www.888sport.com/",
        NHL: "https://www.888sport.com/",
        MLB: "https://www.888sport.com/",
    },
    barstool: {
        logo: Barstool,
        name: "Barstool",
        location: {
            US: true,
            EU: false
        },
        link: "https://www.barstoolsportsbook.com/",
        NBA: "https://www.barstoolsportsbook.com/sports/basketball/nba",
        NFL: "https://www.barstoolsportsbook.com/sports/american_football/nfl",
        NCAAF: "https://www.barstoolsportsbook.com/sports/american_football/ncaaf",
        NHL: "https://www.barstoolsportsbook.com/sports/ice_hockey/nhl",
        MLB: "https://www.barstoolsportsbook.com/sports/baseball/mlb",
    },
    betclic: {
        logo: BetClic,
        name: "Betclic",
        location: {
            US: false,
            EU: true
        },
        link: "https://www.betclic.com/",
        NBA: "https://www.betclic.fr/basket-ball-s4/nba-c13",
        NFL: "https://www.betclic.fr/football-americain-s14/nfl-c84",
        NCAAF: "https://www.betclic.com/",
        NHL: "https://www.betclic.fr/hockey-sur-glace-s13/nhl-c83",
        MLB: "https://www.betclic.fr/baseball-s20/major-league-c473",
    },
    betfair: {
        logo: BetFair,
        name: "Betfair Exchange",
        location: {
            US: true,
            EU: true
        },
        link: "https://www.betfair.com/",
        NBA: "https://www.betfair.com/sport/basketball",
        NFL: "https://www.betfair.com/sport/american-football",
        NCAAF: "https://www.betfair.com/sport/american-football",
        NHL: "https://www.betfair.com/",
        MLB: "https://www.betfair.com/sport/baseball",
    },
    betmgm: {
        logo: BetMGM,
        name: "BetMGM",
        location: {
            US: true,
            EU: false,
        },
        link: "https://sports.nj.betmgm.com/en/sports",
        NBA: "https://sports.nj.betmgm.com/en/sports/basketball-7/betting/usa-9/nba-6004",
        NFL: "https://sports.nj.betmgm.com/en/sports/football-11/betting/usa-9/nfl-35",
        NCAAF: "https://sports.nj.betmgm.com/en/sports/football-11/betting/usa-9/college-football-211",
        NHL: "https://sports.nj.betmgm.com/en/sports/hockey-12/betting/usa-9/nhl-34",
        MLB: "https://sports.nj.betmgm.com/en/sports/baseball-23/betting/usa-9/mlb-75",
    },
    betonlineag: {
        logo: BetOnline ,
        name: "BetOnline.ag",
        location: {
            US: true,
            EU: true
        },
        link: "https://www.betonline.ag/sportsbook",
        NBA: "https://www.betonline.ag/sportsbook/basketball/nba",
        NFL: "https://www.betonline.ag/sportsbook/football/nfl",
        NCAAF: "https://www.betonline.ag/sportsbook/football/ncaa",
        NHL: "https://www.betonline.ag/sportsbook/hockey/nhl",
        MLB: "https://www.betonline.ag/sportsbook/baseball/mlb",
    },
    betrivers: {
        logo: BetRivers ,
        name: "BetRivers",
        location: {
            US: true,
            EU: false
        },
        link: "https://www.betrivers.com/",
        NBA: "https://nj.betrivers.com/?page=sportsbook&group=1000093652&type=prematch#home",
        NFL: "https://nj.betrivers.com/?page=sportsbook&group=1000093656&type=prematch#home",
        NCAAF: "https://nj.betrivers.com/?page=sportsbook&group=1000093655&type=futures#home",
        NHL: "https://nj.betrivers.com/?page=sportsbook&group=1000093657&type=prematch#home",
        MLB: "https://nj.betrivers.com/?page=sportsbook&group=1000093616&type=prematch#home",
    }, 
    betsson: {
        logo: Betsson,
        name: "Betsson",
        location: {
            US: false,
            EU: true
        },
        link: "https://betsson.com/",
        NBA: "https://www.betsson.com/en/sportsbook/basketball/nba/nba",
        NFL: "https://www.betsson.com/en/sportsbook/american-football/nfl/nfl",
        NCAAF: "https://www.betsson.com/en/sportsbook/american-football?tab=competitionsAndLeagues",
        NHL: "https://www.betsson.com/en/sportsbook/ice-hockey?tab=competitionsAndLeagues",
        MLB: "https://www.betsson.com/en/sportsbook/baseball/mlb/mlb",
    }, 
    betus: {
        logo: BetUS,
        name: "BetUS",
        location: {
            US: true,
            EU: false
        },
        link: "https://www.betus.com.pa/",
        NBA: "https://www.betus.com.pa/sportsbook/nba/",
        NFL: "https://www.betus.com.pa/sportsbook/nfl/",
        NCAAF: "https://www.betus.com.pa/sportsbook/ncaaf/",
        NHL: "https://www.betus.com.pa/sportsbook/ice-hockey/nhl/",
        MLB: "https://www.betus.com.pa/sportsbook/baseball/mlb/",
    },
    betvictor: {
        logo: BetVictor,
        name: "Bet Victor",
        location: {
            US: false,
            EU: true
        },
        link: "https://www.betvictor.com/",
        NBA: "https://www.betvictor.com/en-gb/sports/227",
        NFL: "https://www.betvictor.com/en-gb/sports/1?tab=0",
        NCAAF: "https://www.betvictor.com/en-gb/sports/1?tab=0",
        NHL: "https://www.betvictor.com/en-gb/sports/2100",
        MLB: "https://www.betvictor.com/en-gb/sports/226",
    }, 
    bovada: {
        logo: Bovada,
        name: "Bovada",
        location: {
            US: true,
            EU: false
        },
        link: "https://www.bovada.lv/",
        NBA: "https://www.bovada.lv/sports/basketball/nba",
        NFL: "https://www.bovada.lv/sports/football/nfl",
        NCAAF: "https://www.bovada.lv/sports/football/college-football/ncaaf",
        NHL: "https://www.bovada.lv/sports/hockey/nhl",
        MLB: "https://www.bovada.lv/sports/baseball/mlb",
    },
    williamhill_us: {
        logo: Caesars,
        name: "Caesars",
        location: {
            US: true,
            EU: false
        },
        link: "https://www.williamhill.com/us/nj/bet/",
        NBA: "https://www.williamhill.com/us/nj/bet/",
        NFL: "https://www.williamhill.com/us/nj/bet/",
        NCAAF: "https://www.williamhill.com/us/nj/bet/",
        NHL: "https://www.williamhill.com/us/nj/bet/",
        MLB: "https://www.williamhill.com/us/nj/bet/",
    }, 
    circasports: {
        logo: CircaSports,
        name: "Circa Sports",
        location: {
            US: true,
            EU: false
        },
        link: "https://co.circasports.com/",
        NBA: "https://www.vsin.com/odds/nba/",
        NFL: "https://www.vsin.com/odds/nfl/",
        NCAAF: "https://www.vsin.com/odds/ncaafb/",
        NHL: "https://www.vsin.com/odds/nhl/",
        MLB: "https://www.vsin.com/odds/mlb/",
    }, 
    draftkings: {
        logo: DraftKings,
        name: "DraftKings",
        location: {
            US: true,
            EU: false
        },
        link: "https://draftkings.com/",
        NBA: "https://draftkings.com/",
        NFL: "https://draftkings.com/",
        NCAAF: "https://draftkings.com/",
        NHL: "https://draftkings.com/",
        MLB: "https://draftkings.com/",
    }, 
    fanduel: {
        logo: FanDuel,
        name: "FanDuel",
        location: {
            US: true,
            EU: false
        },
        link: "https://sportsbook.fanduel.com/sports",
        NBA: "https://sportsbook.fanduel.com/navigation/nba",
        NFL: "https://sportsbook.fanduel.com/navigation/nfl",
        NCAAF: "https://sportsbook.fanduel.com/navigation/ncaaf",
        NHL: "https://sportsbook.fanduel.com/navigation/nhl",
        MLB: "https://sportsbook.fanduel.com/navigation/mlb",
    }, 
    foxbet: {
        logo: FOXBet,
        name: "FOX Bet",
        location: {
            US: true,
            EU: false
        },
        link: "https://www.foxbet.com/",
        NBA: "https://co.foxbet.com/#/basketball/competitions/9042577",
        NFL: "https://co.foxbet.com/#/american_football/competitions/9519650 ",
        NCAAF: "https://co.foxbet.com/#/american_football/competitions/9539494",
        NHL: "https://co.foxbet.com/#/ice_hockey/competitions/8832338",
        MLB: "https://co.foxbet.com/#/baseball/competitions/8661882",
    }, 
    gtbets: {
        logo: GTBets,
        name: "GTbets",
        location: {
            US: false,
            EU: true
        },
        link: "https://www.gtbets.eu/",
        NBA: "https://www.gtbets.ag/wagering1.asp?mode=lines&league=NBA&lg=1",
        NFL: "https://www.gtbets.ag/wagering1.asp?mode=lines&league=NFL&lg=1",
        NCAAF: "https://www.gtbets.ag/wagering1.asp?mode=lines&league=CF&lg=1",
        NHL: "https://www.gtbets.ag/wagering1.asp?mode=lines&league=NHL&lg=1",
        MLB: "https://www.gtbets.ag/wagering1.asp?mode=lines&league=MLB&lg=3",
    }, 
    intertops: {
        logo: Intertops,
        name: "Intertops (Everygame)",
        location: {
            US: true,
            EU: true
        },
        link: "https://everygame.eu/",
        NBA: "https://sports.everygame.eu/en/Bets/Basketball/NBA-Lines/1070",
        NFL: "https://sports.everygame.eu/en/Bets/American-Football/NFL-Lines/1018",
        NCAAF: "https://everygame.eu/",
        NHL: "https://sports.everygame.eu/en/Bets/Ice-Hockey/NHL-Lines/1064",
        MLB: "https://sports.everygame.eu/en/Bets/Baseball/4",
    }, 
    lowvig: {
        logo: LowVig,
        name: "LowVig",
        location: {
            US: true,
            EU: false,
        },
        link: "https://www.lowvig.ag/",
        NBA: "https://sportsbook.lowvig.ag/",
        NFL: "https://sportsbook.lowvig.ag/",
        NCAAF: "https://sportsbook.lowvig.ag/",
        NHL: "https://sportsbook.lowvig.ag/",
        MLB: "https://sportsbook.lowvig.ag/",
    },
    marathonbet: {
        logo: Marathon,
        name: "Marathon Bet",
        location: {
            US: false,
            EU: true
        },
        link: "https://www.marathonbet.co.uk/en/",
        NBA: "https://www.marathonbet.com/en/betting/Basketball/NBA+-+69367",
        NFL: "https://www.marathonbet.com/en/betting/American+Football/NFL+-+65517",
        NCAAF: "https://www.marathonbet.co.uk/en/",
        NHL: "https://www.marathonbet.com/en/betting/Ice+Hockey/NHL+-+1917",
        MLB: "https://www.marathonbet.com/en/betting/Baseball/MLB",
    }, 
    matchbook: {
        logo: Matchbook,
        name: "Matchbook",
        location: {
            US: false,
            EU: true
        },
        link: "https://www.marathonbet.co.uk/en/",
        NBA: "https://www.matchbook.com/events/basketball/nba",
        NFL: "https://www.matchbook.com/events/american-football/nfl",
        NCAAF: "https://www.marathonbet.co.uk/en/",
        NHL: "https://www.matchbook.com/events/ice-hockey/nhl",
        MLB: "https://www.matchbook.com/events/baseball/major-league-baseball",
    }, 
    mybookieag: {
        logo: MyBookie,
        name: "MyBookie.ag",
        location: {
            US: true,
            EU: true
        },
        link: "https://mybookie.ag/",
        NBA: "https://www.mybookie.ag/sportsbook/nba/",
        NFL: "https://www.mybookie.ag/sportsbook/nfl/",
        NCAAF: "https://www.mybookie.ag/sportsbook/college-football/",
        NHL: "https://www.mybookie.ag/sportsbook/nhl/stanley-cup/",
        MLB: "https://www.mybookie.ag/sportsbook/mlb/",
        
    }, 
    nordicbet: {
        logo: NordicBet,
        name: "Nordic Bet",
        location: {
            US: false,
            EU: true
        },
        link: 'https://www.nordicbet.com/',
        NBA: "https://www.nordicbet.com/no/odds/basketball/nba/nba",
        NFL: "https://www.nordicbet.com/no/odds/amerikansk-fotball/nfl/nfl",
        NCAAF: "https://www.nordicbet.com/no/odds/amerikansk-fotball/ncaa/ncaa",
        NHL: "https://www.nordicbet.com/no/odds/ishockey/nhl/nhl",
        MLB: "https://www.nordicbet.com/no/odds/baseball/mlb/mlb",
    },
    pinnacle: {
        logo: null,
        name: "Pinnacle",
        location: {
            US: false,
            EU: true
        },
        link: "https://pinnacle.com",
    }, 
    pointsbetus: {
        logo: PointsBet,
        name: "PointsBet",
        location: {
            US: true,
            EU: false
        },
        link: "https://nj.pointsbet.com/sports",
        NBA: "https://nj.pointsbet.com/sports/basketball/NBA",
        NFL: "https://nj.pointsbet.com/sports/american-football/NFL",
        NCAAF: "https://nj.pointsbet.com/sports/american-football/NCAAF",
        NHL: "https://nj.pointsbet.com/sports/ice-hockey/NHL",
        MLB: "https://nj.pointsbet.com/sports/baseball/MLB",
    }, 
    sugarhouse: {
        logo: SugarHouse,
        name: "SugarHouse",
        location: {
            US: true,
            EU: false,
        },
        link: "https://www.playsugarhouse.com/",
        NBA: "https://www.playsugarhouse.com/",
        NFL: "https://www.playsugarhouse.com/",
        NCAAF: "https://www.playsugarhouse.com/",
        NHL: "https://www.playsugarhouse.com/",
        MLB: "https://www.playsugarhouse.com/",
    }, 
    superbook: {
        logo: Superbook,
        name: "Superbook",
        location: {
            US: true,
            EU: false
        },
        link: "https://www.superbook.com/",
        NBA: "https://az.superbook.com/sports/navigation/8107.1/9860.1",
        NFL: "https://az.superbook.com/sports/navigation/6227.1/6229.1/8531.1",
        NCAAF: "https://az.superbook.com/sports/navigation/9930.1/9931.1",
        NHL: "https://az.superbook.com/sports/navigation/1550.1/7927.1",
        MLB: "https://az.superbook.com/sports/navigation/1110.1/7627.1",
    },
    twinspires: {
        logo: TwinSpires,
        name: "TwinSpires",
        location: {
            US: true,
            EU: false
        },
        link: "https://www.twinspires.com/",
        NBA: "https://www.twinspires.com/",
        NFL: "https://www.twinspires.com/",
        NCAAF: "https://www.twinspires.com/",
        NHL: "https://www.twinspires.com/",
        MLB: "https://www.twinspires.com/",
    }, 
    unibet_us: {
        logo: Unibet,
        name: "Unibet US",
        location: {
            US: true,
            EU: false
        },
        link: "https://nj.unibet.com",
        NBA: "https://nj.unibet.com/sports/#sports-hub/basketball/nba",
        NFL: "https://nj.unibet.com/sports/#sports-hub/american_football/nfl",
        NCAAF: "https://nj.unibet.com/sports/#sports-hub/american_football/nfl",
        NHL: "https://nj.unibet.com/sports/#sports-hub/ice_hockey/nhl",
        MLB: "https://nj.unibet.com/sports/#sports-hub/baseball/mlb",
    }, 
    unibet_eu: {
        logo: Unibet,
        name: "Unibet EU",
        location: {
            US: false,
            EU: true
        },
        link: "https://nj.unibet.com",
    }, 
    williamhill: {
        logo: Caesars,
        name: "Wiliam Hill",
        location: {
            US: false,
            EU: true
        },
        link: "https://www.williamhill.com/us/nj/bet/",
        NBA: "https://www.williamhill.com/us/nj/bet/",
        NFL: "https://www.williamhill.com/us/nj/bet/",
        NCAAF: "https://www.williamhill.com/us/nj/bet/",
        NHL: "https://www.williamhill.com/us/nj/bet/",
        MLB: "https://www.williamhill.com/us/nj/bet/",
    }, 
    wynnbet: {
        logo: WynnBet,
        name: "WynnBET",
        location: {
            US: true,
            EU: false
        },
        link: "https://www.wynnbet.com/",
        NBA: "https://az.wynnbet.com/sport/619493/",
        NFL: "https://az.wynnbet.com/competition/8949004",
        NCAAF: "https://az.wynnbet.com/sport/619520/",
        NHL: "https://az.wynnbet.com/sport/619515/",
        MLB: "https://az.wynnbet.com/sport/619490/",
    },
    all: [
        "1xbet", 
        "888sport",
        "Barstool",
        "Betclic",
        "Betfair Exchange",
        "BetMGM",
        "BetOnline.ag",
        "BetRivers",
        "Betsson",
        "BetUS",
        "Bet Victor",
        "Bovada",
        "Caesars",
        "Circa Sports",
        "DraftKings",
        "FanDuel",
        "FOX Bet",
        "GTbets",
        "Intertops (Everygame)",
        "LowVig",
        "Marathon Bet",
        "Matchbook",
        "MyBookie.ag",
        "Nordic Bet",
        "PointsBet",
        "SugarHouse",
        "Superbook",
        "TwinSpires",
        "Unibet US",
        "Unibet EU",
        "Wiliam Hill",
        "WynnBET",
    ],
    allKeys: [
        "onexbet",
        "sport888",
        "barstool",
        "betclic",
        "betfair",
        "betmgm",
        "betonlineag",
        "betrivers",
        "betsson",
        "betus",
        "betvictor",
        "bovada",
        "williamhill_us",
        "circasports",
        "draftkings",
        "fanduel",
        "foxbet",
        "gtbets",
        "intertops",
        "lowvig",
        "marathonbet",
        "matchbook",
        "mybookieag",
        "nordicbet",
        "pointsbetus",
        "sugarhouse",
        "superbook",
        "twinspires",
        "unibet_us",
        "unibet_eu",
        "williamhill",
        "wynnbet"
    ]
}

export default Sportsbooks;