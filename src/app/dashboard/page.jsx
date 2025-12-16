"use client";

import { useEffect, useState } from "react";
import { api } from "@/app/utils/api";
import Link from "next/link";
import { defineSpecies } from "@/app/utils/animalService";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
             setError("Vous devez être connecté pour voir cette page.");
             setLoading(false);
             return;
        }
        api.setToken(token);
        
        const petModule = api.getModule("petModule");
        const pets = await petModule.findAll();
        setAnimals(pets);
      } catch (err) {
        console.error("Error fetching animals:", err);
        setError("Impossible de charger la liste des animaux.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingState}>
        <p>Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorState}>
        <p className={styles.errorText}>{error}</p>
        <Link href="/login" className={styles.linkButton}>
            Se connecter
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.sectionHeader}>
        <h1 className={styles.sectionTitle}>
          🐾 Mes Animaux
          <span className={styles.sectionBadge}>{animals.length}</span>
        </h1>
      </div>

      {animals.length === 0 ? (
        <div className={styles.listCard}>
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🐕</div>
            <p className={styles.emptyText}>Aucun animal trouvé.</p>
          </div>
        </div>
      ) : (
        <div className={styles.listCard}>
          <ul className={styles.list}>
            {animals.map((animal) => (
              <li key={animal.id} className={styles.listItem}>
                <Link href={`/animal/${animal.id}`} className={styles.itemLink}>
                  <div className={styles.animalRow}>
                    <div className={styles.avatar}>
                      {defineSpecies(animal.species || "Chien")} 
                    </div>
                    <div className={styles.animalInfo}>
                      <h3 className={styles.animalName}>{animal.name}</h3>
                      <p className={styles.animalMeta}>
                         {animal.species} • {animal.gender === "male" ? "Mâle" : "Femelle"}
                      </p>
                      <div className={styles.badges}>
                         {animal.ageGroup && (
                            <span className={styles.badge}>
                                {animal.ageGroup}
                            </span>
                         )}
                         {animal.weight && (
                            <span className={styles.badge}>
                                ⚖️ {animal.weight}kg
                            </span>
                         )}
                      </div>
                    </div>
                    <span className={styles.chevron}>›</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}