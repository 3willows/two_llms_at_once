"use server"
import { createMistral } from '@ai-sdk/mistral';
import { generateText } from "ai"
import { createClient } from '../../utils/supabase/server';

const mistral = createMistral({
apiKey: process.env.MISTRAL_API_KEY,
})

export async function AskMistral(promptFromUser: string) {

  const supabase = createClient()

  const { data, error } = await supabase
    .from("notes")
    .insert({title: promptFromUser })
    .select()

    if (error) {
      console.error("Error inserting data:", error)
      // Handle the error appropriately
    } else {
      console.log("Inserted data:", data)
      // Use the inserted data as needed
    }

  const { text } = await generateText({
    model: mistral('mistral-large-latest'),
    prompt: promptFromUser
  });

  return text
}