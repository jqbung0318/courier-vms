# Courier VMS Frontend

*Currently in dev mode only*

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This project is heavily used the frontend UI component like [shadcn/ui](https://ui.shadcn.com/) and the communication with backend is via GraphQL using ApolloClient.


## How to Start Developing/Using?
This project is developed with the backend together. Make sure that the backend service has started running before this.

### Prerequisites
- VMS Backend
- Docker
- Docker Compose
- NPM

```shell
# grab the dependency by the "snapshot" in package-lock.json
# this is to see most of the library linting in dev environment
npm ci

# build and start the service
docker-compose build && docker-compose up

# in case you need to remove the containers/services
docker-compose down
```

Once started, please visit [http://localhost:3000](http://localhost:3000) in your browser for the dashboard


## Files & Directories
[/src](./src/) is where the frontend source code mainly sitted. This project also has files for containerisation like [docker-compose.yaml](./docker-compose.yaml) 

| Files/Directories | Description |
| ----------------- | ----------- |
| [/app](./src/app/) | NextJS web pages. Mainly rendered in server side. |
| [/components](./src/components/) | Main folder for UI/React Components. Most element are client side rendered due to the utlised library. |
| [/components/ui/[folder]](./src/components/ui/) | Components written based on each of the module/feature.  |
| [/components/ui/[files]](./src/components/ui/) | UI components bootstrap from shadcn/ui  |
| [/lib/](./src/lib/) | Main folder for schemas and functions for API communications. |
| [/lib/graphql](./src/lib/graphql/) | Folders of curate GraphQL queries and mutations. Organised based on the module. |
| [/lib/definitions.ts](./src/lib/definitions.ts) | Data Types declarations. |
| [/lib/schema.ts](./src/lib/schema.ts) | Form validations and schemas. |


