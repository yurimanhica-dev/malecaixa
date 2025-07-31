/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!; // outro segredo, mais longo

export async function GET(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refresh_token")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Token de refresh ausente" },
        { status: 401 }
      );
    }

    const payload = jwt.verify(refreshToken, REFRESH_SECRET) as jwt.JwtPayload;

    const newAccessToken = jwt.sign(
      { email: payload.email, role: payload.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const res = NextResponse.json({ success: true });

    res.cookies.set("auth_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60,
      path: "/",
    });

    return res;
  } catch (err) {
    return NextResponse.json(
      { error: "Refresh token inválido" },
      { status: 403 }
    );
  }
}
