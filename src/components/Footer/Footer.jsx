import { FaPaw } from "react-icons/fa";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.brand}>
                <FaPaw className={styles.icon} />
                <span>Patte & Cie</span>
            </div>
            <p>© 2025 – Tous droits réservés</p>
        </footer>
    );
}
