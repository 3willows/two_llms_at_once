"use server"

import { createClient } from "../../utils/supabase/server"

export async function saveGoogle(id: number, google_answer: string): Promise<boolean> {
  const supabase = createClient()

  const { error } = await supabase
    .from("records")
    .update({ google_answer })
    .eq('id', id)
    .select()
    .single()
    
  if (error) {
    console.error("Error updating data:", error)
    return false
  } else {
    console.log("Google answered")
    return true
  }
}