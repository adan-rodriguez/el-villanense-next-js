import styles from "../styles/Header.module.css";
import Footer from "./Footer";

export default function PhoneMenu(/*{ isMenuOpen, getIsMenuOpen }*/) {
  return (
    <div className={styles.menu_phone}>
      <Footer />
    </div>
  );
}
