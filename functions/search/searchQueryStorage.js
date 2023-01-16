// This file houses functions neccessary to store user search queries in Vulcan
import axios from 'axios';

// Makes post request to AWA Lambda function which inserts UID into `users` table
export async function invokeAddUserToVulcanLambda(uid) {
    try {
      const response = axios.post('https://u6j5z2khsajkwnht3zodfsjufy0gknco.lambda-url.us-east-1.on.aws/', {
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          "user": uid
        }
      });

      return response;
      
    } catch (error) {
        console.error(error);
        return null;
    }
  }


export async function invokeAddUserSearchQuery(uid, searchQuery, searchResponse) {
    
    // It should be noted at outset that when we make an invoke call to addUserSearchQuery-function,
    // the insert statement contains a timestamp value set to the PGSQL function NOW(). We thus insert
    // the current time at which the query is made whenever we insert a userSearchQuery, despite not
    // passing it in to the response "data" header, infra.
    try {
      const response = axios.post('https://boiypqlfx6pjiaq5glasjrjp7e0yckqm.lambda-url.us-east-1.on.aws/', {
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            "user": uid,
            "search_query": searchQuery,
            "search_response": JSON.stringify(searchResponse),
        }
      });

        return response;
        
        } catch (error) {
            console.error(error);
            return null;
        }
    }
