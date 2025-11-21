"use client";

import Link from "next/link";
import { FaHome, FaPaw, FaUser, FaStethoscope } from "react-icons/fa";
import styles from "./BottomNav.module.css";

export default function BottomNav() {
    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.navItem}>
                <FaHome className={styles.icon} />
            </Link>

            <Link href="/animaux" className={styles.navItem}>
                <FaPaw className={styles.icon} />
            </Link>

            <Link href="/visites" className={styles.navItem}>
                <FaStethoscope className={styles.icon} />
            </Link>

            <Link href="/profil" className={styles.navItem}>
                <FaUser className={styles.icon} />
            </Link>
        </nav>
    );
}
