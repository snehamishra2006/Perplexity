// contain code of conntecting to AI

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.7-flash",
  apiKey: process.env.GEMINI_API_KEY
});

// export async function testAi(){
//     model.invoke("What is the capital of India").then((response)=>{
//         console.log(response.text)
//     })
// }

