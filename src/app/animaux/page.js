"use client";

import Link from "next/link";

// Données mockées JSON
import animals from "@/data/animals.json";
import owners from "@/data/owners.json";

// Composants UI
import LayoutShell from "@/components/LayoutShell/LayoutShell";
import AnimalCard from "@/components/AnimalCard/AnimalCard";

import styles from "./animaux.module.css";

/**
 * Helper : retrouve le propriétaire d'un animal à partir de son ownerId.
 */
function getOwnerForAnimal(ownerId) {
    return owners.find((owner) => owner.id === ownerId);
}

/**
 * Page /animaux
 * -------------
 * Affiche la liste des animaux de la clinique.
 */
export default function AnimalsPage() {
    return (
        <LayoutShell>
            <main className={styles.page}>
                {/* Header "Patte & Cie" */}
                <header className={styles.header}>
                    <h1 className={styles.appTitle}>Patte &amp; Cie</h1>
                    <p className={styles.appSubtitle}>Carnets de santé des patients</p>
                </header>

                {/* Carte blanche avec la liste des animaux */}
                <section className={styles.listCard}>
                    <h2 className={styles.listTitle}>Mes animaux</h2>

                    <ul className={styles.list}>
                        {animals.map((animal) => {
                            const owner = getOwnerForAnimal(animal.ownerId);

                            return (
                                <li key={animal.id} className={styles.listItem}>
                                    <Link href={`/carnet/${animal.id}`} className={styles.itemLink}>
                                        <AnimalCard animal={animal} owner={owner} />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </section>
            </main>
        </LayoutShell>
    );
}
