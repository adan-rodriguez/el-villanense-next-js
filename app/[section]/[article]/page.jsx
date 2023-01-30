import { getAnArticle } from "@/app/firebase/firebaseService";
import { DOMAIN } from "@/app/utils/constants/domain";
import Image from "next/image";

export default async function Article({ params }) {
  const { section, article } = params;

  const art = await getAnArticle(article);

  const URL = `${DOMAIN}/${section}/${article}`;

  return (
    <article>
      <h1>{art.title}</h1>
      <div>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${URL}`}
          target="_blank"
          title="Compartir en Facebook"
          rel="noreferrer"
        >
          <img
            width={30}
            height={30}
            src="/icons/social/facebook.png"
            alt="Facebook"
          />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${art.title}&url=${URL}`}
          target="_blank"
          title="Compartir en Twitter"
          rel="noreferrer"
        >
          <img
            width={30}
            height={30}
            src="/icons/social/twitter.png"
            alt="Twitter"
          />
        </a>
        <a
          href={`https://api.whatsapp.com/send?text=${URL}`}
          target="_blank"
          title="Compartir en Whatsapp"
          rel="noreferrer"
        >
          <img
            width={30}
            height={30}
            src="/icons/social/whatsapp.png"
            alt="Whatsapp"
          />
        </a>
      </div>
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
