import Link from "next/link";
import { users } from "../lib/users";
import styles from "@/app/ui/styles/Authors.module.css";
import { routes } from "../lib/routes";
import AuthorImage from "../ui/components/AuthorImage";

export default function Authors() {
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
