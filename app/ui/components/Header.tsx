"use client";

import styles from "../styles/Header.module.css";
import { Logo } from "./Logo";
import { useContext } from "react";
import { AuthContext } from "@/app/context/auth";
import { SocialMedia } from "./SocialMedia";
import { UserMenu } from "./UserMenu";

export function Header() {
  const { user } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <Logo />
        {!user && <SocialMedia />}
        {user && <UserMenu name={user.name} image={user.image} />}
      </div>
    </header>
  );
}
