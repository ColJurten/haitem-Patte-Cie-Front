# 2. Cahier des charges

## 2.1 Cahier des charges fonctionnel

F1 - Consulter la liste des animaux

Le personnel doit voir une liste d’animaux (nom, espèce, propriétaire).

F2 - Rechercher un animal

Le personnel doit pouvoir filtrer la liste par nom d’animal, espèce ou nom de propriétaire.

F3 - Consulter la fiche d’un animal

Le personnel doit pouvoir ouvrir la fiche d’un animal et voir :

-   informations générales (nom, espèce, race, sexe, date de naissance, poids…)
-   informations du propriétaire
-   historique des visites
-   vaccins et dates de rappel
-   prochains rendez-vous.

F4 - Navigation

Depuis la liste → accéder à la fiche d’un animal → revenir à la liste.

F5 - Lisibilité

L’interface doit être claire, lisible rapidement par le personnel en situation de travail.

## 2.2 Cahier des charges technique

T1 - Périmètre technique

-   Application front uniquement (pas de backend).
-   Stack : HTML / CSS / JavaScript (framework possible : Next.js).

T2 - Données

-   Données stockées dans un ou plusieurs fichiers JSON.
-   Chargement des données côté front via fetch().

T3 - Structure des pages

-   Une page "Liste des animaux".
-   Une page "Fiche animal" accessible depuis la liste.
-   Arborescence de projet claire (séparation HTML / CSS / JS / JSON).

T4 - Qualité

-   Code lisible, structuré, sans erreurs bloquantes dans la console.
-   Interface responsive minimale (affichage correct sur écran d’ordinateur et tablette).
