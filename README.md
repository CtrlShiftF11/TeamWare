# TeamWare
TeamWare is a collaboration app for organizations who want to analyze sprint trends for software teams over extended periods of time.  The data is organized by Team, Project and Sprint and the app is completely self contained in that you do not have to integrate with Rally, JIRA, etc.

The project is open source and is still very much under development.

## Requirements

### Install Virtualbox
[https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads)

### Install docker-machine

#### Mac OSX docker-machine install instructions
```bash
curl -L -o /usr/local/bin/docker-machine https://github.com/docker/machine/releases/download/v0.1.0/docker-machine_darwin-amd64
chmod 755 /usr/local/bin/docker-machine
```
#### Other OS docker-machine install instructions
[Docker Machine install docs](https://docs.docker.com/machine/)

### Install docker-compose
```bash
curl -L https://github.com/docker/compose/releases/download/1.1.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```


# Running the app in dev
```bash
./start
```
# Loading in browser
```bash
open http://$(docker-machine ip):3000/
```

# Docker-Machine Help
A complete list of docker-machine commands can be viewed by entering
```bash
docker-machine --help
```
They are listed below for convenience...
```bash
   active	Get or set the active machine
   create	Create a machine
   config	Print the connection config for machine
   inspect	Inspect information about a machine
   ip		Get the IP address of a machine
   kill		Kill a machine
   ls		List machines
   restart	Restart a machine
   rm		Remove a machine
   env		Display the commands to set up the environment for the Docker client
   ssh		Log into or run a command on a machine with SSH
   start	Start a machine
   stop		Stop a machine
   upgrade	Upgrade a machine to the latest version of Docker
   url		Get the URL of a machine
   help, h	Shows a list of commands or help for one command
```
# Resolving Issues   
If you encounter difficulties running a previously created virtual environment you can kill, remove and rebuild but
please keep in mind that any data that you've entered into the MongoDB demo database will be lost.  Destroying the
environment and rebuilding it may take a significant amount of time due to download processes!

Kill the virtual environment...
```bash
docker-machine kill teamware-dev
```
Destroy the virtual environment...
```bash
docker-machine rm teamware-dev
```
Rebuild the virtual environment from scratch...
```bash
./start
```

If you need to figure out where an existing environment is running simply enter...
```bash
docker-machine ip
```
Remember to append port 3000 to whatever address the docker machine is running at to view it in your browser. 


# Deploying
Additional deployment documentation will be added as I get closer to releasing a beta version of this freeware.