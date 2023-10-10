FROM node:16.3.0 as builder
RUN mkdir app
WORKDIR app

COPY package*.json ./
RUN npm install

RUN npm run build

COPY . ./

FROM node:16.3.0-alpine
COPY --from=builder /app/ /app/
WORKDIR app 
ENV HOST=0.0.0.0

EXPOSE 3000

CMD ["npm","run","start"]