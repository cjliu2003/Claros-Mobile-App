// import axios from 'axios';

// export const containsProfanity = (input) => {
//     let lowercaseInput = input.toLowerCase()
//     if (lowercaseInput.includes("fuck")) return true
//     if (lowercaseInput.includes("shit")) return true
//     if (lowercaseInput.includes("bitch")) return true
//     if (lowercaseInput.includes("damn")) return true
//     if (lowercaseInput.includes("slut")) return true
//     if (lowercaseInput.includes(" ho")) return true
//     if (lowercaseInput.includes("cunt")) return true
//     if (lowercaseInput.includes("pussy")) return true
//     if (lowercaseInput.includes("cock")) return true
//     if (lowercaseInput.includes("dick")) return true
// }

// // Function returns a promise to deliver binary classification.
// export async function performModeration(prompt) {
//   try {
//     // Send a request to the FT API
//     const response = await axios.post(`https://api.openai.com/v1/engines/${'text-moderation-004'}/completions`, {
//       prompt
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${'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'}`
//       }
//     });
//     return response;
//     const responseText = response.data.choices[0].text;
//     return responseText.includes('1') ? 1 : 0;
//   } catch (error) {
//     // Handle any errors that occurred during the request here
//     console.error(error);
//     return null;
//   }
// }

// // Function makes good on the promise
// export async function getModeration(prompt) {
//   const moderation = await performModeration(prompt);
// }
