import { NextResponse } from "next/server"
import axios from "axios"

export async function POST(req) {
  try {
    const body = await req.json()
    const { data } = await axios.post(
      `${process.env.BACKEND_URL}/run-workflow`,
      body
    )
    return NextResponse.json(data)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Backend request failed" }, { status: 500 })
  }
}
