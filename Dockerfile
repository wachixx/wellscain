FROM node:15.13-alpine AS development
ENV NODE_ENV development
WORKDIR /athenian
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 3000
# Start the app
CMD [ "npm", "start" ]