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

# Deploying
Additional deployment documentation will be added as I get closer to releasing a beta version of this freeware.