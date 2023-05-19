# syntax=docker/dockerfile:1

FROM node:18-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY dist/ .

ENV NODE_ENV production
ENV PORT 3000

CMD ["node", "index.js"]