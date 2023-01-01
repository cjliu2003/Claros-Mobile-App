import axios from 'axios';

// Function returns a promise to deliver binary classification.
export async function performBinarySemanticClassification(prompt) {
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
export async function getClassification(prompt) {
  const classification = await performBinarySemanticClassification(prompt);
}
