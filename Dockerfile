FROM node:8.11.1 AS  builder
MAINTAINER Taibiao
COPY . /app/
WORKDIR /app
RUN npm install --production

FROM node:8.11.1-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
CMD [ "node", "autotx"]
