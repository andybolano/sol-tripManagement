FROM node:16.0.0 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:dev

FROM nginx:1.13.12-alpine as production-stage
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 8082
CMD ["nginx", "-g", "daemon off;"]

#docker build -t sol-trip-management .
#docker run -p 8082:8082 --name dockerize-vue-sol-trip-management -d sol-trip-management
