import { getCurrentYear } from "../utils/getCurrentYear";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <SocialMedia />
      <Logo />
      <address className={styles.address}>
        <ul className={styles.address_items_list}>
          <li className={styles.address_item}>
            Correo:{" "}
            <a href="mailto:redaccion@elvillanense.com.ar" rel="noreferrer">
              redaccion@elvillanense.com.ar
            </a>
          </li>
          <li className={styles.address_item}>
            Teléfono:{" "}
            <a href="tel:+5493482524950" rel="noreferrer">
              +54 9 3482 524950
            </a>
          </li>
          <li className={styles.address_item}>
            Villa Ana - Santa Fe - Argentina
          </li>
        </ul>
      </address>
      <p className={styles.copyright}>
        {`Copyright ${getCurrentYear()} www.elvillanense.com.ar - Todos los
        derechos reservados`}
      </p>
    </footer>
  );
}
