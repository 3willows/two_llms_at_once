"use server"
import { createMistral } from '@ai-sdk/mistral';
import { generateText } from "ai"
import { saveMistral } from './saveMistral';

const mistral = createMistral({
apiKey: process.env.MISTRAL_API_KEY,
})

export async function AskMistral(id: number , promptFromUser: string) {
  const { text } = await generateText({
    model: mistral('mistral-large-latest'),
    prompt: promptFromUser
  });

  await saveMistral(id, text)

  return text
}