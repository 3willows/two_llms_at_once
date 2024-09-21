 "use server"
 
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
 
export async function createPost(formData: FormData) {
  "use server"
  const name = formData.get("name") as string

  await prisma.post.create({
    data: {
      name,
    },
  })

  revalidatePath("/")
}