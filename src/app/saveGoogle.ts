 "use server"
 
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
 
export async function saveGoogle(content: string) {
  "use server"
  await prisma.google.create({
    data: {
      content,
    },
  })

  revalidatePath("/")
}