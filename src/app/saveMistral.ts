"use server"

import { createClient } from "../../utils/supabase/server"

export async function saveMistral(id: number, mistral_answer: string): Promise<boolean> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("records")
    .update({ mistral_answer })
    .eq('id', id)
    .select()
    .single()
    
  if (error) {
    console.error("Error updating data:", error)
    return false
  } else {
    console.log("Updated data:", data)
    return true
  }
}