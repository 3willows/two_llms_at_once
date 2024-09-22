"use server"
import { createOpenAI } from "@ai-sdk/openai"
import { generateText } from "ai"
import { saveOpenAI } from "./saveOpenAI"

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function AskOpenAI(promptFromUser: string) {
  const { text } = await generateText({
    model: openai("gpt-4-turbo"),
    prompt: promptFromUser,
  })

  await saveOpenAI(text)

  return text
}
