FROM node:18 AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g @angular/cli

CMD ng serve --host 0.0.0.0 --port 4200

EXPOSE 4200