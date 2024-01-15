import Link from "next/link";
import styles from "../styles/Logo.module.css";
import { routes } from "@/app/lib/routes";

export default function Logo() {
  return (
    <Link className={styles.logo} href={routes.root} title="Inicio">
      El Villanense
    </Link>
  );
}
