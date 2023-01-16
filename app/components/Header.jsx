import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  const links = [
    { label: "Inicio", route: "/" },
    { label: "Locales", route: "/locales" },
    { label: "Regionales", route: "/regionales" },
    { label: "Provinciales", route: "/provinciales" },
    { label: "Nacionales", route: "/nacionales" },
    { label: "Internacionales", route: "/internacionales" },
  ];

  return (
    <header>
      <nav>
        <ul className={styles.navigation_list}>
          {links.map(({ label, route }) => {
            return (
              <li key={label}>
                <Link href={route}>{label}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
