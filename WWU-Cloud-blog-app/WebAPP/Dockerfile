FROM node:17-alpine

WORKDIR /usr/app

# Install dependancies
COPY ./package.json ./
RUN npm install
COPY ./ ./

#Default command
CMD ["npm","start"]
