"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/app/utils/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import styles from "./login.module.css";

const schema = z.object({
    email: z.email("Email invalide"),
    password: z.string().min(1, "Mot de passe requis"),
});

export default function LoginPage() {
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
            const token = await authModule.login(data);

            if (token) {
                localStorage.setItem("token", token);
                api.setToken(token);
                router.push("/dashboard");
            } else {
                setError("Email ou mot de passe incorrect");
            }
        } catch (e) {
            console.error(e);
            setError("Une erreur est survenue lors de la connexion");
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h1 className={styles.title}>Connexion</h1>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
                        {isSubmitting ? "Connexion..." : "Se connecter"}
                    </button>
                </form>

                <p className={styles.footer}>
                    Pas encore de compte ?{" "}
                    <Link href="/register" className={styles.link}>
                        S&apos;inscrire
                    </Link>
                </p>
            </div>
        </div>
    );
}