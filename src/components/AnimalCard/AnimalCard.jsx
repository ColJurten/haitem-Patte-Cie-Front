// src/components/AnimalCard/AnimalCard.jsx

import styles from "./AnimalCard.module.css";
import { FiChevronRight } from "react-icons/fi";

/**
 * AnimalCard
 * ----------
 * Affiche une "card" pour un animal dans la liste :
 *  - Avatar (initiale ou image plus tard)
 *  - Nom + espèce + race
 *  - Nom du propriétaire (si fourni)
 * Cette card sera cliquable dans la page Home (wrappée dans <Link>).
 */
export default function AnimalCard({ animal, owner }) {
    return (
        <article className={styles.card}>
            {/* Avatar circulaire avec initiale de l'animal */}
            <div className={styles.avatar}>
                <span className={styles.avatarInitial}>{animal.name.charAt(0).toUpperCase()}</span>
            </div>

            {/* Zone texte : nom, espèce/race, proprio */}
            <div className={styles.info}>
                <p className={styles.name}>{animal.name}</p>
                <p className={styles.meta}>
                    {animal.species} • {animal.race}
                </p>
                {owner && (
                    <p className={styles.owner}>
                        Propriétaire : {owner.firstName} {owner.name}
                    </p>
                )}
            </div>

            {/* Icône de navigation à droite */}
            <div className={styles.chevron}>
                <FiChevronRight aria-hidden="true" />
            </div>
        </article>
    );
}
