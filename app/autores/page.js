import Link from "next/link";
import { users } from "../lib/users";
import styles from "@/app/ui/styles/Authors.module.css";
import Image from "next/image";
import { routes } from "../lib/routes";

export default function Authors() {
  return (
    <div className={styles.container}>
      {users.map((user) => (
        <Link href={`${routes.authors.root}/${user.nick}`} key={user.email}>
          <Image
            src={user.image}
            alt={`Foto de ${user.name}`}
            width={36}
            height={36}
          />
          <p>{user.name}</p>
        </Link>
      ))}
    </div>
  );
}
