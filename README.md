Killian LE VAILLANT projet rabitmq

# Pour lancer l'application

Vous devez avoir docker sur votre machine

Par la suite dans un terminal, vous pouvez lancer la commande :

```docker-compose up --build```

Cette commande va lancer :
- La base de données
- RabitMQ
- L'API de commandes
- Le worker

L'API et le Worker sont lancés 15 seconds après le lancement de RabitMQ


# Point d'accès de l'api :

Vous avez accès a une collection postman dans : ```Project RabbitMQ.postman_collection.json```

Dans postmap faite "import" -> "choose File" -> sélectioner le fichier json -> faire "import"

## Pour vérifier qu'elle est en route :

Page d'accueil (API is running) 

```GET http://localhost:3000/```

## Pour faire une demande de commande :

```POST http://localhost:3000/insert```

Vous pouvez ajouter en query params le nom de la commande :
```POST http://localhost:3000/insert?name=toto```
par default ce sera commande

Vous recevrez en retour l'id généré

## Vérifier le status de la commande

Vous pouvez vérifier le statut de la commande a l'ai de l'id que vous avez reçu.

```GET http://localhost:3000/order/:id```

(avec ":id" l'id de la commande)


## Voir toutes les commandes 

Vous pouvez voir toutes les commande avec :

```GET http://localhost:3000/fetch```

# Organisation des fichiers

- index.js = l'API de commandes
- worker.js = Le worker qui va consomer la queue

Les helpers
- rabitmq.js = helper pour conextion rabitmq
- dbMysql.js = helper pour conextion base de données


# RabitMq :

Vous pouvez accéder a l'interface rabitmq avec http://localhost:15672/

user : guest
mdp : guest

Normalement la queue est crée authomatiquement

Mais vous pouvez en ajouter une dans "queues" -> "add queue"

Le nom de la queue doit étre le m^me que dans le .env
