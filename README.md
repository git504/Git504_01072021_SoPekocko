# So-Pekocko 🌶️🌶️🌶️

[LINK REPO](https://github.com/git504/SoPekocko)

API sécurisée pour une application d'avis gastronomiques - 6eme projet du parcours DEV-WEB @ OPENCLASSROOMS

Pour faire fonctionner ce projet **OPENCLASSROOMS** 

## sous **UBUNTU**, vous devez installer :
- [NodeJS](https://nodejs.org/en/download/) en version 12.14 ou 14.0 
- [Angular CLI](https://github.com/angular/angular-cli) en version 7.0.2.
- [node-sass](https://www.npmjs.com/package/node-sass) : attention à prendre la version correspondante à NodeJS. Pour Node 14.0 par exemple, installer node-sass en version 4.14+.

***

![LOGO](./15674356878125_image2.png)

## 🌶  Installation Node.js sous **UBUNTU** 

> la version NodeJS en version 12.14 ou 14.0 fonctionne en local;
> ou bien installez en global la version "**Recommended For Most Users**", ici, la version 14;

1. `sudo apt-get install curl`
2. `curl -sl https://deb.nodesource.com/setup_14.x | sudo -E bash -`
3. `sudo apt-get install nodejs`
4. `nodejs --v`

***

## 🌶  Installation CLI Angular sous **UBUNTU**
  
1. `nodejs --npm`
2. `sudo npm install -g @angular/cli`

***

## 🌶  Connexion à **MongoDB**

1. Dans le fichier APP.JS, ligne 20, remplacer "login:mdp" par un accès valide. 
2. Les accès sont fournis dans le document des livrables (paragraphe n°2).

***

## 🌶  Lancement de l'application

1. `cd frontend`
2. `npm install`
3. `ng serve` 

Veillez à avoir toujours un terminal qui exécute `ng serve`

4. `cd backend`
5. `nodemon server` 

Le frontend est disponible sur http://localhost:4200/
Le backend est disponible sur http://localhost:3000/