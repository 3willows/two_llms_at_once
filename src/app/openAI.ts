"use server"
import { createOpenAI } from "@ai-sdk/openai"
import { generateText } from "ai"
import { streamText } from 'ai';
import { saveOpenAI } from "./saveOpenAI"

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function AskOpenAI(promptFromUser: string) {
  const { text } = await generateText({
    model: openai("gpt-4-turbo"),
    prompt: promptFromUser,
  })

  const { textStream } = await streamText({
    model: openai('gpt-4-turbo'),
    prompt: promptFromUser,
  });
  
  for await (const textPart of textStream) {
    console.log(textPart);
  }

  await saveOpenAI(text)

  return text
}
