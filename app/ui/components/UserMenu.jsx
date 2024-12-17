"use client";

import { useLogout } from "@/app/hooks/useLogout";
import styles from "../styles/Header.module.css";
// import useMenu from "@/app/hooks/useMenu";
import AuthorImage from "./AuthorImage";
import useUserMenu from "@/app/hooks/useUserMenu";
import Link from "next/link";
import { useEffect } from "react";

export default function UserMenu({ user }) {
  // const { isMenuOpen, getIsMenuOpen } = useMenu();
  const { isUserMenuOpen, getIsUserMenuOpen } = useUserMenu();
  const logout = useLogout();

  useEffect(() => {
    const closeUserMenu = (e) => {
      if (!e.target.closest("#user-menu")) {
        getIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener("click", closeUserMenu);
    } else {
      document.removeEventListener("click", closeUserMenu);
    }

    return () => {
      document.removeEventListener("click", closeUserMenu);
    };
  }, [isUserMenuOpen]);

  return (
    <div className={styles.buttonandmenu_user_container}>
      <button
        className={styles.openmenuuser_button}
        onClick={() => getIsUserMenuOpen(!isUserMenuOpen)}
        aria-label={isUserMenuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isUserMenuOpen}
        aria-controls="user-menu"
      >
        <AuthorImage src={user.image} author={user.name} />
      </button>
      <div
        id="user-menu"
        style={{
          display: isUserMenuOpen ? "flex" : "none",
        }}
        className={styles.menuuser_container}
      >
        <span className={styles.username}>{user.name}</span>
        <Link
          className={styles.dashboard_link}
          onClick={() => getIsUserMenuOpen(false)}
          href="/dashboard"
        >
          Dashboard
        </Link>
        <Link
          className={styles.new_link}
          onClick={() => getIsUserMenuOpen(false)}
          href="/dashboard/nuevo"
        >
          Nuevo
        </Link>
        <Link
          className={styles.account_link}
          onClick={() => getIsUserMenuOpen(false)}
          href="/dashboard/cuenta"
        >
          Cuenta
        </Link>
        <button
          className={styles.logout_button}
          onClick={() => {
            // getIsUserMenuOpen(false);
            logout();
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
