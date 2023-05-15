import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  revalidatePath("/");
  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    headers: {
      "Access-Control-Allow-Origin": [
        "https://www.elvillanense.com.ar",
        "http://localhost:3000",
      ],
    },
  });
}
