// import axios from 'axios';

// // Function returns a promise to deliver binary classification.
// export async function performSemanticClassification(prompt) {
//   try {
//     // Send a request to the FT API
//     const response = await axios.post(`https://api.openai.com/v1/engines/${'ada:ft-claros-2023-01-01-19-58-27'}/completions`, {
//       prompt,
//       max_tokens: 6,
//       temperature: 0,
//       top_p: 1,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${'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'}`
//       }
//     });

//     const responseText = response.data.choices[0].text;
//     if (responseText.includes('1')) {
//       return 1;
//     } else if (responseText.includes('2')) {
//       return 2;
//     } else {
//       return 0;
//     }
//   } catch (error) {
//     // Handle any errors that occurred during the request here
//     console.error(error);
//     return null;
//   }
// }

// // Function makes good on the promise
// export async function getClassification(prompt) {
//   const classification = await performSemanticClassification(prompt);
// }
