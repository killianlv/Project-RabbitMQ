# Getting Started with Create React App
docker-compose up
# end point
[http://localhost:3000](http://localhost:3000)

[http://localhost:3000/insert](http://localhost:3000/insert)

[http://localhost:3000/fetch](http://localhost:3000/fetch)

Rabit : [http://localhost:15672/](http://localhost:15672/)



# Pour lancer l'application

Vous devez avoir docker sur votre machine

Par la suite dans un terminal vous pouvez lancer la commande :

```docker-compose up --build```

Cette commande va lancer :
- La base de données
- RabitMQ
- L'API de commandes
- Le worker

L'API et le Worker sont lancer 15 secons après le lancement de RabitMQ


# Point d'accès de l'api :

## Pour vérifier qu'elle est en route :

Page d'accueil (hello world) 

```GET http://localhost:3000/```

## Pour faire une demande de commande :

```POST http://localhost:3000/insert```

Vous pouvez ajouter en query params le nom de la commande :
```POST http://localhost:3000/insert?name=toto```
par default ce sera commande

Vous receverez en retour l'id généré

## Vérifier le status de la commande

Vous pouvez vérifier le status de la commande a l'ai de l'id que vous avez recu.

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
