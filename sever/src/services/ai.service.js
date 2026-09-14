// contain code of conntecting to AI

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

import {ChatMistralAI} from  "@langchain/mistralai"

import {HumanMessage, SystemMessage, AIMessage, AIMessageChunk} from "langchain"


// Gemini model
const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});


// Mistral Model = for generating chat title
// const mistralModel = new ChatMistralAI({
//     model: "mistral-small-latest",
//     apiKey: process.env.MISTRAL_API_KEY
// })


// Initialize model with automatic retries for HTTP 429 rate limits
const mistralModel = new ChatMistralAI({
  model: "open-mistral-7b",
  apiKey: process.env.MISTRAL_API_KEY,
  maxRetries: 5, 
});


export async function generateChatTitle(message) {

    const response = await mistralModel.invoke([
        new SystemMessage(`
            You are a helpful assistant that generates concise and descriptive titles for chat conversations.
            
            User will provide you with the first message of a chat conversation, and you will generate a title that captures the essence of the conversation in 2-4 words. The title should be clear, relevant, and engaging, giving users a quick understanding of the chat's topic.    
        `),
        new HumanMessage(`
            Generate a title for a chat conversation based on the following first message:
            "${message}"
            `)
    ])

    return response.text;

}


// Gemini model for response 
export async function generateResponse(messages) {
    console.log(messages)

    const response = await agent.invoke({
        messages: [
            new SystemMessage(`
                You are a helpful and precise assistant for answering questions.
                If you don't know the answer, say you don't know. 
                If the question requires up-to-date information, use the "searchInternet" tool to get the latest information from the internet and then answer based on the search results.
            `),
            ...(messages.map(msg => {
                if (msg.role == "user") {
                    return new HumanMessage(msg.content)
                } else if (msg.role == "ai") {
                    return new AIMessage(msg.content)
                }
            })) ]
    });

    return response.messages[ response.messages.length - 1 ].text;

}

