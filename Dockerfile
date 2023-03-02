FROM node:16.14-alpine

RUN npm install -g npm@8.12.2

WORKDIR /usr/app

COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./

RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev:ts"]