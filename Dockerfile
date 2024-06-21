# FROM node:22
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm install -g nodemon
# EXPOSE 3000
# CMD ["npm", "start"]

FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENV PORT=3000
CMD [ "npm", "start" ]
