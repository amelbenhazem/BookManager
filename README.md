# BookManager Application

## Description

**BookManager** est une application de gestion de livres permettant aux utilisateurs de :

- Rechercher, ajouter, modifier et supprimer des livres
- Demander l'accès à des livres
- Évaluer les livres (1 à 5 étoiles)
- Ajouter des commentaires sur les livres
- Accéder à un tableau de bord d'administration pour la gestion des demandes et des livres

### Fonctionnalités principales

-  **Notation par étoiles** (1 à 5)
-  **Commentaires** pour les utilisateurs ayant un accès approuvé
-  **Demandes d'accès** avec badge de statut (en attente, approuvé, rejeté)
-  **Dashboard admin** pour approuver/rejeter les demandes
-  **CRUD des livres** pour les administrateurs
-  **Gestion des rôles utilisateurs** (lecteur / administrateur)
-  **Filtrage et recherche** par titre, auteur, catégorie, etc.
-  **Interface responsive** compatible avec tous les appareils

---

## Technologies utilisées

- **Frontend** : Angular 15
- **Gestion d’état** : Services Angular, `localStorage` pour la persistance
- **CSS** : Styles globaux + responsive design
- **Routing** : Routes protégées avec guards d'authentification
- **Formulaires** : Réactifs et basés sur des templates
- **Notifications** : Alertes visuelles pour retour utilisateur

---

##  Installation

### Prérequis

- Node.js v16+  
- Angular CLI

### Étapes d'installation

1. Installer Angular CLI :

   npm install -g @angular/cli
 
2.Cloner le projet et ouvrir dans VS Code

3.Installer les dépendances :
    npm install

4.Lancer le serveur Angular :
    ng serve
5.Ouvrir le navigateur sur :
    http://localhost:4200
    
##  Structure du projet

book-manager/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   └── request-dashboard/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── book-card/
│   │   │   ├── book-list/
│   │   │   └── book-form/
│   │   ├── models/
│   │   │   └── book.model.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── book-request.service.ts
│   │   │   └── review.service.ts
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   ├── app.component.ts
│   │   └── app.routes.ts
│   ├── assets/
│   ├── styles/
│   │   └── global_styles.css
│   ├── environments/
│   └── main.ts
├── angular.json
├── package.json
└── README.md


##  Fonctionnalités détaillées
1. Gestion des utilisateurs (Admin / Lecteur)
    Inscription via la page Registration

    Demande d’accès aux livres (lecteurs)

    Gestion des demandes via le Dashboard Admin

2. Notation et Commentaires
    Notation de 1 à 5 étoiles après obtention de l'accès

    Ajout de commentaires sur les livres évalués

3. Recherche et filtres
    Recherche par titre, auteur, ou catégorie

    CRUD complet pour les livres (admin uniquement)

4. Interface responsive
    Affichage en cartes adaptables (mobile, tablette, desktop)

    Expérience utilisateur fluide et animée

## Exemples de workflows
 ** Lecteur
S'inscrire

Rechercher un livre

Demander l’accès

Attendre l’approbation

Noter et commenter le livre

  **Administrateur
  
Se connecter avec un compte admin

Accéder au Dashboard Admin

Gérer les demandes des lecteurs

Gérer les livres (ajout, modification, suppression)

 ## Compte administrateur de test
Email : admin@example.com

Mot de passe : admin123

Utilisez ces identifiants pour tester les fonctionnalités administrateur.


