# App avenida

Una aplicación web para gestionar pagos utilizando el servicio de Payway.

## Descripción

Este proyecto es una aplicación Node.js escrita en TypeScript que proporciona tres endpoints para agregar pagos, obtener un pago por ID y obtener todos los pagos registrados en la plataforma.

## Instalación

1. Clona este repositorio.
2. Para instalar las dependencias del directorio principal "npm install", para instalar la libreria concurrently que sirve para correr varios procesos a la vez.
3. para instalar las dependencias de frontend ejecutar "npm run install-front" y para el backend "npm run install-back" .
4. para levantar el proyecto ejecutar "npm run all".


## Uso
El backend funciona en el puerto 3001 y el frontend en el 3000. El frontend se conecta con el backend por medio de la propiedad proxy en su archivo package.json.
Para configurar algunas cuestiones como puerto y credenciales de payway ver en el archivo /backend/config/development.json
Backend:
- Utiliza el endpoint `/add` para agregar un nuevo pago.
- Utiliza el endpoint `/getById/:id` para obtener un pago por su ID.
- Utiliza el endpoint `/getAll` para obtener todos los pagos registrados.


