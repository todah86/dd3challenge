# callenge dd3

Descripción breve del proyecto.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado Node.js y npm en tu máquina. Puedes descargarlos desde [aquí](https://nodejs.org/).

## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando en la raíz del directorio del proyecto:

```bash
npm install

Configuración
Para configurar la conexión a la base de datos, debes editar el archivo ormconfig.json en la raíz del directorio del proyecto. Asegúrate de reemplazar los valores de username y password con los correspondientes a tu máquina local:

archivo .env
PORT=3000
MONGO_URI=mongodb://localhost:27017/challenge
JWT_SECRET=MiS@2024


IMPORTANTE crear la base de datos challenge en mongo para que te funcione. o poner enlace en la nube 
tambien existe una version en la rama feature/postgres donde esta con postgres.



Ejecución en desarrollo
Para iniciar el servidor en modo de desarrollo, ejecuta el siguiente comando:

npm run start:dev


ejemplo de curl para registrarse
curl --location 'http://localhost:3000/api/user/register' \
--header 'Content-Type: application/json' \
--data '{
    "username": "todah89",
    "password": "Lacanaca"
}'

ejemplo de curl para logearse ATENCION en este paso se obtener el token que te servira para entrar a los otros edpoint 

curl --location 'http://localhost:3000/api/user/login' \
--header 'Content-Type: application/json' \
--data '{
    "username": "todah89",
    "password": "Lacanaca"
}'


ejemplo de curl para adivinar palabra

curl --location 'http://localhost:3000/api/game/adivinar' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImlhdCI6MTcwODk4NDEyNiwiZXhwIjoxNzA5MDcwNTI2fQ.dvSh-VVVGzq_AIYUIa1br8LMv0j4hyDgRYpL_nYT30c' \
--header 'Content-Type: application/json' \
--data '{
    "user_word": "JUPON"
}'


ejemplo de curl para obtener estadisticas por usuario

curl --location 'http://localhost:3000/api/game/estadisticas' \
--header 'Authorization:  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWRiYzU3ZDcwNTg2N2RmY2QwM2Y5NWYiLCJpYXQiOjE3MDg5MDE3NzAsImV4cCI6MTcwODk4ODE3MH0.O5w_lyYWqs1paHQ-UbHwUz8C4RhBmuTd_4DRDhL_Db0'

ejemplo de curl para ver los 10 mejores puntajes

curl --location 'http://localhost:3000/api/game/mejores-jugadores' \
--header 'Authorization:  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWRiYzU3ZDcwNTg2N2RmY2QwM2Y5NWYiLCJpYXQiOjE3MDg5MDE3NzAsImV4cCI6MTcwODk4ODE3MH0.O5w_lyYWqs1paHQ-UbHwUz8C4RhBmuTd_4DRDhL_Db0'