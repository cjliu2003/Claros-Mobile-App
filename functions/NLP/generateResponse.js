import axios from 'axios';
import { containsProfanity } from "./contentModeration";
import { performSemanticClassification, getClassification } from "./semanticClassification";
import { interpretExtraction } from "./class2Extraction";
import { getClass2LambdaResponse, getClass1LambdaResponse, parseClass1ReponseObject } from "./fetchVulcan";
import { getClass2Completion, getClass1Completion, getClass0Completion } from "./responseCompletion";
const { Configuration, OpenAIApi } = require("openai");

// Driver function to return appropriate, user input dependent responses
export async function generateResponse(prompt) {
  // First check profanity
  if (containsProfanity(prompt) === true) {
    return "I'm sorry if I haven't been helpful. Is there anything sportsbetting related I can help you with?"
  }
  
  const classification = await performSemanticClassification(prompt);
  console.log(classification)
  if (classification === 1) {
    const marketData = await getClass1LambdaResponse();
    const completion = await getClass1Completion(marketData);
    return completion;
    
  } if (classification === 0) {
    const completion = await getClass0Completion();
    return completion;
  
  } else if (classification === 2) {
    
    const books = await interpretExtraction(prompt)
    const marketData = await getClass2LambdaResponse(books);
    // const completion = await getClass2Completion(marketData);
    const completion = books;
    console.log(books)
    console.log(marketData)
    // console.log(completion)
    return completion;
    
  } else {
    return "Sorry, there was an error getting the classification. Please try again later or contact info@claros.ai for support.";
  }
}
