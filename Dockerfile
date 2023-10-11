FROM oven/bun:latest as build-stage

WORKDIR /build

COPY . ./

RUN bun install

RUN bun build ./src/index.js --outdir ./build

# Reduce image size
FROM  --platform=linux/amd64 oven/bun:latest

WORKDIR /app

COPY . ./

EXPOSE 3000

CMD ["bun","serve","-s","build"]