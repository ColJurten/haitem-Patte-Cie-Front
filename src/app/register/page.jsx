"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/app/utils/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import styles from "./register.module.css";

const schema = z.object({
    firstName: z.string().min(1, "Prénom requis"),
    lastName: z.string().min(1, "Nom requis"),
    phone: z.string().min(10, "Téléphone invalide"),
    username: z.string().min(1, "Nom d'utilisateur requis"),
    email: z.email("Email invalide"),
    password: z.string().min(6, "Le mot de passe doit faire au moins 6 caractères"),
});

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        setError("");
        try {
            const authModule = api.getModule("authModule");

            const user = await authModule.register(data);

            if (user) {
                router.push("/login");
            } else {
                setError("Erreur lors de l'inscription");
            }
        } catch (e) {
            console.error(e);
            setError("Une erreur est survenue lors de l'inscription");
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h1 className={styles.title}>Inscription</h1>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="firstName" className={styles.label}>Prénom</label>
                            <input id="firstName" className={styles.input} {...register("firstName")} />
                            {errors.firstName && <p className={styles.errorMessage}>{errors.firstName.message}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="lastName" className={styles.label}>Nom</label>
                            <input id="lastName" className={styles.input} {...register("lastName")} />
                            {errors.lastName && <p className={styles.errorMessage}>{errors.lastName.message}</p>}
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="username" className={styles.label}>Nom d&apos;utilisateur</label>
                        <input id="username" className={styles.input} {...register("username")} />
                        {errors.username && <p className={styles.errorMessage}>{errors.username.message}</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="phone" className={styles.label}>Téléphone</label>
                        <input id="phone" className={styles.input} {...register("phone")} />
                        {errors.phone && <p className={styles.errorMessage}>{errors.phone.message}</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input id="email" type="email" className={styles.input} {...register("email")} />
                        {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>Mot de passe</label>
                        <input id="password" type="password" className={styles.input} {...register("password")} />
                        {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
                    </div>

                    {error && <p className={styles.globalError}>{error}</p>}

                    <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                        {isSubmitting ? "Inscription..." : "S'inscrire"}
                    </button>
                </form>

                <p className={styles.footer}>
                    Déjà un compte ?{" "}
                    <Link href="/login" className={styles.link}>
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    );
}