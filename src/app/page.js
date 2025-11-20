// src/app/page.jsx

import Link from "next/link";

// Import des données mockées JSON
import animals from "@/data/animals.json";
import owners from "@/data/owners.json";

// Import des composants UI
import LayoutShell from "@/components/LayoutShell/LayoutShell";
import AnimalCard from "@/components/AnimalCard/AnimalCard";

/**
 * Helper : retrouve le propriétaire d'un animal à partir de son ownerId.
 * On factorise cette logique ici pour ne pas polluer le JSX.
 */
function getOwnerForAnimal(ownerId) {
    return owners.find((owner) => owner.id === ownerId);
}

/**
 * Page Home
 * ---------
 * Affiche la liste des animaux de la clinique.
 * Chaque ligne est une AnimalCard cliquable, qui renvoie vers le carnet de santé
 * de l'animal : /carnet/[id]
 */
export default function HomePage() {
    return (
        <LayoutShell>
            {/* Header "Patte & Cie" */}
            <header style={{ marginBottom: "16px" }}>
                <h1
                    style={{
                        margin: 0,
                        fontSize: "22px",
                        fontWeight: 700,
                        color: "#7e6bff",
                    }}
                >
                    Patte &amp; Cie
                </h1>
                <p
                    style={{
                        margin: "4px 0 0",
                        fontSize: "13px",
                        color: "#6b7280",
                    }}
                >
                    Carnets de santé des patients
                </p>
            </header>

            {/* Card contenant la liste des animaux */}
            <section
                style={{
                    background: "#ffffff",
                    borderRadius: "24px",
                    boxShadow: "0 12px 32px rgba(0, 0, 0, 0.08)",
                    padding: "14px 16px",
                }}
            >
                <h2
                    style={{
                        margin: "0 0 8px",
                        fontSize: "15px",
                        fontWeight: 600,
                    }}
                >
                    Mes animaux
                </h2>

                <ul
                    style={{
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                    }}
                >
                    {animals.map((animal) => {
                        const owner = getOwnerForAnimal(animal.ownerId);

                        return (
                            <li
                                key={animal.id}
                                style={{
                                    borderTop: "1px solid #eef2ff",
                                    paddingTop: "6px",
                                    marginTop: "6px",
                                }}
                            >
                                {/* Link Next vers la page de carnet de santé */}
                                <Link
                                    href={`/carnet/${animal.id}`}
                                    style={{
                                        textDecoration: "none",
                                        color: "inherit",
                                        display: "block",
                                    }}
                                >
                                    {/* On délègue l'affichage à AnimalCard */}
                                    <AnimalCard animal={animal} owner={owner} />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </LayoutShell>
    );
}
