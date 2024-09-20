"use server"

export async function AskGoogle(prompt: string) {
  const { GoogleGenerativeAI } = require("@google/generative-ai")
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

  const result = await model.generateContent(prompt)

  return result.response.text()
}