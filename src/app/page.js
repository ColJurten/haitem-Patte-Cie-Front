import Link from "next/link";
import LayoutShell from "@/components/LayoutShell/LayoutShell";
import styles from "./page.module.css";

export default function HomePage() {
    return (
        <LayoutShell>
            <div className={styles.home}>
                {/* Hero violet, inspiré de la maquette Figma */}
                <section className={styles.heroCard}>
                    <div className={styles.heroText}>
                        <p className={styles.heroBadge}>healthypet</p>

                        <h1 className={styles.heroTitle}>
                            Helping you
                            <br />
                            to keep your bestie
                            <br />
                            stay healthy!
                        </h1>

                        <p className={styles.heroSubtitle}>
                            Consultez les carnets de santé de vos patients en quelques secondes, sans chercher les dossiers papier.
                        </p>

                        <Link href="/animaux" className={styles.heroButton}>
                            Voir mes animaux
                        </Link>
                    </div>

                    <div className={styles.heroImage}>
                        <div className={styles.heroDogCircle}>🐶</div>
                    </div>
                </section>

                {/* Petit bloc texte en dessous, pour remplir la home */}
                <section className={styles.shortcut}>
                    <h2 className={styles.shortcutTitle}>Accès rapide</h2>
                    <p className={styles.shortcutText}>
                        Depuis cette application, vous pouvez consulter un carnet de santé, vérifier les vaccins, voir les prochaines visites et retrouver les
                        coordonnées des propriétaires.
                    </p>

                    <Link href="/animaux" className={styles.secondaryButton}>
                        Ouvrir la liste des animaux
                    </Link>
                </section>
            </div>
        </LayoutShell>
    );
}
