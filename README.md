# Carambar & Co - Interface interactive
Ce projet est le client frontend de l'application Carambar & Co. IL s'agit d'une Single Page Application (SPA) moderne construite avec Next.js et Tailwind CSS, permettant de consommer l'API de blagues cultes.

## Liens du projet

- **Dépôt API (Backend)** : [Lien vers repo GitHub back]
- **Interface en ligne**: [Lien vers GitHub Pages]
- **Documentation API**: [ Lien vers Swagger Render]

## Fonctionnalités
- **Landing Page immersive**: Design respectant la charte graphique Carambar (Jaune #FFFF00 et Rouge #E10079)
- **Générateur aléatoire**: Appel asynchrone à l'API pour afficher une nouvelle blague sans recharger la page
- **Accessibilité (A11y)**: Utilisation de balises sémantiques et de contrastes respectant les standards
- **Design Responsive**: Interface adaptée aux mobiles, tablettes et ordinateurs

## Stack Technique
- **Framework**: Next.js 14/15 (App Router)
- **Styling**: Tawilwind CSS
- **Tests**: Cypress & Vitest & React Testing Library

## Installation locale
1. Cloner le projet
```bash
git clone https://github.com/SylvieHoareau/frontend-carambar.git
cd frontend-carambar
```
2. Installer les dépendances
```bash
npm install
```

3. Configurer l'environnement
Créez un fichier .env.local à la racine :

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

4. Lancer le mode développement
```bash
npm run dev
```

## Tests

Pour garantir la stabilité de l'interface, des tests unitaires sont présents :

```bash
npm run test
```
Les tests vérifient le bon rendu des composants, le chargement initial et le comportement du bouton de génération de blagues.


## Architecture Frontend
Le projet est organisé en modules : 
- /src/app : Pages et routing
- /src/components : Composants UI réutilisables
- /src/services : Logique d'appel API (Contralisation des fetch)

