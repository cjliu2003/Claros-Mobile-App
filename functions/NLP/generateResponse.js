import axios from 'axios';
import { containsProfanity } from "./containsProfanity"
const { Configuration, OpenAIApi } = require("openai");

// Function returns a promise to deliver binary classification.
async function performBinarySemanticClassification(prompt) {
  try {
    // Send a request to the FT API
    const response = await axios.post(`https://api.openai.com/v1/engines/${'ada:ft-claros:ada-binary-semantic-classification-2022-12-31-14-54-38'}/completions`, {
      prompt,
      max_tokens: 2,
      temperature: 0,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${'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'}`
      }
    });

    const responseText = response.data.choices[0].text;
    return responseText.includes('1') ? 1 : 0;
  } catch (error) {
    // Handle any errors that occurred during the request here
    console.error(error);
    return null;
  }
}

// Function makes good on the promise
async function getClassification(prompt) {
  const classification = await performBinarySemanticClassification(prompt);
}

// Function returns a promise to invoke the Lambda function at the API Gateway endpoint
async function invokeLambda() {
  try {
    const response = await axios.post(`https://3jfnca8cd3.execute-api.us-east-1.amazonaws.com/default/class1Fetch`);
    const responseData = response.data.data.message.home_team_name;
    console.log(responseData)
    return responseData;
    
  } catch (error) {
    // Handle any errors that occurred during the request here
    console.error(error);
    return null;
  }
}

// Function makes good on the promise, returning relevant information from marketData object
async function getLambdaResponse() {
  const marketData = await invokeLambda();
  // console.log(marketData)
}

// Function returns a promise to deliver binary classification.
async function formCompletionFromData() {
  try {
    // Send a request to the FT API
    const prompt = "Construct a completion using the following data, in the following structure: The [home_team_name] are taking on the [away_team_name] at [commence_time]. [bookmaker]'s [home_odds] looks to have value, at [max_ev]% expected value.'";
    
    const response = await axios.post(`https://api.openai.com/v1/engines/${'text-davinci-003'}/completions`, {
      prompt,
      max_tokens: 1024,
      temperature: 0,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${'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'}`
      }
    });

    const completion = response.data.choices[0].text;
    return completion;
    
  } catch (error) {
    // Handle any errors that occurred during the request here
    console.error(error);
    return null;
  }
}

// Function makes good on the promise
async function getCompletion() {
  const completion = await formCompletionFromData();
  return completion;
}


// Driver function to return appropriate, user input dependent responses
export async function generateResponse(prompt) {
  const classification = await performBinarySemanticClassification(prompt);
  if (classification === 1) {
    const completion = await getCompletion();
    return completion;
    return "Give me one moment to fetch realtime market data. Fetching now ..."

  } else if (classification === 0) {
    return "I'm a large language model trained to help with sports betting related inquires. Is there something betting related I can help with?";
  
  } else {
    return "Sorry, there was an error getting the classification. Please try again later.";
  }
}
