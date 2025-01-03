import { auth } from "@/app/lib/firebase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];

  if (!idToken) {
    return NextResponse.json({ error: "Token no encontrado" }, { status: 401 });
  }

  try {
    await auth.verifyIdToken(idToken);
  } catch (error) {
    return NextResponse.json({ error }, { status: 401 });
  }

  const fiveDays = 60 * 60 * 24 * 5 * 1000;
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: fiveDays,
  });

  const response = NextResponse.json(
    { message: "Login exitoso" },
    { status: 200 }
  );

  response.cookies.set("__session", sessionCookie, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: fiveDays,
  });

  return response;
}
