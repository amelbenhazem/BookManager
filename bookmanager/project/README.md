# BookManager

BookManager est une application web développée en Angular qui permet aux utilisateurs de gérer une collection de livres.

## Fonctionnalités

- Consulter la liste des livres
- Ajouter un nouveau livre
- Modifier les informations d'un livre existant
- Supprimer un livre
- Chercher un livre par titre ou auteur

## Prérequis techniques

- Node.js (version 18 ou plus récente)
- Angular CLI (version 19)

## Installation

1. Clonez ce dépôt
2. Installez les dépendances :

```bash
npm install
```

3. Démarrez le serveur de développement :

```bash
npm start
```

4. Ouvrez votre navigateur à l'adresse `http://localhost:4200`

## Tests

Pour exécuter les tests unitaires :

```bash
ng test
```

## Structure du projet

Le projet est organisé comme suit :

- `src/app/components/` : Composants de l'interface utilisateur
- `src/app/models/` : Modèles de données
- `src/app/services/` : Services pour la gestion des données
- `src/app/app.routes.ts` : Configuration des routes de l'application

## Utilisation

### Consulter la liste des livres

La page d'accueil affiche la liste complète des livres disponibles.

### Ajouter un livre

1. Cliquez sur le bouton "Add New Book"
2. Remplissez le formulaire avec les informations du livre
3. Cliquez sur "Add Book"

### Modifier un livre

1. Dans la liste des livres, cliquez sur le bouton "Edit" du livre concerné
2. Modifiez les informations souhaitées
3. Cliquez sur "Update Book"

### Supprimer un livre

1. Dans la liste des livres, cliquez sur le bouton "Delete" du livre concerné
2. Confirmez la suppression

### Rechercher un livre

Utilisez la barre de recherche en haut de la page pour filtrer les livres par titre ou auteur.

## Données

L'application utilise le stockage local (localStorage) du navigateur pour persister les données entre les sessions.