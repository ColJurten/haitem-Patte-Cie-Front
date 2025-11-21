"use client";

// [HF] Hooks Next pour récupérer l'id dans l'URL et éventuellement revenir en arrière.
import { useParams, useRouter } from "next/navigation";

// [HF] Données mockées JSON.
import animals from "@/data/animals.json";
import owners from "@/data/owners.json";
import visits from "@/data/visits.json";
import treatments from "@/data/treatments.json";
import veterinarians from "@/data/veterinarians.json";

// [HF] Layout commun (fond dégradé + marge centrale).
import LayoutShell from "@/components/LayoutShell/LayoutShell";
import styles from "./carnet.module.css";

// ------------------------------------------------------
// [HF] Page /carnet/[id] – détail du carnet de santé
// ------------------------------------------------------
export default function CarnetPage() {
    const params = useParams(); // { id: "1" }
    const router = useRouter();

    // [HF] Sécuriser l'accès à params.id
    const animalId = params?.id;

    // [HF] Trouver l'animal correspondant dans animals.json
    const animal = animals.find((a) => String(a.id) === String(animalId));

    // [HF] Si aucun animal ne correspond à l'id → message d'erreur propre.
    if (!animal) {
        return (
            <LayoutShell>
                <main className={styles.page}>
                    <p>Animal introuvable.</p>
                    <button type="button" onClick={() => router.push("/")}>
                        Retour à la liste
                    </button>
                </main>
            </LayoutShell>
        );
    }

    // [HF] Récupération du propriétaire lié (ownerId dans animals.json).
    const owner = owners.find((o) => o.id === animal.ownerId);

    // [HF] Visites de cet animal.
    const visitesAnimal = visits.filter((v) => v.animalId === animal.id);

    // [HF] Ids des visites de cet animal → pour filtrer les traitements.
    const visitesIds = visitesAnimal.map((v) => v.id);

    // [HF] Traitements liés à ces visites.
    const traitementsAnimal = treatments.filter((t) => visitesIds.includes(t.visitId));

    // [HF] On ne garde que les 3 derniers traitements (triés par date début).
    const derniersTraitements = [...traitementsAnimal].sort((a, b) => new Date(b.dateStart) - new Date(a.dateStart)).slice(0, 3);

    return (
        <LayoutShell>
            <main className={styles.page}>
                <header className={styles.header}>
                    {/* [HF] Colonne gauche : bouton retour + titre */}
                    <div className={styles.headerLeft}>
                        <button type="button" className={styles.backButton} onClick={() => router.push("/")}>
                            ←
                        </button>
                        <div>
                            <p className={styles.headerTitle}>Carnet de santé</p>
                            <p className={styles.headerAnimalName}>{animal.name}</p>
                        </div>
                    </div>

                    {/* [HF] Colonne droite : avatar / photo de l’animal */}
                    <div className={styles.headerRight}>
                        {animal.photo ? (
                            <img src={animal.photo} alt={animal.name} className={styles.avatar} />
                        ) : (
                            <span className={styles.headerIcon}>{animal.name.charAt(0)}</span>
                        )}
                    </div>
                </header>

                {/* [HF] Bloc infos générales */}
                <section className={styles.card}>
                    <h2 className={styles.sectionTitle}>Informations générales</h2>
                    <p>
                        <strong>Nom</strong> {animal.name}
                    </p>
                    <p>
                        <strong>Espèce</strong> {animal.species}
                    </p>
                    <p>
                        <strong>Race</strong> {animal.race}
                    </p>
                    <p>
                        <strong>Sexe</strong> {animal.sex}
                    </p>
                    <p>
                        <strong>Date de naissance</strong> {animal.dateOfBirth}
                    </p>
                    <p>
                        <strong>Poids</strong> {animal.weightKg} kg
                    </p>
                    <p>
                        <strong>Couleur</strong> {animal.color}
                    </p>
                </section>

                {/* [HF] Bloc propriétaire */}
                {owner && (
                    <section className={styles.card}>
                        <h2 className={styles.sectionTitle}>Propriétaire</h2>
                        <p>
                            <strong>Nom</strong> {owner.firstName} {owner.lastName}
                        </p>
                        <p>
                            <strong>Téléphone</strong> {owner.phone}
                        </p>
                        <p>
                            <strong>Email</strong> {owner.email}
                        </p>
                        <p>
                            <strong>Adresse</strong> {owner.address}
                        </p>
                    </section>
                )}

                {/* [HF] Derniers traitements */}
                <section className={styles.card}>
                    <h2 className={styles.sectionTitle}>Derniers traitements</h2>

                    {derniersTraitements.length === 0 && <p>Aucun traitement enregistré.</p>}

                    {derniersTraitements.map((t) => {
                        const visite = visitesAnimal.find((v) => v.id === t.visitId);
                        const vet = visite ? veterinarians.find((v) => v.id === visite.vetId) : null;

                        return (
                            <div key={t.id} className={styles.treatmentItem}>
                                <p className={styles.treatmentName}>
                                    <strong>{t.name}</strong>
                                </p>
                                <p className={styles.treatmentDates}>
                                    Du {t.dateStart} au {t.dateEnd}
                                </p>
                                {vet && (
                                    <p className={styles.treatmentVet}>
                                        Vétérinaire&nbsp;: {vet.firstName} {vet.lastName}
                                    </p>
                                )}
                                {t.reason && <p className={styles.treatmentReason}>{t.reason}</p>}
                                {t.comments && <p className={styles.treatmentComment}>{t.comments}</p>}
                            </div>
                        );
                    })}
                </section>
            </main>
        </LayoutShell>
    );
}
