# 5. Dictionnaire de données

Ce dictionnaire décrit les champs utilisés dans l'application "Patte & Cie – Carnet de santé animal".

| Entité       | Attribut        | type    | Format / Exemple                                    | Contraintes                                                      |
| ------------ | --------------- | ------- | --------------------------------------------------- | ---------------------------------------------------------------- |
| ANIMAL       | id_animal       | entier  | 1                                                   | PK, unique, obligatoire                                          |
| ANIMAL       | nom             | string  | Moka                                                | obligatoire                                                      |
| ANIMAL       | espece          | string  | Chien, Chat                                         | liste de valeurs                                                 |
| ANIMAL       | race            | string  | Border Collie                                       | optionnel                                                        |
| ANIMAL       | sexe            | string  | `"M"` / `"F"`                                       | liste fermée                                                     |
| ANIMAL       | date_naissance  | date    | 2019-05-12                                          | optionnel                                                        |
| ANIMAL       | poids_kg        | `float` | 18.2                                                | optionnel                                                        |
| ANIMAL       | couleur_robe    | string  | Noir et blanc                                       | optionnel                                                        |
| ANIMAL       | photo_url       | string  | img/moka.jpg                                        | optionnel                                                        |
| ANIMAL       | id_proprietaire | entier  | 1                                                   | FK → PROPRIETAIRE, oblig.                                        |
| ANIMAL       | sterilise       | bool    | true / false                                        | optionnel (ou calculé)                                           |
| ANIMAL       | numero_puce     | string  | 250268500123456                                     | optionnel, doit être unique si présent                           |
| PROPRIETAIRE | id_proprietaire | entier  | 1                                                   | PK, unique, oblig.                                               |
| PROPRIETAIRE | nom             | string  | haitem                                              | obligatoire                                                      |
| PROPRIETAIRE | prenom          | string  | ouioui                                              | obligatoire                                                      |
| PROPRIETAIRE | telephone       | string  | +33 6 12 34 56 78                                   | optionnel                                                        |
| PROPRIETAIRE | email           | string  | [haitem.h@example.com](mailto:haitem.h@example.com) | optionnel                                                        |
| PROPRIETAIRE | adresse         | string  | 12 rue des Lilas, 13001 Marseille                   | optionnel                                                        |
| VISITE       | id_visite       | entier  | 101                                                 | PK, unique, obligatoire                                          |
| VISITE       | date_visite     | date    | 2024-01-15                                          | obligatoire                                                      |
| VISITE       | motif           | string  | Consultation annuelle                               | obligatoire                                                      |
| VISITE       | commentaires    | string  | RAS, poids stable.                                  | optionnel                                                        |
| VISITE       | id_animal       | entier  | 1                                                   | FK → ANIMAL, obligatoire                                         |
| VISITE       | id_veterinaire  | entier  | 3                                                   | FK → UTILISATEUR.id_utilisateur, doit avoir ROLE = 'veterinaire’ |
| VETERINAIRE  | id_veterinaire  | entier  | 3                                                   | PK, unique, obligatoire                                          |
| VETERINAIRE  | nom             | string  | max                                                 | obligatoire                                                      |
| VETERINAIRE  | prenom          | string  | nono                                                | obligatoire                                                      |
| VETERINAIRE  | email           | string  | [max.nono@example.com](mailto:max.nono@example.com) | optionnel                                                        |
| VETERINAIRE  | telephone       | string  | `+33 4 91 00 00 00`                                 | optionnel                                                        |
| VETERINAIRE  | specialisation  | string  | NAC, chirurgie, généraliste                         | optionnel                                                        |
| TRAITEMENT   | id_traitement   | entier  | 501                                                 | PK, unique, obligatoire                                          |
| TRAITEMENT   | nom_traitement  | string  | Antibiotique, Anti-puces                            | obligatoire                                                      |
| TRAITEMENT   | date_debut      | date    | 2024-01-15                                          | obligatoire                                                      |
| TRAITEMENT   | date_fin        | date    | 2024-01-22                                          | optionnel                                                        |
| TRAITEMENT   | raison          | string  | Otite, vaccination…                                 | optionnel                                                        |
| TRAITEMENT   | commentaires    | string  | 1 comprimé matin/soir…                              | optionnel                                                        |
| TRAITEMENT   | id_visite       | entier  | 101                                                 | FK → VISITE.id_visite, obligatoire                               |
