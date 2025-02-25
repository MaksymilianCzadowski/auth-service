# Authentication Client

Un client React moderne pour le service d'authentification, construit avec React, TypeScript, Vite, et Tailwind CSS.

## Fonctionnalités

- Interface utilisateur moderne et réactive
- Animations fluides avec Framer Motion
- Authentification via:
  - Google OAuth2.0
  - GitHub OAuth
  - OpenID Connect (Keycloak)
- Gestion des sessions utilisateur
- Déconnexion sécurisée
- Design responsive

## Prérequis

- Node.js >= 14
- Service d'authentification backend en cours d'exécution

## Installation

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la version de production
npm run preview
```

## Configuration

Le client est configuré pour se connecter au service d'authentification sur `http://localhost:3000`. Si votre service d'authentification s'exécute sur un port ou une URL différente, vous devrez mettre à jour les URL dans le fichier `src/pages/Login.tsx`.

## Flux d'authentification

1. L'utilisateur accède à la page de connexion
2. L'utilisateur choisit une méthode d'authentification (Google, GitHub ou OpenID)
3. L'utilisateur est redirigé vers le fournisseur d'authentification
4. Après une authentification réussie, l'utilisateur est redirigé vers la page de succès
5. Les informations de l'utilisateur sont affichées et un cookie JWT est stocké pour les futures requêtes

## Structure du projet

```
auth-client/
├── public/              # Fichiers statiques
├── src/                 # Code source
│   ├── assets/          # Images et autres ressources
│   ├── pages/           # Composants de page
│   │   ├── Login.tsx    # Page de connexion
│   │   └── Success.tsx  # Page après connexion réussie
│   ├── App.tsx          # Composant principal et routes
│   ├── main.tsx         # Point d'entrée
│   └── index.css        # Styles globaux
├── index.html           # Template HTML
├── package.json         # Dépendances et scripts
└── tsconfig.json        # Configuration TypeScript
```

## Personnalisation

Vous pouvez personnaliser l'apparence et le comportement du client en modifiant les fichiers suivants:

- `src/pages/Login.tsx` - Page de connexion
- `src/pages/Success.tsx` - Page après connexion réussie
- `src/App.css` - Styles CSS personnalisés
- `tailwind.config.js` - Configuration de Tailwind CSS

## Licence

ISC
