import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request) {
  revalidatePath("/");
  revalidatePath("/autores/[author]");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}

// export async function GET() {
//   revalidatePath("/");
//   return NextResponse.json({
//     revalidated: true,
//     now: Date.now(),
//     headers: {
//       "Access-Control-Allow-Origin": [
//         "https://www.elvillanense.com.ar",
//         "http://localhost:3000",
//       ],
//     },
//   });
// }
