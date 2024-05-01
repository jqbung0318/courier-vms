# Courier VMS Backend

*Currently in dev mode only*

## Description

This is a project bootstrapped with [Nest](https://github.com/nestjs/nest) framework with TypeScript. This serves mainly as the backend services for the Courier VMS.

The project mostly utilising a few 3rd party services for API access:
- Database: Postgres, used in a independent container in docker
- Prisma: ORM
- API Interface: GraphQL

## How to Start Developing/Using?
### Prerequisites
- Docker
- Docker Compose
- NPM

Run the `npm ci` to get the dependency snapshot based on package-lock.json on your running developing machine. This is mainly for linting service.


```shell
# snapshot dependency
npm ci
# schema generation for linting
npx prisma generate

# start service in container
docker-compose build
docker-compose up
docker-compose exec backend npx prisma migrate reset

# initiate backup
docker-compose exec postgres backup
# view list of postgreSQL backups
docker-compose exec postgres backups
# restore the backup to the container
docker-compose exec postgres restore <your stated .sql.gz>
```

Right after running the Prisma migration, you should able to see the data seeding done automatically.

## Files & Directories
[/src](./src/) is where the frontend source code mainly sitted. While other folders in the project directory also plays important roles (check below for description).


| Files/Directories | Description |
| ----------------- | ----------- |
| [compose/](./compose/) | Dockerfile scripts with executables. Organised by container |
| [db/](./db/) | sql backup generated from the docker container. Linked with the direcotry inside container. |
| [prisma/](./prisma/) | Prisma ORM schemas and migration files. Also has seeds for initial data. |
| [src/](./src/) | Core logic of the VMS service. APIs. |


