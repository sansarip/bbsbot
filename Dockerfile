FROM node:15.11.0-alpine3.10

RUN mkdir ~/app
COPY . ~/app
WORKDIR ~/app
RUN npm install

EXPOSE 3000
CMD ["node", "app.js"]