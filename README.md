# AmbilightSinric

Allows you to control your Ambilight [HyperHDR](https://github.com/awawa-dev/HyperHDR) directly via Google Home, the Google Assistant, Alexa, IFTT, or Samsung Smarthings.

What can you do with it :
- Turn off / Turn on the ambilight
- Set a fixed color using your voice or the app of your choice
- Use the ambilight as a regular connected lamp
- Change the luminiosity of the rgb strip

When a color is selected, you will have to stop / start or use the keyword "restart Ambilight" to return the Amblight mode.

### Usage

To make this project work, you will need to use the service named [Sinric](https://sinric.pro/).

#### 1. Setting up the link with Sinric

- Start by opening an account on [Sinric](https://sinric.pro/)
- Then create a RGB lamp in the tab `Devices` > `Add Device` and choose `Smart Light Bulb`. You can give it a name, a description, and a room (but this is not important).
- Once the lamp is created, go back to the `Devices` page and copy the lamp ID

- Duplicate the `.env.example` template and name it `.env`

- Paste the lamp ID value after `SINRIC_DEVICE=` (be careful with spaces)

- Go back to the Sinric website and go to the `Credentials` tab, you will find your APP KEY and APP SECRET, then copy them into your `.env` file

- Then you have to fill in the IP address and the port of the management panel of your Hyperion instance in the `.env` file

#### 2. Start the project

##### Use with docker on Raspberry Pi
By default, the image used is build for the architecture of a **Raspberry Pi 3**.

You can change the `nodejs` image used in the first line of the `Dockerfile`.

To start, you need to build the image in the local repository :

`docker build . -t ambilightsinric`

Then, start the service with the following command:

`docker run -d --restart always --name ambilightsinric --env-file ./.env ambilightsinric`

You can see the logs with the following command:

`docker logs ambilightsinric`

#### 3. Linking Sinric <> Google Home
1. Open the `Google Home` application on your phone
2. Click on the `+` icon
3. Go to `Set up a device`.
4. Click on `Work with Google`.
5. Click on `Sinric Pro` in the list 
6. Finish linking to your account
7. Sinric devices will appear in the application

#### 4. Linking Sinric <> Samsung SmartThings 
1. Open the `Samsung SmartThings` application on your phone
2. Click on the `+` icon
3. Go to `Device`.
4. Click on `By Brand`.
5. Click on `Sinric Pro` in the list
6. Finish linking to your account
7. Sinric devices will appear in the application
