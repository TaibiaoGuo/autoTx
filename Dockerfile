FROM node:8.11.1 AS  builder

MAINTAINER Taibiao

COPY . /app/

WORKDIR /app
RUN npm --registry https://registry.npm.taobao.org   install  -g cnpm

RUN cnpm install --production

FROM node:8.11.1-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
CMD [ "node", "autotx"]
