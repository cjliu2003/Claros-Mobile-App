// /*
//   This script houses NLP infrastructure to extract bookmaker key word from incoming user question.
// */
// import axios from 'axios';

// // Function returns a promise to deliver extraction completion.
// export async function performBookmakerExtraction(input) {
//   try {
//     const prompt = `Extract all the bookmakers from this text: "${input}"`;
//     const response = await axios.post(`https://api.openai.com/v1/engines/${'text-davinci-003'}/completions`, {
//       prompt,
//       max_tokens: 2048,
//       temperature: 0.5,
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
//     return responseText
    
//   } catch (error) {
//     // Handle any errors that occurred during the request here
//     console.error(error);
//     return null;
//   }
// }

// // Function makes good on the promise
// export async function getExtraction(input) {
//   const bookExtraction = await performBookmakerExtraction(input);
//   // console.log(bookExtraction)
//   return bookExtraction
// }

// export async function interpretExtraction(input) {
//   const bookmakerKeys = ["barstool", "betonlineag", "betfair", "betmgm", "betrivers", "betus",
//                         "bovada", "circasports", "draftkings", "fanduel", "foxbet", "gtbets", "intertops",
//                         "mybookieag", "pointsbetus", "sugarhouse", "twinspires", "williamhill_us", "unibet_eu",
//                         "unibet_us", "betsson", "betvictor", "bookmakereu", "matchbook", "pinnacle", "williamhill",
//                         "superbook", "nordicbet", "lowvig"]

//   const extraction = await getExtraction(input); // <-- Neccessarily a string (is direct NL output)

//   let cleanedExtraction;
//   cleanedExtraction = extraction.toLowerCase(); // <-- Make everything lowercase
//   cleanedExtraction = cleanedExtraction.split(/ |\n/); // <-- array of all books mentioned by user

//   // Now we clean each bookmaker and extract their PGSQL stored keys
//   let bookmakers = [];
//   for (let i = 0; i < cleanedExtraction.length; i++) {
//     let finalExtraction;
//     finalExtraction = cleanedExtraction[i].replace(/[^a-zA-Z0-9]/g, '');
//     for (let j = 0; j < bookmakerKeys.length; j++) {
//       if (bookmakerKeys[j] === cleanedExtraction[i]) {
//         bookmakers.push(bookmakerKeys[j]);
//       }
//     }
//   }

//   let bookmakersString = ""; // <-- Decide to return bookmaker string, which we pass into AWS lambda function, which completes the PGSQL query the lambda function makes
//   for (let i = 0; i < bookmakers.length; i++) {
//     bookmakersString += "'"
//     bookmakersString += bookmakers[i];
//     bookmakersString += "'"
//     bookmakersString += ","
//   }
//   bookmakersString = bookmakersString.slice(0, -1);

//   return bookmakersString;
// }
