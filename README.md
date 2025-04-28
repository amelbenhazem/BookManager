# BookManager Application

## Description

**BookManager** est une application de gestion de livres permettant aux utilisateurs de rechercher, ajouter, modifier et supprimer des livres. Les utilisateurs peuvent également demander l'accès à des livres, les évaluer avec des étoiles (1-5) et ajouter des commentaires. L'application propose un tableau de bord pour les administrateurs afin de gérer les demandes d'accès et effectuer des opérations CRUD sur les livres.

### Fonctionnalités principales :

- **Système de notation par étoiles** (1-5 étoiles)
- **Commentaires/reviews sur les livres** pour les utilisateurs ayant un accès approuvé
- **Demandes d'accès aux livres** avec des badges de statut (en attente, approuvé, rejeté)
- **Gestion des demandes par les administrateurs** (approuver/rejeter les demandes)
- **CRUD des livres pour les administrateurs**
- **Gestion des utilisateurs** avec rôles (administrateur/lecteur)
- **Système de filtrage et de recherche** des livres par titre, auteur, catégorie, etc.
- **Interface réactive** et adaptée à tous les appareils

## Technologies utilisées

- **Frontend** : Angular 15
- **Gestion de l'état** : Services Angular, localStorage pour la persistance des données
- **CSS** : Utilisation de styles globaux et responsive design
- **Routing** : Routes protégées avec des gardes d'authentification
- **Formulaires** : Formulaires réactifs et basés sur des templates pour les fonctionnalités de demande et d'ajout de livres
- **Notifications** : Alertes et notifications visuelles lors des actions de l'utilisateur

## Installation

### Prérequis

- Node.js et npm (version 16 ou supérieure)
- Angular CLI

### Étapes d'installation

1. **Clonez le dépôt** :
    ```bash
    git clone https://github.com/amelbenhazem/BookManager.git
    ```

2. **Accédez au dossier du projet** :
    ```bash
    cd book-manager
    ```

3. **Installez les dépendances** :
    ```bash
    npm install
    ```

4. **Lancez le serveur de développement** :
    ```bash
    npm start
    ```

5. **Accédez à l'application dans votre navigateur** :
    Ouvrez votre navigateur et allez à `http://localhost:4200`.

## Structure du projet

Voici la structure du projet Angular :

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


## Fonctionnalités détaillées

### 1. **Gestion des utilisateurs (administrateur/lecteur)**

- Les utilisateurs peuvent s'inscrire via la page de **Registration**.
- Les lecteurs peuvent demander l'accès à des livres via le bouton **Request Access**.
- Les administrateurs peuvent approuver ou rejeter les demandes via le **Dashboard Admin**.

### 2. **Système de notation et commentaires**

- Les utilisateurs peuvent attribuer une note de 1 à 5 étoiles après avoir obtenu l'accès à un livre.
- Les utilisateurs peuvent laisser des commentaires pour chaque livre qu'ils ont évalué.

### 3. **Recherche et filtrage des livres**

- Les utilisateurs peuvent rechercher des livres par titre, auteur et catégorie.
- Les administrateurs peuvent ajouter, modifier ou supprimer des livres.

### 4. **Interface et design responsive**

- Le design est responsive, avec une mise en page par cartes qui s'adapte aux différentes tailles d'écran (mobile, tablette, desktop).
- L'interface est fluide, avec des animations subtiles pour les actions de l'utilisateur.

## Exemple de Workflows

1. **Workflow d'un lecteur :**
   - S'inscrire
   - Rechercher un livre
   - Demander l'accès
   - Attendre l'approbation
   - Après approbation, noter et commenter le livre

2. **Workflow d'un administrateur :**
   - Se connecter via l'email et mot de passe admin
   - Accéder au **Dashboard Admin**
   - Voir et gérer les demandes des lecteurs
   - Approuver ou rejeter les demandes
   - Gérer les livres (CRUD)

## Compte administrateur

- **Email** : admin@example.com
- **Mot de passe** : admin123

Les administrateurs peuvent se connecter à l'application avec ces identifiants pour tester les fonctionnalités d'administration.

