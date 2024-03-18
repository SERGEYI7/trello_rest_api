FROM node:18
WORKDIR /app
COPY package*.json /app
RUN npm install
# RUN npm install @nestjs/config
# RUN npm install @nestjs/typeorm typeorm
# RUN npm install pg
# RUN npm install class-validator
COPY . .
RUN npm run build
CMD ["npm", "run", "start:dev"]
