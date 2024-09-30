import { createClient } from "../../../utils/supabase/server"

export default async function Notes() {
  const supabase = createClient()

  const { data: notes } = await supabase.from("notes").select()

  const { data, error } = await supabase
    .from("notes")
    .insert({title: "Denmark" })
    .select()

    if (error) {
      console.error("Error inserting data:", error)
      // Handle the error appropriately
    } else {
      console.log("Inserted data:", data)
      // Use the inserted data as needed
    }

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}
