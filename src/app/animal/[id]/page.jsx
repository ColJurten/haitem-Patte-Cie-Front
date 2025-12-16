"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/app/utils/api";
import { defineSpecies, calculateAge } from "@/app/utils/animalService";
import styles from "./animal.module.css";

export default function AnimalDetail() {
    const { id } = useParams();
    const router = useRouter();

    const [animal, setAnimal] = useState(null);
    const [owner, setOwner] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;

            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    router.push("/login");
                    return;
                }
                api.setToken(token);

                const petModule = api.getModule("petModule");
                const petData = await petModule.findById(id);

                if (!petData) {
                    setError("Animal non trouvé");
                    setLoading(false);
                    return;
                }
                setAnimal(petData);

                if (petData.ownerId) {
                    const ownerModule = api.getModule("ownerModule");
                    try {
                        const ownerData = await ownerModule.findById(petData.ownerId);
                        setOwner(ownerData);
                    } catch (e) {
                        console.error("Error fetching owner", e);
                    }
                }

                const appointmentModule = api.getModule("appointmentModule");

                try {
                    const allAppointments = await appointmentModule.findAll();
                    const petAppointments = allAppointments.filter((app) => app.petId === id);
                    petAppointments.sort((a, b) => new Date(b.date) - new Date(a.date));

                    setAppointments(petAppointments);
                } catch (e) {
                    console.error("Error fetching appointments", e);
                }
            } catch (err) {
                console.error("Error loading data:", err);
                setError("Une erreur est survenue lors du chargement des données.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, router]);

    if (loading) {
        return (
            <div className={styles.loadingState}>
                <p>Chargement...</p>
            </div>
        );
    }

    if (error || !animal) {
        return (
            <div className={styles.errorState}>
                <p className={styles.errorText}>{error || "Animal introuvable"}</p>
                <Link href="/dashboard" className={styles.linkButton}>
                    Retour au dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <Link href="/dashboard" className={styles.backButton}>
                    ←
                </Link>
            </div>

            <div className={styles.profileCard}>
                <div className={styles.profileHeader}>
                    <div className={styles.avatar}>{defineSpecies(animal.species || "Chien")}</div>
                    <div className={styles.profileInfo}>
                        <h1 className={styles.animalName}>{animal.name}</h1>
                        <p className={styles.animalMeta}>
                            {animal.species} • {animal.gender === "male" ? "Mâle" : "Femelle"}
                        </p>
                    </div>
                </div>
                <div className={styles.badges}>
                    {animal.birthDate && <span className={`${styles.badge} ${styles.badgePrimary}`}>🎂 {calculateAge(animal.birthDate)}</span>}
                    {animal.weight && <span className={`${styles.badge} ${styles.badgeSecondary}`}>⚖️ {animal.weight}kg</span>}
                    {animal.color && <span className={`${styles.badge} ${styles.badgeSuccess}`}>🎨 {animal.color}</span>}
                </div>
                {animal.description && (
                    <div className={styles.description}>
                        <span className={styles.descriptionLabel}>Note:</span> {animal.description}
                    </div>
                )}
            </div>

            {owner && (
                <div className={styles.card}>
                    <h2 className={styles.sectionTitle}>👤 Propriétaire</h2>
                    <div className={styles.ownerCard}>
                        <h3 className={styles.ownerName}>
                            {owner.firstName} {owner.lastName}
                        </h3>
                        {owner.phone && <p className={styles.ownerDetail}>📞 {owner.phone}</p>}
                        {owner.user?.email && <p className={styles.ownerDetail}>📧 {owner.user.email}</p>}
                    </div>
                </div>
            )}

            <div className={styles.card}>
                <h2 className={styles.sectionTitle}>🏥 Historique des visites</h2>

                {appointments.length === 0 ? (
                    <p className={styles.emptyState}>Aucune visite enregistrée</p>
                ) : (
                    <div className={styles.visitList}>
                        {appointments.map((visit) => (
                            <div key={visit.id} className={styles.visitItem}>
                                <p className={styles.visitDate}>{new Date(visit.date).toLocaleDateString("fr-FR")}</p>
                                <h3 className={styles.visitReason}>{visit.reason}</h3>

                                {visit.veterinarian && <p className={styles.visitVet}>Dr {visit.veterinarian.lastName}</p>}

                                <div className={styles.visitDetails}>
                                    <span className={`${styles.visitStatus} ${visit.status === "scheduled" ? styles.statusScheduled : styles.statusCompleted}`}>
                                        {visit.status === "scheduled" ? "Prévu" : visit.status === "completed" ? "Terminé" : visit.status}
                                    </span>
                                    {visit.notes && (
                                        <p>
                                            <strong>Notes:</strong> {visit.notes}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}