import axios from 'axios';
import { containsProfanity } from "./containsProfanity";
import { performBinarySemanticClassification, getClassification } from "./binarySemanticClassification";
import { invokeLambda, getLambdaResponse, parseReponseObject } from "./fetchVulcan";
const { Configuration, OpenAIApi } = require("openai");

// Function returns a promise to deliver binary classification.
async function formCompletionFromData(marketData) {
  try {
    const rudimentString = parseReponseObject(marketData)
    const prompt = `Construct a completion which conveys the same semantics in a clear, happy, respectful tone.: ${rudimentString}`;
    console.log(prompt)
    const response = await axios.post(`https://api.openai.com/v1/engines/${'text-davinci-003'}/completions`, {
      prompt,
      max_tokens: 2048,
      temperature: 1,
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
    console.log(completion);
    return completion;
    
  } catch (error) {
    // Handle any errors that occurred during the request here
    console.error(error);
    return null;
  }
}

// Function makes good on the promise
async function getCompletion(marketData) {
  const completion = await formCompletionFromData(marketData);
  return completion;
}

// Driver function to return appropriate, user input dependent responses
export async function generateResponse(prompt) {
  const classification = await performBinarySemanticClassification(prompt);
  if (classification === 1) {
    const marketData = await getLambdaResponse();
    const completion = await getCompletion(marketData);
    return completion;
    
  } else if (classification === 0) {
    return "I'm a artifical intelligence powered assistant trained to help with sports betting related inquires. Is there something betting related I can help with?";
  
  } else {
    return "Sorry, there was an error getting the classification. Please try again later or contact info@claros.ai for support.";
  }
}
