import Image from "next/image";
import styles from "../styles/Header.module.css";
import Footer from "./Footer";

export default function MenuPhone({ isMenuOpen, getIsMenuOpen }) {
  return (
    <div className={styles.menu_phone}>
      <button
        type="button"
        onClick={() => getIsMenuOpen(!isMenuOpen)}
        className={styles.closemenu_button}
        aria-label="Cerrar menú"
      >
        <Image
          src="/icons/menu/closemenu-icon.svg"
          alt="Cerrar menú"
          width={48}
          height={48}
        />
      </button>
      <Footer />
    </div>
  );
}
