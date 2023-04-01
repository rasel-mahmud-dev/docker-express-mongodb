
# Docker nodejs binary
FROM node:alpine

# docker application directory
WORKDIR /app

# copy application package.json file
# COPY package*.json .
COPY ["package.json", "package-lock.json*", "./"]

# install application dependency
# RUN npm ci 

RUN npm install 


# copy all source code.
COPY . .


# RUN chown -R node /app/node_modules

# isolate application port
EXPOSE 3000

# run application command
CMD [ "npm", "run", "dev" ]


