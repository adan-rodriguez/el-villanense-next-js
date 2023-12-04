// import { revalidatePath } from "next/cache";
// import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET() {
  revalidateTag("articles");
  return Response.json({ revalidated: true, now: Date.now() });
}

// export async function GET(request) {
//   const tag = request.nextUrl.searchParams.get("tag");
//   revalidateTag(tag);
//   return Response.json({ revalidated: true, now: Date.now() });
// }

// export async function GET(request) {
//   revalidatePath("/");
//   return NextResponse.json({ revalidated: true, now: Date.now() });
// }

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
