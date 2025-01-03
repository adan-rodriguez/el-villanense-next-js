import styles from "@/app/ui/styles/ShareSocialMedia.module.css";
import { SocialMediaLink } from "./SocialMediaLink";
import { DOMAIN } from "@/app/lib/utils";

export function ShareSocialMedia({ id, title }: { id: string; title: string }) {
  const url = `${DOMAIN}/${id}`;

  const data = [
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      title: "Compartir en Facebook",
      src: "/icons/social/facebook.svg",
      alt: "Logo de Facebook",
    },
    {
      href: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
      title: "Compartir en X",
      src: "/icons/social/x.png",
      alt: "Logo de X",
    },
    {
      href: `https://api.whatsapp.com/send?text=${url}`,
      title: "Compartir en Whatsapp",
      src: "/icons/social/whatsapp.svg",
      alt: "Logo de Whatsapp",
    },
  ];

  return (
    <div className={styles.container}>
      <span className={styles.share__text}>Comparte la noticia</span>
      <div className={styles.links__container}>
        {data.map(({ href, title, src, alt }) => {
          return (
            <SocialMediaLink
              key={href}
              href={href}
              title={title}
              src={src}
              alt={alt}
            />
          );
        })}
      </div>
    </div>
  );
}
