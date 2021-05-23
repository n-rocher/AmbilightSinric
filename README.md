# AmbilightSinric

Permet de contrôler son Ambilight [HyperHDR](https://github.com/awawa-dev/HyperHDR) directement via des applications comme Google Home, l'Assistant Google, Samsung Smarthings, ou autre.

### Utilisation

Pour faire fonctionner ce projet, il vous faudra utiliser le service gratuit nommé [Sinric](https://sinric.pro/).

#### 1. Mise en place de la liaison avec Sinric

- Commencez par ouvrir un compte gratuit sur [Sinric](https://sinric.pro/)
- Ensuite, créez une lampe dans l'onglet `Devices` > `Add Device` et choisissez `Smart Light Bulb`. Vous pouvez lui donner un nom, une description, et une pièce (mais ce n'est pas important)
- Une fois la lampe créée, retournez dans la page `Devices` et copiez l'ID de la lampe

- Dupliquez le template `.env.example` en le nommant `.env`

- Collez la valeur de l'ID de la lampe à la suite de `SINRIC_DEVICE=` (faites attention aux espaces)

- Retournez sur le site de Sinric et allez dans l'onglet `Credentials`, vous trouverez votre l'APP KEY et l'APP SECRET, puis copiez les dans votre fichier `.env`

- Il vous faut ensuite renseigner l'adresse IP et le port du panel de gestion de votre Hyperion dans le fichier `.env`

#### 2. Démarrer le projet

##### Utilisation avec docker sur Raspberry Pi
Par défaut, l'image utilisée est build pour l'architecture d'une **Raspberry Pi 3**.

Vous pouvez changer l'image de ``nodejs`` utilisé dans la première ligne du fichier ``Dockerfile``.

Pour commencer, il faut construire l'image dans le repository local :
`docker build . -t ambilightsinric`

Ensuite, lancez le service avec la commande suivante :
`docker run --restart always ambilightsinric`

#### 3. Liaison Sinric <> Google Home
1. Ouvrez l'application `Google Home` sur votre téléphone
1. Cliquez sur l'icône `+`
1. Allez dans `Configurer un appareil`
1. Cliquez sur `Fonctionne avec Google`
1. Cliquez sur `Sinric Pro` dans la liste 
1. Terminez la liaison avec votre compte
1. Les appareils de Sinric apparaitront dans l'application

#### 4. Liaison Sinric <> Samsung SmartThings
1. Ouvrez l'application `Samsung SmartThings` sur votre téléphone
1. Cliquez sur l'icône `+`
1. Allez dans `Appareil`
1. Cliquez sur `Par marque`
1. Cliquez sur `Sinric Pro` dans la liste 
1. Terminez la liaison avec votre compte
1. Les appareils de Sinric apparaitront dans l'application


