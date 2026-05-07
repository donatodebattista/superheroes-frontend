# Etapa 1: Construcción
FROM node:20-alpine AS build

WORKDIR /app

# Argumento para la URL de la API (opcional, permite inyectar la URL del backend al construir)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código
COPY . .

# Compilar la aplicación para producción
RUN npm run build

# Etapa 2: Servidor Web
FROM nginx:alpine

# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos construidos desde la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
