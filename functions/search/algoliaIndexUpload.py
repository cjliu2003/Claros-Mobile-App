import json
import psycopg2
import psycopg2.pool
from algoliasearch.search_client import SearchClient

def fetch_reporter(): # <-- Fetches entire contents of `reporter`
    # Create a connection pool with 5 connections
    pool = psycopg2.pool.SimpleConnectionPool(5,
            10,
            host='database-5.c78tyhcr0yxb.us-east-1.rds.amazonaws.com',
            user='jax',
            password='getrichordietrying',
            dbname='vulcan3')

    conn = pool.getconn()
    cursor = conn.cursor()

    query = f"SELECT row_to_json(a) FROM ( SELECT * FROM reporter ORDER BY max_ev DESC) as a;"
    try:
        cursor.execute(query)
    except Exception as e:
        print(e)
        return()

    query_output = cursor.fetchall()
    json_output = [item[0] for item in query_output]
    
    # Close the cursor and connection
    cursor.close()
    conn.close()

    # Return the connection to the pool
    pool.putconn(conn)
    return json_output # <-- Fetches most receent snapshot from all 'lines' tables for events occuring today

def clean_for_algolia(json_data): # <-- Prepares data by adding objectId

    count = 0
    for item in json_data:
        item['objectID'] = count
        count += 1

    return json_data


def upload_to_algolia(json_data): # <-- Takes in a list of json objects from PGSQL
    client = SearchClient.create("N6218C146E", "4af2629cfd5d781f7d21f06f8254179a") # <-- Init Algolia client
    index = client.init_index("test_index") # <-- The index to which we are uploading
    records = json_data
    res = index.save_objects(records)



reporterContents = fetch_reporter()
clean_data = clean_for_algolia(reporterContents)
upload_to_algolia(clean_data)