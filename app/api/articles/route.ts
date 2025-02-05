import { addArticle, getArticles } from "@/app/lib/services/articles";
import { ArticleBasicData } from "@/app/lib/types";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function GET() {
  const articles = await getArticles();

  return new Response(JSON.stringify(articles), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const articleData: ArticleBasicData = await request.json();

  const { data, error, success } = z
    .object({
      title: z.string().trim().nonempty("Falta el título de la noticia"),
      lead: z.string().trim().nonempty("Falta la entrada de la noticia"),
      image: z.string().url("URL de imagen inválida"),
      altImage: z
        .string()
        .trim()
        .nonempty("Falta el texto alternativo de la imagen"),
      content: z.string().trim().nonempty("Falta el cuerpo de la noticia"),
      authors: z.array(
        z.object({
          id: z.string(),
          nick: z.string(),
          name: z.string(),
          image: z.string().nullable(),
          anonymous: z.boolean(),
        })
      ),
    })
    .safeParse(articleData);

  if (!success) {
    return new Response(
      JSON.stringify({ error: { message: error.errors[0].message } }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const newArticle = await addArticle(data);

  revalidatePath("/");
  revalidatePath("/sitemap.xml");

  return new Response(JSON.stringify(newArticle), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
