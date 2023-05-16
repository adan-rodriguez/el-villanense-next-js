import Link from "next/link";
import { users } from "../utils/constants/users";
import styles from "@/app/styles/Authors.module.css";

const authors = Object.entries(users);
export default function Authors() {
  return (
    <div className={styles.container}>
      {authors.map((author) => (
        <Link href={`/autores/${author[1].nick}`} key={author[0]}>
          <img
            src={author[1].image}
            alt={`Foto de ${author[1].name}`}
            width={36}
            height={36}
          />
          <p>{author[1].name}</p>
        </Link>
      ))}
    </div>
  );
}
