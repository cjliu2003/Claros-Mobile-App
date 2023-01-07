import json
import psycopg2
import psycopg2.pool

# Create a connection pool with 5 connections
pool = psycopg2.pool.SimpleConnectionPool(5,
        10,
        host='database-5.c78tyhcr0yxb.us-east-1.rds.amazonaws.com',
        user='jax',
        password='getrichordietrying',
        dbname='vulcan3')

def fetch_reporter(tokenized_search_query):

    conn = pool.getconn()
    cursor = conn.cursor()

    # Build the WHERE portion of the PGSQL query, from the tokenized_search_query
    where_string = "WHERE "
    for token in tokenized_search_query:
        component = f" LOWER(league_name) LIKE '%{token}%' OR LOWER(home_team_name) LIKE '%{token}%' OR  LOWER(away_team_name) LIKE '%{token}%' OR LOWER(bookmaker) LIKE '%{token}%' OR LOWER(market) LIKE '%{token}%' OR"
        where_string += component

    where_string = where_string[:-3]

    query = f"SELECT row_to_json(a) FROM ( SELECT * FROM reporter {where_string} ) as a;"
    print(query)
    try:
        cursor.execute(query)
    except:
        return

    query_output = cursor.fetchall()
    
    # Close the cursor and connection
    cursor.close()
    conn.close()

    # Return the connection to the pool
    pool.putconn(conn)
    return query_output[0][0] # <-- Fetches most receent snapshot from all 'lines' tables for events occuring today

def lambda_handler(event, context):
    request_body_str = event['body']
    request_body = json.loads(request_body_str)
    specified_bookmakers = request_body['data']['bookmakers']

    response = fetch_reporter(specified_bookmakers)
    message = {
        'message': response
    }

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
        },
        "body": json.dumps({
            "data": message
        })
    }

search_query = "Best lines for the lakers vs suns game"
tokenized_search_query = ["best", "lines", "for", "the", "lakers", "vs", "suns", "game"]

fetch_reporter(tokenized_search_query)