// import axios from 'axios';
// import { parseClass1ReponseObject, parseClass2ReponseObject } from "./fetchVulcan"

// // Function returns NL completion for class 1 responses
// export async function formClass0Completion(input) {
//   try {
//     rudimentString = "I'm a artifical intelligence powered assistant trained to help with sportsbetting related inquires. Is there something betting related I can help with?";
//     const prompt = `Construct a completion which conveys the same semantics: ${rudimentString}`;
//     const response = await axios.post(`https://api.openai.com/v1/engines/${'text-davinci-003'}/completions`, {
//       prompt,
//       max_tokens: 2048,
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
    
//     const completion = response.data.choices[0].text.slice(2);
//     return completion;
    
//   } catch (error) {
//     // Handle any errors that occurred during the request here
//     console.error(error);
//     return null;
//   }
// }

// // Function makes good on the promise to return class 1 NL completion
// export async function getClass0Completion(input) {
//   const completion = await formClass0Completion(input);
//   return completion;
// }

// // Function returns NL completion for class 1 responses
// export async function formClass1Completion(marketData) {
//   try {
//     const rudimentString = parseClass1ReponseObject(marketData)
//     const prompt = `Construct a completion which conveys the same semantics in a clear tone.: ${rudimentString}`;
//     console.log(prompt)
//     const response = await axios.post(`https://api.openai.com/v1/engines/${'text-davinci-003'}/completions`, {
//       prompt,
//       max_tokens: 2048,
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
    
//     const completion = response.data.choices[0].text.slice(2);
//     return completion;
    
//   } catch (error) {
//     // Handle any errors that occurred during the request here
//     console.error(error);
//     return null;
//   }
// }

// // Function makes good on the promise to return class 1 NL completion
// export async function getClass1Completion(marketData) {
//   const completion = await formClass1Completion(marketData);
//   return completion;
// }

// // Function returns NL completion for class 1 responses
// export async function formClass2Completion(marketData) {
//   try {
//     console.log(marketData);
//     const rudimentString = parseClass2ReponseObject(marketData)
//     console.log(rudimentString);
//     const prompt = `Construct a completion which conveys the same semantics in a clear tone.: ${rudimentString}`;
//     console.log(prompt)

//     const response = await axios.post(`https://api.openai.com/v1/engines/${'text-davinci-003'}/completions`, {
//       prompt,
//       max_tokens: 2048,
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
    
//     const completion = response.data.choices[0].text.slice(2);
//     return completion;
    
//   } catch (error) {
//     // Handle any errors that occurred during the request here
//     console.error(error);
//     return null;
//   }
// }

// // Function makes good on the promise to return class 1 NL completion
// export async function getClass2Completion(marketData) {
//   const completion = await formClass2Completion(marketData);
//   return completion;
// }
