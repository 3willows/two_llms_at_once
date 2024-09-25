//  "use server"
 
// import { revalidatePath } from "next/cache"
// import { prisma } from "@/lib/prisma"
 
// export async function saveOpenAI(content: string) {
//   "use server"
//   await prisma.openAI.create({
//     data: {
//       content,
//     },
//   })

//   revalidatePath("/")
// }