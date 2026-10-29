# Arsène Tshitenga — portfolio créatif

Portfolio bilingue français / anglais pour présenter les projets frontend et les expérimentations d’Arsène Tshitenga Ntambwa.

## Lancer en local

    npm install
    npm run dev

Le site est servi sous /fr et /en. La racine / choisit une langue avec Accept-Language et utilise le français par défaut.

    npm run build
    npm run start
    npm run lint

Définir NEXT_PUBLIC_SITE_URL avec l’URL publique avant le déploiement pour générer un sitemap et des métadonnées canoniques corrects.

## Architecture

- src/app/[locale] : routes et métadonnées localisées.
- src/components : navigation, cartes, formulaire, scènes et effets interactifs.
- src/i18n : routage et configuration next-intl.
- messages : textes français et anglais, y compris les noms accessibles.
- src/app/globals.css : variables de thème, styles responsive, focus clavier et mouvement réduit.

Les projets sensibles sont décrits sans publier de détails internes ni de résultats chiffrés non vérifiés.

## Direction visuelle

Concept retenu : **Kinshasa / signal de nuit**. Une composition éditoriale, un fond d’encre, une lumière vert citron et des accents corail donnent une signature chaleureuse et numérique. Les cartes des projets utilisent des compositions CSS originales plutôt que des images génériques. Le langage visuel est une interprétation originale des références de portfolio haut de gamme, pas la reproduction d’un site existant.

## Choix techniques

- **WebGL natif pour le champ lumineux du hero** : une seule shader scène suffit ici. Elle évite d’ajouter le runtime 3D de three.js/R3F pour un effet 2D. Le rendu est plafonné en résolution, limité à 30 fps sur mobile, arrêté hors écran / onglet inactif et figé quand prefers-reduced-motion est activé. Le fond CSS sert de repli.
- **CSS et IntersectionObserver pour les apparitions éditoriales** : les transitions sont courtes et limitées aux sections. Lenis et GSAP ne sont pas chargés car le site n’a pas besoin d’un second moteur de scroll ou de timelines lourdes.
- **next-themes** fournit les modes clair, sombre et système. Les couleurs viennent de variables CSS.
- **next-intl** fournit les routes, les liens localisés, le sélecteur de langue et les messages.
- Le formulaire prépare un message mailto: validé par le navigateur. Pour envoyer sans application de messagerie, connecter une API et un fournisseur avec secrets de déploiement.

## À renseigner avant publication

- Configurer NEXT_PUBLIC_SITE_URL pour le domaine réel.
- Vérifier l’adresse e-mail et les coordonnées de contact.
- Ajouter des captures autorisées des projets et leurs résultats mesurés lorsqu’ils peuvent être publiés.
- Produire des maquettes desktop/mobile et faire un audit Lighthouse et accessibilité sur les navigateurs cibles.