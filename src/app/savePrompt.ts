"use server"

import { createClient } from "../../utils/supabase/server"

export async function savePrompt(prompt: string) {
  "use server"

  // const content = formData.get("content") as string

  const supabase = createClient()

  const { data, error } = await supabase
    .from("prompts")
    .insert({ prompt })
    .select()
    
  if (error) {
    console.error("Error inserting data:", error)
    // Handle the error appropriately
  } else {
    console.log("Inserted data:", data)
    // Use the inserted data as needed
  }
}
