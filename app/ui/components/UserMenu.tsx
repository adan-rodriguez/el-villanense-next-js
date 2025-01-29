"use client";

import { useLogout } from "@/app/hooks/useLogout";
import styles from "../styles/Header.module.css";
// import useMenu from "@/app/hooks/useMenu";
import { AuthorImage } from "./AuthorImage";
import { useUserMenu } from "@/app/hooks/useUserMenu";
import Link from "next/link";
import { useEffect } from "react";

export function UserMenu({
  name,
  image,
}: {
  name: string | null;
  image: string | null;
}) {
  // const { isMenuOpen, getIsMenuOpen } = useMenu();
  const { isUserMenuOpen, getIsUserMenuOpen } = useUserMenu();
  const { loading, logout } = useLogout();

  useEffect(() => {
    const closeUserMenu = (e: Event) => {
      const $clickedElement = e.target as HTMLElement;
      if (!$clickedElement?.closest("#user-menu")) {
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
        <AuthorImage image={image} name={name} />
      </button>
      <div
        id="user-menu"
        style={{
          display: isUserMenuOpen ? "flex" : "none",
        }}
        className={styles.menuuser_container}
      >
        {name && <span className={styles.username}>{name}</span>}
        <Link
          className={styles.dashboard_link}
          onClick={() => getIsUserMenuOpen(false)}
          href="/dashboard"
        >
          Inicio
        </Link>
        <Link
          className={styles.new_link}
          onClick={() => getIsUserMenuOpen(false)}
          href="/dashboard/nuevo"
        >
          Redactar
        </Link>
        <Link
          className={styles.new_link}
          onClick={() => getIsUserMenuOpen(false)}
          href="/dashboard/articulos"
        >
          Editar/Borrar
        </Link>
        <Link
          className={styles.account_link}
          onClick={() => getIsUserMenuOpen(false)}
          href="/dashboard/cuenta"
        >
          Perfil
        </Link>
        <button
          className={styles.logout_button}
          onClick={logout}
          disabled={loading}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
