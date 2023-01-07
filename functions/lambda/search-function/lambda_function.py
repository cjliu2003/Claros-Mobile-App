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


def fetch_reporter():

    conn = pool.getconn()
    cursor = conn.cursor()

    query = "SELECT row_to_json(a) FROM ( SELECT * FROM reporter) a LIMIT 50;"
    
    try:
        cursor.execute(query)
    except:
        return

    query_output = cursor.fetchall()
    
    clean_output = []
    for row in query_output:
        clean_output.append(row[0])
    
    # Close the cursor and connection
    cursor.close()
    conn.close()

    # Return the connection to the pool
    pool.putconn(conn)

    return clean_output # <-- Fetches most receent snapshot from all 'lines' tables for events occuring today

def lambda_handler(event, context):
    response = fetch_reporter()
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
