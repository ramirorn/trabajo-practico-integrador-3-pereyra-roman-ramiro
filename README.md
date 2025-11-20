# Trabajo Práctico Integrador 3

Descripción breve

Este repositorio contiene una aplicación full-stack (frontend React + backend Node/Express) para gestión de tareas con autenticación. La interfaz sigue una estética "neón" en modo oscuro y el backend usa Sequelize para persistir datos en una base de datos SQL.

Estructura principal

- `frontend/` — aplicación React (Vite + Tailwind).
- `servidor/` — API en Node/Express con Sequelize.

Requisitos

- Node.js (>=16)
- npm
- Una base de datos compatible con Sequelize (MySQL, Postgres, etc.)

Instrucciones de instalación

1. Clonar el repositorio

```powershell
git clone <tu-repo-url>
cd trabajo-practico-integrador-3
```

2. Instalar dependencias y ejecutar el servidor (backend)

```powershell
cd servidor
npm install
# Crear y configurar .env (ver sección siguiente)
npm run dev
```

3. Instalar dependencias y ejecutar el frontend

```powershell
cd ..\frontend
npm install
npm run dev
```

4. (Opcional) Poblar la base de datos de ejemplo

```powershell
cd ..\servidor
npm run db:seed
```

Configuración del archivo .env

Crea un archivo `.env` dentro de la carpeta `servidor/` con las variables necesarias. Ejemplo mínimo:

```
# servidor/.env (ejemplo)
PORT=3000

# Base de datos (ajusta según tu motor)
DB_NAME=nombre_db
DB_USER=usuario_db
DB_PASSWORD=contraseña_db
DB_HOST=localhost
DB_PORT=3306
DB_DIALECT=mysql

# JWT
JWT_SECRET=tu_secreto_jwt
```

Notas

- El backend en `servidor/app.js` configura CORS permitiendo origen `http://localhost:5173` (puerto por defecto de Vite). Si cambias el puerto del frontend, actualiza esa configuración.
- Todas las peticiones fetch desde el frontend usan `credentials: 'include'` para enviar/recibir cookies de sesión.
- Si usas otro dialecto de base de datos (por ejemplo `postgres`), ajusta `DB_DIALECT` y el puerto correspondiente.
