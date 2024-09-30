"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

import { AskGoogle } from "@/app/google"
import { AskMistral } from "@/app/mistral"
import { savePrompt } from "@/app/savePrompt"

export function Home() {
  const [prompt, setPrompt] = useState("")
  const [mistralResult, setMistralResult] = useState("")
  const [googleResponse, setGoogleResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    formData.set("content", prompt)

    const id = await savePrompt(prompt)

    setIsLoading(true)

    try {
      const [mistralResult, googleResult] = await Promise.all([
        AskMistral(id, prompt),
        AskGoogle(id, prompt)
      ])
      
      setMistralResult(mistralResult)
      setGoogleResponse(googleResult)
    } catch (error) {
      console.error("Error fetching results:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Ask 2 LLMs at once (in development)
      </h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter your query"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              "Search"
            )}
          </Button>
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Mistral response</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-24">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <p>
                {mistralResult || "No result yet. Try searching for something!"}
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Gemini response</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-24">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <p>
                {googleResponse ||
                  "No result yet. Try searching for something!"}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}