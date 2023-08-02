import Link from "next/link";
import { users } from "../utils/constants/users";
import styles from "@/app/styles/Authors.module.css";
import Image from "next/image";

export default function Authors() {
  return (
    <div className={styles.container}>
      {users.map((user) => (
        <Link href={`/autores/${user.nick}`} key={user.email}>
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
