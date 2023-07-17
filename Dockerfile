FROM node:18-alpine as deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --prod

FROM node:18-alpine as build
WORKDIR /app
COPY tsconfig.json package.json package-lock.json ./
COPY index.ts ./
RUN npm ci
RUN npm run build

FROM node:18-alpine as prod
WORKDIR /app

COPY --from=deps /app/package.json /app/
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
ENV NODE_ENV=production
LABEL fly_launch_runtime="Node.js"

EXPOSE 3000
CMD [ "npm", "run", "start" ]
