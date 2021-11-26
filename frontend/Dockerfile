FROM node:14.17.5-alpine

ENV HOME=/home/node

USER node

RUN mkdir -p $HOME/app
WORKDIR $HOME/app

COPY . $HOME/app
COPY package.json ./
COPY package-lock.json ./

RUN npm install && \
    npm cache clean --force

ENTRYPOINT ["npm"]
CMD ["start"]

EXPOSE 3000