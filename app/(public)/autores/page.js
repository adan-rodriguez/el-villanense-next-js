import Link from "next/link";
import { DOMAIN, users } from "../../lib/utils";
import styles from "@/app/ui/styles/AuthorsPage.module.css";
import { routes } from "../../lib/routes";
import AuthorImage from "../../ui/components/AuthorImage";

export const metadata = {
  title: "Autores - El Villanense",
  description: "Lista con todos los autores de El Villanense.",
  openGraph: {
    title: "Autores - El Villanense",
    description: "Lista con todos los autores de El Villanense.",
    images: { url: `${DOMAIN}/images/logo.png`, alt: "Logo de El Villanense" },
    url: DOMAIN + routes.authors.root,
    siteName: "El Villanense",
    type: "website",
    locale: "es_LA",
  },
  twitter: {
    card: "summary_large_image",
    // site: "@elvillanense",
  },
  verification: {
    google: "hXIhjWYsPdwJV_q2u8HScKlAfFDKpIXuom958hxhjNE",
  },
  appleWebApp: {
    title: "El Villanense",
  },
};

export default function AuthorsPage() {
  return (
    <div className={styles.container}>
      {users.map((user) => (
        <Link href={`${routes.authors.root}/${user.nick}`} key={user.email}>
          <AuthorImage
            src={user.image}
            author={user.name}
            width={50}
            height={50}
          />
          <p>{user.name}</p>
        </Link>
      ))}
    </div>
  );
}
