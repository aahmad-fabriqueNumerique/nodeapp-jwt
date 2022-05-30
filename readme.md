# JWT application avec Backend APIs

les étapes à suivre pour constrire une application web de voitures vintages

* ### Le backend APIs 

Il s'agit d'une application node avec un serveur Express. Cette application servira à se connecter avec le frontend pour fournir des APIs. De plus, cette application utilisera JWT Token pour vérifier la connexion des utilisateur ainsi qu'une base de donnée avec Mongo DB.

  1. npm init pour initialiser l'application
  2. Installation de dépendance :
     1. Express
     2. CORS
     3. BodyParser
     4. jsonwebtoken
     5. Mongoose
  3. Créer le serveur Express
  4. Créer la BDD avec mongo DB et créer le schema avec Mongoose
  5. Créer les APIs et les routes :
     1. Inscription nouveax utilisateurs
     2. Connexion des utilisateurs
     3. récupérer la liste des voitures
     4. récupérer la liste de nos offres
  6. Faire des testes avec Postman
  7. Utiliser la librairie JsonWebToekn pour générer le token
  8. Vérifier le token avec un Middleware


* ### Le frontend Angular 
  1. créer l'application angular avec le CLI
  2. Créer les composants pour afficher les liste des voitures
  3. Créer le formulaire de connexion / inscription
  4. Créer un service pour l'inscription, la connexion et la récupération des données
  5. Sécuriser la connexion avec JWT 
  6. Socker le token dans le front avec LocalStorage
  7. Sécuriser les routes avec AuthGuard
  8. Créer un interceptor de token
  9. Créer un logout

---
<br >


## Diagramme de Séquence : Authentification 
``` mermaid

sequenceDiagram
    participant Navigateur
    participant Serveur

    Note left of Navigateur: Inscription / Connexion
    Navigateur-->>Serveur:  (envoi des détails de l'utilisateur)
    
    activate Serveur
    Note right of Serveur: Générer un token
    Serveur-->>Navigateur: Envoi de token
    deactivate Serveur
   
    Note left of Navigateur: Requete de la route /nos-offres
    Navigateur-->>Serveur: Envoi de token

    activate Serveur
    Note right of Serveur: vérifier le token
    Serveur-->>Navigateur: Envoi de réponse /nos-offres
    deactivate Serveur
```


To be used with this application: https://github.com/aahmad-fabriqueNumerique/Angular-jwtApi-node
