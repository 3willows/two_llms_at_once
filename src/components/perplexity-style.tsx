"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { AskGoogle } from "@/app/google"
import { AskOpenAI } from "@/app/openAI"
import { savePrompt } from "@/app/savePrompt"

import { type CoreMessage } from "ai"
import { continueConversation } from "@/app/actions"
import { readStreamableValue } from "ai/rsc"

export const maxDuration = 30

export function PerplexityStyle() {
  // const [prompt, setPrompt] = useState("")
  // const [openAiResponse, setOpenAiResponse] = useState("")
  // const [googleResponse, setGoogleResponse] = useState("")

  const [messages, setMessages] = useState<CoreMessage[]>([])
  const [input, setInput] = useState("")
  const [data, setData] = useState<any>()

  const customHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.set("name", input)

    formData.set("content", input)
    await savePrompt(formData)

    const newMessages: CoreMessage[] = [
      ...messages,
      { content: input, role: "user" },
    ]

    setMessages(newMessages)
    setInput("")

    const result = await continueConversation(newMessages)
    setData(result.data);

    for await (const content of readStreamableValue(result.message)) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: content as string,
        },
      ])
    }
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
            onChange={(e) => setInput(e.target.value)}
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
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}

            {messages.map((m, i) => (
              <div key={i} className="whitespace-pre-wrap">
                {m.role === "user" ? "User: " : "AI: "}
                {m.content as string}
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
