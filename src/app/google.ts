"use server"

// import { saveGoogle } from "./saveGoogle"

import {GoogleGenerativeAI} from  "@google/generative-ai"

export async function AskGoogle(prompt: string) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

  const result = await model.generateContent(prompt)
  // await saveGoogle(result.response.text())

  return result.response.text()
}