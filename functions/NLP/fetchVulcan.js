import axios from 'axios';

// Returns promise for Class 1 lambda invoke
export async function invokeClass1Lambda() {
  try {
    const response = await axios.post(`https://3jfnca8cd3.execute-api.us-east-1.amazonaws.com/default/class1Fetch`);
    const responseData = response.data.data.message;
    return responseData;
    
  } catch (error) {
    // Handle any errors that occurred during the request here
    console.error(error);
    return null;
  }
}

// Function makes good on the promise
export async function getClass1LambdaResponse() {
  const marketData = await invokeClass1Lambda();
  return marketData;
}

export function parseClass1ReponseObject(json) {
  let id = json.id;
  let eventId = json.event_id;
  let leagueName = json.league_name;
  let market = json.market;
  let maxEV = json.max_ev;
  let teamName = "";
  let odds;
  let point;
  if (maxEV === json.away_ev) {
    teamName = json.away_team_name;
    odds = json.away_odds;
    point = json.away_point;
  } else if (maxEV === json.home_ev) {
    teamName = json.home_team_name;
    odds = json.home_odds;
    point = json.home_point;
  } else {
    teamName = "Draw";
    odds = json.draw_odds;
  }
  
  if (market === "h2h") {
    return `The ${json.away_team_name} (away) take on the ${json.home_team_name} (home) at ${json.commence_time}. ${json.bookmaker}'s ${odds} on the ${teamName} moneyline looks to be a reasonable bet.`;
  } else if (market === "spreads") {
    return `The ${json.away_team_name} (away) take on the ${json.home_team_name} (home) at ${json.commence_time}. ${json.bookmaker}'s ${odds} on the ${teamName} at ${point} looks to be a reasonable bet.`;
  } else if (market === "totals") {
    return `The ${json.away_team_name} (away) take on the ${json.home_team_name} (home) at ${json.commence_time}. ${json.bookmaker}'s ${odds} on the ${teamName} at ${point} looks to be a reasonable bet.`;
  }
}

// Returns promise for Class 2 lambda invoke
export async function invokeClass2Lambda(specifiedBookmaker) {
  try {
    const response = axios.post('https://tyxb3xi5r3764fsfjnt4ef6rha0kwxaz.lambda-url.us-east-1.on.aws', {
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        "bookmakers": specifiedBookmaker
      }
    });

    return response;
    
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Function makes good on the promise, returning relevant information from marketData object
export async function getClass2LambdaResponse(specifiedBookmaker) {
  const marketData = await invokeClass2Lambda(specifiedBookmaker);
  console.log(marketData);
  const marketDataObject = marketData.data.data.message;
  console.log(marketDataObject)
  return marketDataObject;
}

export function parseClass2ReponseObject(json) {
  let id = json.id;
  let eventId = json.event_id;
  let leagueName = json.league_name;
  let market = json.market;
  let maxEV = json.max_ev;
  let teamName = "";
  let odds;
  let point;
  if (maxEV === json.away_ev) {
    teamName = json.away_team_name;
    odds = json.away_odds;
    point = json.away_point;
  } else if (maxEV === json.home_ev) {
    teamName = json.home_team_name;
    odds = json.home_odds;
    point = json.home_point;
  } else {
    teamName = "Draw";
    odds = json.draw_odds;
  }
  
  if (market === "h2h") {
    return `The ${json.away_team_name} (away) take on the ${json.home_team_name} (home) at ${json.commence_time}. ${json.bookmaker}'s ${odds} on the ${teamName} moneyline looks to be a reasonable bet.`;
  } else if (market === "spreads") {
    return `The ${json.away_team_name} (away) take on the ${json.home_team_name} (home) at ${json.commence_time}. ${json.bookmaker}'s ${odds} on the ${teamName} at ${point} looks to be a reasonable bet.`;
  } else if (market === "totals") {
    return `The ${json.away_team_name} (away) take on the ${json.home_team_name} (home) at ${json.commence_time}. ${json.bookmaker}'s ${odds} on the ${teamName} at ${point} looks to be a reasonable bet.`;
  }
}
