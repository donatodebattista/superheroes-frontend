# Superheroes App - Frontend

Este repositorio contiene el frontend de la aplicación **Superheroes SPA**, construido con React, Vite y Tailwind CSS. Utiliza Nginx para servir los archivos compilados.

## Requisitos previos
- Tener [Docker](https://docs.docker.com/get-docker/) y Docker Compose instalados en el sistema.
- **Importante:** Tener el contenedor del repositorio **Backend** levantado y corriendo en el puerto `3000` de tu máquina local.

## Instrucciones para levantar la aplicación

1. Asegurate de que el backend ya esté funcionando en tu máquina.
2. Abrí una terminal, clona este repositorio y navegá hasta la carpeta del proyecto.
3. Ejecutá el siguiente comando para compilar el frontend y levantar el contenedor web:

   ```bash
   docker-compose up -d --build
   ```

4. **¡Listo!** Podés abrir tu navegador web y acceder a la aplicación en:
   👉 **`http://localhost:5173`**

## Detener la aplicación
Para detener el contenedor del frontend, ejecutá:
```bash
docker-compose down
```
