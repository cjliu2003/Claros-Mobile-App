import axios from 'axios';

// Returns promise for lambda invoke used in Claros Search product
export async function invokeSearchLambda() {
  try {
    const response = await axios.post(`https://dpllv1ww9i.execute-api.us-east-1.amazonaws.com/default/searchFetch`);
    const responseData = response.data.data.message;
    return responseData;
    
  } catch (error) {
    // Handle any errors that occurred during the request here
    console.error(error);
    return null;
  }
}

// Function makes good on the promise from Claros Search invoke
export async function getSearchLambdaResponse() {
  const marketData = await invokeSearchLambda();
  console.log(marketData);
  return marketData;
}
