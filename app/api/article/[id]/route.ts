import {
  deleteArticle,
  editArticle,
  getArticle,
} from "@/app/lib/services/articles";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const article = await getArticle(id);

  if (!article) {
    return new Response(null, {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(article), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await deleteArticle(id);

  revalidatePath("/");
  revalidatePath(`/${id}`);

  return new Response(null, {
    status: 204,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const article = await request.json();

  const updatedArticle = await editArticle({ id, article });

  revalidatePath("/");
  revalidatePath(`/${id}`);

  return new Response(JSON.stringify(updatedArticle), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
