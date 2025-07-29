import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Received request:", req.url);
  const res = NextResponse.json({ success: true, message: "Sessão terminada" });

  res.cookies.delete("auth_token");
  res.cookies.delete("refresh_token");

  return res;
}
