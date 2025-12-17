"use client";

import Link from "next/link";
import { FaPaw } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <FaPaw className={styles.logoIcon} />
                <span className={styles.logoText}>Patte & Cie</span>
            </div>

            <nav className={styles.nav}>
                <Link href="/">Accueil</Link>
                <Link href="/animaux">Animaux</Link>
            </nav>

            <div className={styles.mobileMenu}>
                <FiMenu className={styles.menuIcon} />
            </div>
        </header>
    );
}
