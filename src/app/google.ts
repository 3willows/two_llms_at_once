"use server"

import { saveGoogle } from "./saveGoogle"

import {GoogleGenerativeAI} from  "@google/generative-ai"

export async function AskGoogle(id:number, prompt: string) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

  const overallResult= await model.generateContent(prompt)

  const text = overallResult.response.text()

  await saveGoogle(id, text)

  return text
}