###################
# BUILD FOR LOCAL DEVELOPMENT
###################

# Base image
FROM node:lts AS DEVELOPMENT

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node:node package*.json ./

# Install app dependencies
RUN npm ci --no-audit --no-progress && chown -R node ./node_modules

# Bundle app source
COPY --chown=node:node . .

USER node


###################
# BUILD FOR PRODUCTION
###################

# Image source
FROM node:lts-alpine AS BUILD

# Docker working directory
WORKDIR /app

COPY --chown=node:node package*.json ./

# In order to run `npm run build` we need access to the Nest CLI.
# The Nest CLI is a dev dependency,
# In the previous development stage we ran `npm ci` which installed all dependencies.
# So we can copy over the node_modules directory from the development image into this build image.
# COPY --chown=node:node --from=DEVELOPMENT /app/node_modules ./node_modules
# Do not use chown, this will cause sharpjs unable to install important modules
COPY --from=DEVELOPMENT /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN npx prisma generate
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory.
# Passing in --only=production ensures that only the production dependencies are installed.
# This ensures that the node_modules directory is as optimized as possible.
# RUN npm ci --omit=dev && npm cache clean --force

USER node


###################
# PRODUCTION
###################

# Image source
FROM node:lts-alpine AS PRODUCTION

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=BUILD /app/dist ./dist
COPY --from=BUILD /app/node_modules ./node_modules

# Running `npm ci` removes the existing node_modules directory.
# Passing in --only=production ensures that only the production dependencies are installed.
# This ensures that the node_modules directory is as optimized as possible.
RUN npm ci --omit=dev && npm cache clean --force
COPY --chown=node:node --from=BUILD /app/node_modules/.prisma/client ./node_modules/.prisma/client

# Start the server using the production build
# CMD ["node", "dist/src/main.js"]
