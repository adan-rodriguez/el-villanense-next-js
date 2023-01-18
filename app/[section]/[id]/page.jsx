import { getADoc } from "@/app/firebase/firebaseService";
import Image from "next/image";

export default async function Noticia({ params }) {
  const { id } = params;

  const article = await getADoc(id);

  return (
    <article>
      <h1>{article.title}</h1>
      {/* <div>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
            target="_blank"
            title="Compartir en Facebook"
            rel="noreferrer"
          >
            <img width={30} height={30} src={facebookIcon} alt="Facebook" />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${news.title}&url=${window.location.href}`}
            target="_blank"
            title="Compartir en Twitter"
            rel="noreferrer"
          >
            <img width={30} height={30} src={twitterIcon} alt="Twitter" />
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${window.location.href}`}
            target="_blank"
            title="Compartir en Whatsapp"
            rel="noreferrer"
          >
            <img width={30} height={30} src={whatsappIcon} alt="Whatsapp" />
          </a>
        </div> */}
      <time dateTime={article.datetimeAttribute}>
        {article.datetimeContent}
      </time>
      <p>{article.lead}</p>
      <Image
        src={article.image}
        alt={article.altImage}
        width={500}
        height={300}
        priority
      />
      {/* <div dangerouslySetInnerHTML={{ __html: article.content }} /> */}
    </article>
  );
}
