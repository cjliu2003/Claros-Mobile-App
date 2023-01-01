const { Pool, Client } = require("pg");
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

const envPath = path.join(__dirname, '..', '.env')
const envConfig = dotenv.parse(fs.readFileSync(envPath))

dotenv.config({ path: envPath, ...envConfig })

const credentials = {
  user: process.env.VULCAN_USER,
  host: process.env.VULCAN_HOST,
  database: process.env.VULCAN_DATABASE,
  password: process.env.VULCAN_PASSWORD,
  port: process.env.VULCAN_PORT,
};
const pool = new Pool(credentials)

// Function returns promise to deliver lines, fetched from `reporter`
// Variable inputs to allow for
async function fetchMarket(team, bookmakers) {

  let bookmakersString = ""
  for (let i = 0; i < bookmakers.length; i++) {
    bookmakersString += "'"
    bookmakersString += bookmakers[i]
    bookmakersString += "', "
  }
  bookmakersString = bookmakersString.slice(0, -2)

  let query = "SELECT * FROM reporter WHERE (home_team_name = '" + team + "' OR away_team_name = '" + team + "') AND bookmaker IN (" + bookmakersString + ") ORDER BY max_ev DESC;";

  // Connect with a client, from pool.
  const client = await pool.connect();

  // Query the events table
  const result = await client.query(query);

  // Release the client back to the connection pool
  client.end();
  return result.rows;
}

async function returnMarket() {
  const bookmakers = ['bovada', 'betonlineag', 'mybookieag', 'barstool']
  const team = 'Green Bay Packers'
  const market = await fetchMarket(team, bookmakers);
  
  return market
}

let market;
// Use async / await functionality to return JSON data
returnMarket().then(result => {
  market = result;
  console.log(market)
  console.log(market.length)
})
