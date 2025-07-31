import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Received request:", req.url);

  const res = NextResponse.json({
    success: true,
    message: "Sessão terminada",
  });

  const cookieOptions = {
    path: "/",
  };

  res.cookies.set("auth_token", "", { ...cookieOptions, maxAge: 0 });
  res.cookies.set("token", "", { ...cookieOptions, maxAge: 0 });
  res.cookies.set("access_token", "", { ...cookieOptions, maxAge: 0 });
  res.cookies.set("refresh_token", "", { ...cookieOptions, maxAge: 0 });

  return res;
}
