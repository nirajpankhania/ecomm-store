# Full Stack E-Commerce App

A full-stack e-commerce application built with Node.js, Express, PostgreSQL, and React. Built as a consolidation project after completing The Odin Project.

**Live Demo:** https://nirajpankhania.github.io/ecomm-store

---

## Features

- User registration and login with JWT authentication
- Bcrypt password hashing
- Product listings fetched from a REST API
- Shopping cart with add, remove, and quantity controls
- Persistent login via localStorage
- Protected routes — cart requires authentication
- Automatic CI/CD deployment via GitHub Actions

---

## Tech Stack

**Frontend**
- React (Vite)
- React Router v6
- Axios
- Context API for auth state

**Backend**
- Node.js
- Express
- PostgreSQL
- JWT (jsonwebtoken)
- bcryptjs

**Deployment**
- Frontend: GitHub Pages
- Backend: Render
- Database: Render PostgreSQL

---

## Project Structure

```
ecomm-store/
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/            # Axios instance with auth interceptor
│   │   ├── components/     # Navbar, ProductCard, ProtectedRoute
│   │   ├── context/        # AuthContext and useAuth hook
│   │   └── pages/          # HomePage, LoginPage, RegisterPage, CartPage
│   └── vite.config.js
├── server/                 # Express backend
│   └── src/
│       ├── controllers/    # authController, productController, cartController
│       ├── db/             # PostgreSQL pool and schema
│       ├── middleware/      # JWT authenticate middleware
│       └── routes/         # auth, products, cart routes
└── .github/workflows/      # GitHub Actions deployment
```

---

## Running Locally

### Prerequisites
- Node.js 18+
- PostgreSQL

### 1. Clone the repo

```bash
git clone https://github.com/nirajpankhania/ecomm-store.git
cd ecomm-store
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file based on `.env.example`:

```
PORT=3000
CLIENT_URL=http://localhost:5173
DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/odin_ecommerce
JWT_SECRET=your_long_random_secret
```

Create the database and run the schema:

```bash
psql postgres -c "CREATE DATABASE odin_ecommerce;"
psql odin_ecommerce < src/db/schema.sql
```

Seed some products:

```bash
psql odin_ecommerce -c "INSERT INTO products (name, description, price, stock, image_url) VALUES ('Mechanical Keyboard', 'Tactile switches, RGB backlit', 89.99, 15, 'https://picsum.photos/seed/keyboard/400/300'), ('Wireless Mouse', 'Ergonomic, 3 month battery life', 34.99, 30, 'https://picsum.photos/seed/mouse/400/300'), ('USB-C Hub', '7-in-1 hub with HDMI and ethernet', 49.99, 20, 'https://picsum.photos/seed/hub/400/300'), ('Desk Lamp', 'LED, adjustable colour temperature', 27.99, 50, 'https://picsum.photos/seed/lamp/400/300');"
```

Start the backend:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd ../client
npm install
npm run dev
```

Visit `http://localhost:5173`

---

## Database Schema

```sql
users       — id, email, password_hash, role, created_at
products    — id, name, description, price, stock, image_url, created_at
cart_items  — id, user_id, product_id, quantity, created_at
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register a new user |
| POST | /api/auth/login | No | Login and receive JWT |
| GET | /api/products | No | Get all products |
| GET | /api/products/:id | No | Get single product |
| GET | /api/cart | Yes | Get user's cart |
| POST | /api/cart | Yes | Add item to cart |
| PATCH | /api/cart/:id | Yes | Update item quantity |
| DELETE | /api/cart/:id | Yes | Remove item from cart |

---

## Deployment

The frontend deploys automatically to GitHub Pages on every push to `main` via GitHub Actions. The backend is hosted on Render's free tier — note that it may take 30–60 seconds to spin up on first request after inactivity.

---

## Planned Improvements

- Error messages on failed login
- Cart item count badge in navbar
- Improved product page design
- Real product images
