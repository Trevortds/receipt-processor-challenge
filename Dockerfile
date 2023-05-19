# syntax=docker/dockerfile:1

FROM node:18-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "tsconfig.json", "./"]

COPY . .
RUN npm ci

RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT 3000

CMD ["node", "dist/index.js"]