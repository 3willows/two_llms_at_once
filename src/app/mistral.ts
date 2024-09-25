"use server"
import { createMistral } from '@ai-sdk/mistral';
import { generateText } from "ai"

const mistral = createMistral({
apiKey: process.env.MISTRAL_API_KEY,
})

export async function AskMistral(promptFromUser: string) {
  const { text } = await generateText({
    model: mistral('mistral-large-latest'),
    prompt: promptFromUser
  });

  return text
}