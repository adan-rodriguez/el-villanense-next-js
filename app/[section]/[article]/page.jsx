import { getAnArticle } from "@/app/firebase/firebaseService";
import Image from "next/image";

export default async function Article({ params }) {
  const { article } = params;

  const art = await getAnArticle(article);

  return (
    <article>
      <h1>{art.title}</h1>
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
      <time dateTime={art.datetimeAttribute}>{art.datetimeContent}</time>
      <p>{art.lead}</p>
      <Image
        src={art.image}
        alt={art.altImage}
        width={500}
        height={300}
        priority
      />
      <div dangerouslySetInnerHTML={{ __html: art.content }} />
      {/* <div>{`${art.content}`}</div> */}
    </article>
  );
}
