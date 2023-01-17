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

def write_users(uid, user_search_query, response_data):

    conn = pool.getconn()
    cursor = conn.cursor()

    query = f"INSERT INTO searches (uid, user_search_query, response_data, timestamp) VALUES ('{uid}', '{user_search_query}', '{response_data}', NOW());"
    print(query)
    try:
        cursor.execute(query)
        conn.commit()
        message = {
            'message': 'Successfully inserted user_search_query'
        }
    except Exception as e:
        message = {
            'message': 'Error: ' + str(e)
        }
    
    # Close the cursor and connection
    cursor.close()
    conn.close()

    # Return the connection to the pool
    pool.putconn(conn)
    return message

def lambda_handler(event, context):
    request_body_str = event['body'] # <-- Get the body from the `event` object
    request_body = json.loads(request_body_str) # <-- The body is in string form so we must convert to a JSON object
    user = request_body['data']['user']
    search_query = request_body['data']['search_query']
    search_response = request_body['data']['search_response']
    print(type(search_response))

    response = write_users(user, search_query, search_response)

    if 'Successfully' in response['message']:
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
            },
            "body": json.dumps({
                "data": response
            })
        }
    else:
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
            },
            "body": json.dumps({
                "data": response
            })
        }