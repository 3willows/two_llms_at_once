//  "use server"
 
// import { revalidatePath } from "next/cache"
// import { prisma } from "@/lib/prisma"
 
// export async function savePrompt(formData: FormData) {
//   "use server"
//   const content = formData.get("content") as string

//   await prisma.prompt.create({
//     data: {
//       content,
//     },
//   })

//   revalidatePath("/")
// }