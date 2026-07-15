# Habitudes

Suivi quotidien d'habitudes, sans abonnement. App web statique (HTML/CSS/JS, aucune dépendance de build).

## Tester en local

Ouvre simplement `index.html` dans un navigateur. Les données sont stockées dans le `localStorage` du navigateur (donc propres à cet appareil/navigateur pour l'instant — voir "Prochaines étapes").

## Déployer sur GitHub Pages (gratuit)

1. Crée un repo GitHub (public ou privé), ex. `habitudes`.
2. Mets les fichiers de ce dossier (`index.html`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`) à la racine du repo.
3. Dans le repo GitHub : **Settings → Pages → Source : Deploy from branch → branch `main`, dossier `/ (root)`**.
4. Après ~1 minute, ton app est accessible à `https://<ton-user>.github.io/habitudes/`.

## Installer sur ton téléphone

Une fois l'URL en ligne :
- **Android (Chrome)** : ouvre l'URL → menu ⋮ → "Ajouter à l'écran d'accueil".
- **iPhone (Safari)** : ouvre l'URL → bouton Partager → "Sur l'écran d'accueil".

L'app s'ouvrira alors comme une vraie app, en plein écran, avec fonctionnement hors-ligne grâce au service worker.

## Prochaines étapes (sync multi-appareils via Google Drive)

Actuellement les données restent sur l'appareil (localStorage). Pour synchroniser entre ton PC et ton téléphone via Google Drive :

1. Créer un projet gratuit sur [Google Cloud Console](https://console.cloud.google.com/), activer l'API Google Drive.
2. Créer un identifiant OAuth "Client ID" de type "Web application", en autorisant l'origine `https://<ton-user>.github.io`.
3. Côté app, utiliser Google Identity Services (`https://accounts.google.com/gsi/client`) pour te connecter avec ton compte Google directement depuis le navigateur (pas de serveur nécessaire).
4. Utiliser le scope `drive.file` (l'app ne pourra voir QUE les fichiers qu'elle crée elle-même — pas le reste de ton Drive).
5. Au démarrage : lire le fichier `habits-data.json` sur Drive s'il existe, sinon le créer. À chaque modification : réécrire ce fichier (en plus du localStorage, qui sert de cache hors-ligne).

Dis-moi quand tu veux qu'on passe à cette étape, je peux te générer le code d'intégration directement.
