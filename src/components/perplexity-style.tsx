"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { AskGoogle } from "@/app/google"
import { AskOpenAI } from "@/app/openAI"
import { createPost } from "@/app/writesqlite/createPost"
import { savePrompt } from "@/app/savePrompt"

import { useChat } from "ai/react"

export function PerplexityStyle() {
  // const [prompt, setPrompt] = useState("")
  // const [openAiResponse, setOpenAiResponse] = useState("")
  // const [googleResponse, setGoogleResponse] = useState("")

  const { messages, input, handleInputChange, handleSubmit } = useChat()

  const customHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    formData.set("name", input)
    await createPost(formData)

    formData.set("content", input)
    await savePrompt(formData)

    // const openAiResult = await AskOpenAI(input)
    // setOpenAiResponse(openAiResult)
    // const googleResult = await AskGoogle(input)
    // setGoogleResponse(googleResult)

    handleSubmit(e)
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Ask 2 LLMs at once
      </h1>
      <form onSubmit={customHandleSubmit} className="mb-6">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter your query"
            value={input}
            onChange={handleInputChange}
            className="flex-grow"
          />
          <Button type="submit">Search</Button>
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Open AI response</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <p>
              {openAiResponse || "No result yet. Try searching for something!"}
            </p> */}
            {messages.map((m) => (
              <div key={m.id} className="whitespace-pre-wrap">
                {m.role === "user" ? "User: " : "AI: "}
                {m.content}
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Gemini response</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <p>
              {googleResponse || "No result yet. Try searching for something!"}
            </p> */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
