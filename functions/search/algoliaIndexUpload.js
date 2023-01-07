// This script fetches `reporter` contents and sends to Algolia for indexing.
const { Client } = require('pg');
const algoliasearch = require('algoliasearch')


// Connect and authenticate with your Algolia app
const client = algoliasearch('N6218C146E', '4af2629cfd5d781f7d21f06f8254179a')
const index = client.initIndex('test_index')

const objects = [{
        id: 1686128,
        event_id: '3739b7f1abff4b4ea75e3dea90646877',
        commence_time: '2023-01-08T00:07:00Z',
        league_name: 'NHL',
        home_team_name: 'Montréal Canadiens',
        away_team_name: 'St Louis Blues',
        bookmaker: 'onexbet',
        market: 'totals',
        home_odds: '132',
        home_point: '6.5',
        home_ev: '10.7104984093319',
        away_odds: '-141',
        away_point: '6.5',
        away_ev: '-10.6420583169754',
        draw_odds: null,
        draw_point: null,
        draw_ev: null,
        max_ev: '10.7104984093319',
        objectID: '10'
    }, {
        id: 1686128,
        event_id: '3739b7f1abff4b4ea75e3dea90646877',
        commence_time: '2023-01-08T00:07:00Z',
        league_name: 'NHL',
        home_team_name: 'Montréal Canadiens',
        away_team_name: 'St Louis Blues',
        bookmaker: 'onexbet',
        market: 'totals',
        home_odds: '132',
        home_point: '6.5',
        home_ev: '10.7104984093319',
        away_odds: '-141',
        away_point: '6.5',
        away_ev: '-10.6420583169754',
        draw_odds: null,
        draw_point: null,
        draw_ev: null,
        max_ev: '10.7104984093319',
        objectID: '20'
    }];
  
index.saveObjects(objects).then(({ objectIDs }) => {
    console.log(objectIDs);
  });
