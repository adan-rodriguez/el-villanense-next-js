import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import styles from "../styles/Footer.module.css";
// import { getCurrentYear } from "../../lib/utils";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <SocialMedia />
        <span className={styles.follow_text}>Seguinos en nuestras redes</span>
      </div>
      <Logo />
      <address className={styles.address}>
        <ul className={styles.address_items_list}>
          <li className={styles.address_item}>
            Correo:{" "}
            <a href="mailto:elvillanense@gmail.com" rel="noreferrer">
              elvillanense@gmail.com
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
      {/* <p className={styles.copyright}>
        {`Copyright ${getCurrentYear()} www.elvillanense.com.ar - Todos los
        derechos reservados`}
      </p> */}
      <p className={styles.dev}>
        Desarrollado por{" "}
        <a
          className={styles.portafolio}
          href="https://adanrodriguez.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Adán Rodríguez
        </a>
      </p>
    </footer>
  );
}
