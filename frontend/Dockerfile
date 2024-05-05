###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine AS DEVELOPMENT

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000


###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine AS BUILD

WORKDIR /app

COPY --from=DEVELOPMENT /app/package*.json ./
COPY --from=DEVELOPMENT /app/node_modules ./node_modules
COPY . .

RUN npm run build

RUN npm ci --omit=dev && npm cache clean --force


###################
# PRODUCTION
###################

FROM node:18-alpine AS PRODUCTION

WORKDIR /app

COPY --from=BUILD /app/.next ./.next
COPY --from=BUILD /app/public ./public
COPY --from=BUILD /app/package.json ./package.json

CMD [ "npm" "start" ]
