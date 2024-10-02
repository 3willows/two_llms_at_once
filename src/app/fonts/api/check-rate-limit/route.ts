import { NextResponse } from 'next/server'
import { ratelimit } from '@/app/rate-limit'

export async function GET() {
  const identifier = 'api' // You can use a more specific identifier if needed
  const result = await ratelimit.limit(identifier)
  
  return NextResponse.json({ success: result.success })
}