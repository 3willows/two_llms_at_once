import { NextResponse } from 'next/server'
import { ratelimit } from '@/app/rate-limit'

export async function GET() {
  const identifier = 'api' 
  const result = await ratelimit.limit(identifier)
  
  return NextResponse.json({
    success: result.success,
    remaining: result.remaining,
    limit: result.limit,
    reset: result.reset
  })
}