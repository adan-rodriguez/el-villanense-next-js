import {
  deleteArticle,
  editArticle,
  getArticle,
} from "@/app/lib/services/articles";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import { z } from "zod";

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
  revalidatePath("/sitemap.xml");

  return new Response(null, {
    status: 204,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const article = await request.json();

  const { data, error, success } = z
    .object({
      title: z
        .string()
        .trim()
        .nonempty("Falta el título de la noticia")
        .optional(),
      lead: z
        .string()
        .trim()
        .nonempty("Falta la entrada de la noticia")
        .optional(),
      image: z.string().url("URL de imagen inválida").optional(),
      altImage: z
        .string()
        .trim()
        .nonempty("Falta el texto alternativo de la imagen")
        .optional(),
      content: z
        .string()
        .trim()
        .nonempty("Falta el cuerpo de la noticia")
        .optional(),
      authors: z.array(
        z
          .object({
            id: z.string(),
            nick: z.string(),
            name: z.string(),
            image: z.string().nullable(),
            anonymous: z.boolean(),
          })
          .optional()
      ),
    })
    .safeParse(article);

  if (!success) {
    return new Response(
      JSON.stringify({
        error: {
          message: error.errors[0].message,
        },
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const { id } = await params;
  const updatedArticle = await editArticle({ id, article: data });

  revalidatePath("/");
  revalidatePath(`/${id}`);
  revalidatePath("/sitemap.xml");

  return new Response(JSON.stringify(updatedArticle), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
