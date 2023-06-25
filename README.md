# Sistemas-Distribuidos

## Diagrama completo
![Diagram](Diagrama%20de%20Infraestructura.drawio.svg)

## Diagrama de implementación
![Diagrama de implementacion](https://github.com/RafaelRodriguezSanz/Sistemas-Distribuidos/assets/69221486/c93fe463-5d4b-4727-a251-63798c7bf860)


## Pre-Requisites

### Make CLI (recomended)

To execute the project install Make CLI tool.

For that we need to instal Chocolatey first with the next command:

```cmd
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

After that we can install Make CLI tool with the next command:

```cmd
choco install make
```

Be careful. Some antivirus recognize make.exe file as a threat. Don't trust the antivirus 🤣

## Docker

To install docker please, follow the [official documentation](https://docs.docker.com/desktop/install/windows-install/ "Docker Doc").

Also we need to install docker compose. Follow this [documentation](https://docs.docker.com/compose/install/other/).

## Installation

To build and create the images of the different nodes of the distributed system, you can execute the make commands or execute them in a cmd or powershell command prompt.

### Commands

#### Build

```cmd
make build
```

This command will build all projects and create their packages.

#### Start

```cmd
make start
```

This command whill stop and start docker deamon form scratch.

#### Deploy

```cmd
make deploy
```

This command will execute docker-compose to create the images, containers and configurations for all the distributed system.
