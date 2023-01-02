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

def fetch_reporter(specified_bookmakers):

    conn = pool.getconn()
    cursor = conn.cursor()
    specified_bookmakers = tuple(specified_bookmakers)
    query = f"SELECT row_to_json(a) FROM ( SELECT * FROM reporter WHERE ( DATE(commence_time) = DATE(NOW()) OR DATE(commence_time) = DATE(NOW() + INTERVAL '1 day') ) AND bookmaker IN {specified_bookmakers} ORDER BY max_ev DESC LIMIT 1 ) AS a;"
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
