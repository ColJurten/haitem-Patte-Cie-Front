// src/components/LayoutShell/LayoutShell.jsx

import styles from "./LayoutShell.module.css";

/**
 * LayoutShell
 * -----------
 * Composant "layout" générique pour simuler un écran de mobile.
 * Il centre le contenu, applique le fond dégradé, et crée un "shell" type téléphone.
 * On le réutilisera sur toutes les pages (home, carnet, etc.).
 */
export default function LayoutShell({ children }) {
    return (
        <main className={styles.appRoot}>
            <div className={styles.appShell}>{children}</div>
        </main>
    );
}
