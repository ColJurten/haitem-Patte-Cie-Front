"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/app/utils/api";
import styles from "./NavBar.module.css";

export default function Navbar() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                api.setToken(token);
                try {
                    const authModule = api.getModule("authModule");
                    const userData = await authModule.me();
                    setUser(userData);
                } catch (error) {
                    console.error("Failed to fetch user", error);
                    localStorage.removeItem("token");
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const handleLogout = async () => {
        try {
            const authModule = api.getModule("authModule");
            await authModule.logout();
        } catch (error) {
            console.error("Logout error", error);
        } finally {
            localStorage.removeItem("token");
            api.setToken(null);
            setUser(null);
            router.push("/login");
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    if (loading) return null;

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoIcon}>🐾</span> PetCare
                </Link>

                <div className={`${styles.links} ${isMenuOpen ? styles.linksOpen : ""}`}>
                    <Link href="/" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                        Accueil
                    </Link>

                    {user && (
                        <Link href="/dashboard" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                            Dashboard
                        </Link>
                    )}

                    {user ? (
                        <>
                            <span className={styles.navUser}>
                                {user.username} ({user.role})
                            </span>
                            <button onClick={handleLogout} className={styles.btnLogout}>
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className={styles.btnLogin} onClick={() => setIsMenuOpen(false)}>
                                Connexion
                            </Link>
                            <Link href="/register" className={styles.btnRegister} onClick={() => setIsMenuOpen(false)}>
                                Inscription
                            </Link>
                        </>
                    )}
                </div>

                <button className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ""}`} onClick={toggleMenu}>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </button>
            </div>
        </nav>
    );
}