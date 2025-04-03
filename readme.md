# 🍵 Coffee Shop - Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white)

The **Coffee Shop** backend manages orders, products, and users, ensuring a smooth and secure shopping experience.

## 🛠️ Project Setup

### ✨ Prerequisits

- [Node.js](https://nodejs.org/) (version 22.14 or higher)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)

### 🗒️ Installation

```bash
# Clone the repository
git clone https://github.com/GabrielOliveira23/coffee-shop-backend.git
cd coffee-shop-backend

# Install dependencies
npm install  # or yarn install
```

### 📊 Database Setup

```bash
# Copy the environment file and configure the variables
cp .env.example .env

# Start the database with Docker
docker-compose up -d

# Run Prisma migrations
npx prisma migrate dev  # or yarn prisma migrate dev
```

### 🔄 Running the Server

```bash
# Start the backend
npm run dev  # or yarn dev
```

The backend will be running at `http://localhost:4000`.

#### 🛠️ API Documentation (Swagger)

The API documentation can be accessed after starting the server. Access it at:[Documentation](http://localhost:4000/docs)
