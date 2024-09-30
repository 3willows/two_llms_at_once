"use server"

import { createClient } from "../../utils/supabase/server"

export async function savePrompt(prompt: string) {
  "use server"
  const supabase = createClient()

  const { data, error } = await supabase
    .from("records")
    .insert({ prompt })
    .select('id')
    .single()
    
  if (error) {
    console.error("Error inserting data:", error)
    return null
  } else {
    console.log("Inserted data:", data)
    console.dir(data.id)
    return data.id
  }
}
