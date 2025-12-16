import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// [HF] Composants de layout global
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import BottomNav from "@/components/BottomNav/BottomNav";
import TopNavBar from "@/components/NavBar/NavBar";

// [HF] Fonts Next (déjà générées par create-next-app)
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// [HF] Métadonnées globales du site
export const metadata = {
    title: "Patte & Cie - Carnet de santé animal",
    description: "Application de consultation du carnet de santé des animaux.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                {/* Header global du site */}
                <Header />
                <TopNavBar />

                {/* Contenu des pages */}
                {children}

                {/* Footer + navbar mobile */}
                <Footer />
                <BottomNav />
            </body>
        </html>
    );
}
