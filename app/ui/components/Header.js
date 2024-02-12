"use client";

import styles from "../styles/Header.module.css";
import Logo from "./Logo";
import Image from "next/image";
import useMenu from "@/app/hooks/useMenu";
import PhoneMenu from "./PhoneMenu";
import AuthorImage from "./AuthorImage";
import { logout } from "@/app/lib/auth";
import useMenuUser from "@/app/hooks/useMenuUser";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/app/context/auth";
// import dynamic from "next/dynamic";
// const PhoneMenu = dynamic(() => import("./PhoneMenu"));

// const links = [
//   { label: "Inicio", route: "/" },
//   { label: "Locales", route: "/locales" },
//   { label: "Regionales", route: "/regionales" },
//   { label: "Provinciales", route: "/provinciales" },
//   { label: "Nacionales", route: "/nacionales" },
//   { label: "Internacionales", route: "/internacionales" },
// ];

export default function Header() {
  const { isMenuOpen, getIsMenuOpen } = useMenu();
  const { isMenuUserOpen, getIsMenuUserOpen } = useMenuUser();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const closeUserMenu = (e) => {
      if (!e.target.closest("#user-menu")) {
        getIsMenuUserOpen(false);
      }
    };

    if (isMenuUserOpen) {
      document.addEventListener("click", closeUserMenu);
    }

    return () => {
      document.removeEventListener("click", closeUserMenu);
    };
  }, [isMenuUserOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <Logo />
        {!isMenuOpen ? (
          <div className={styles.userandopenbutton_container}>
            {user && (
              <div className={styles.buttonandmenu_user_container}>
                <button
                  className={styles.openmenuuser_button}
                  onClick={() => getIsMenuUserOpen(!isMenuUserOpen)}
                >
                  <AuthorImage src={user.image} author={user.name} />
                </button>
                {isMenuUserOpen && (
                  <div className={styles.menuuser_container}>
                    <span className={styles.username}>{user.name}</span>
                    <Link
                      className={styles.dashboard_link}
                      onClick={() => getIsMenuUserOpen(false)}
                      href="/dashboard"
                    >
                      Dashboard
                    </Link>
                    <Link
                      className={styles.new_link}
                      onClick={() => getIsMenuUserOpen(false)}
                      href="/dashboard/nuevo"
                    >
                      Nuevo
                    </Link>
                    <Link
                      className={styles.account_link}
                      onClick={() => getIsMenuUserOpen(false)}
                      href="/dashboard/cuenta"
                    >
                      Cuenta
                    </Link>
                    <button
                      className={styles.logout_button}
                      onClick={() => {
                        getIsMenuUserOpen(false);
                        logout();
                      }}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            )}
            <button
              type="button"
              onClick={() => getIsMenuOpen(!isMenuOpen)}
              className={styles.openmenu_button}
              aria-label="Abrir menú"
            >
              <Image
                src="/icons/menu/openmenu-icon.svg"
                alt="Abrir menú"
                width={48}
                height={48}
              />
            </button>
          </div>
        ) : (
          <PhoneMenu isMenuOpen={isMenuOpen} getIsMenuOpen={getIsMenuOpen} />
        )}
      </div>
    </header>
  );
}

{
  /* <nav>
  <ul className={styles.navbar_list}>
    {links.map(({ label, route }) => {
      return (
        <li className={styles.navbar_list_item} key={label}>
          <Link
            className={styles.navbar_link}
            href={route}
            {...(innerWidth < 992 && {
              onClick: () => setIsMenuopen(!isMenuopen),
            })}
            style={{
              fontWeight: pathname === route && "bold",
            }}
          >
            {label}
          </Link>
        </li>
      );
    })}
  </ul>
</nav> */
}
