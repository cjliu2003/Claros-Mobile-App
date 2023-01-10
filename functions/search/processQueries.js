// This script processes seach queries, returning market data in response
const algoliasearch = require('algoliasearch')

const client = algoliasearch('N6218C146E', '4af2629cfd5d781f7d21f06f8254179a');
const index = client.initIndex('test_index');

export const searchIndex = async (searchQuery) => {
    let indexingResults;
    try {
        const { hits } = await index.search(searchQuery, {'hitsPerPage': 100});
        console.log(hits.length);
        indexingResults = hits;
        
        // Now for each element in the response array, we extract desired JSON data
        let jsonData = [];
        for (let i = 0; i < indexingResults.length; i++) {
            const lineObject = {};
            lineObject["away_ev"] = indexingResults[i].away_ev;
            lineObject["away_odds"] = indexingResults[i].away_odds;
            lineObject["away_point"] = indexingResults[i].away_point;
            lineObject["away_team_name"] = indexingResults[i].away_team_name;
            lineObject["bookmaker"] = indexingResults[i].bookmaker;
            lineObject["commence_time"] = indexingResults[i].commence_time;
            lineObject["draw_ev"] = indexingResults[i].draw_ev;
            lineObject["draw_odds"] = indexingResults[i].draw_odds;
            lineObject["draw_point"] = indexingResults[i].draw_point;
            lineObject["event_id"] = indexingResults[i].event_id;
            lineObject["home_ev"] = indexingResults[i].home_ev;
            lineObject["home_odds"] = indexingResults[i].home_odds;
            lineObject["home_point"] = indexingResults[i].home_point;
            lineObject["home_team_name"] = indexingResults[i].home_team_name;
            lineObject["id"] = indexingResults[i].id;
            lineObject["league_name"] = indexingResults[i].league_name;
            lineObject["market"] = indexingResults[i].market;
            lineObject["max_ev"] = indexingResults[i].max_ev;
            lineObject["away_point"] = indexingResults[i].away_point;
        
            jsonData.push(lineObject);
        };
        // console.log(jsonData)
        return jsonData;

    } catch (err) {
        console.log(err);
        return;
    }
  };