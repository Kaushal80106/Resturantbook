# Restaurant Booking System

A full-stack MERN (MongoDB, Express, React, Node.js) web application that allows customers to browse the menu and seamlessly book tables. It features an interactive, movie-theater-style table selection grid, smart time-slot locking, and a dedicated admin dashboard for managing reservations.

## ✨ Features

- **Interactive Table Selection**: Customers pick a date and time, and are presented with a visual grid of 10 tables to choose from.
- **Smart Time Locking**: Booked tables are automatically locked and made unclickable for a 1-hour window to prevent overlap and double-booking.
- **Admin Dashboard**: A secure, password-protected (`/admin`) page where restaurant staff can view all customer reservations in a clean data table.
- **Modern UI**: Smooth scrolling, responsive design, and toast notifications for an excellent user experience.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Axios, React Router, React Hot Toast
- **Backend**: Node.js, Express.js, Mongoose (MongoDB)
- **Database**: MongoDB Atlas

---

## 💻 Local Development Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [Git](https://git-scm.com/) installed on your machine.

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd RestuarantBooking
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `config.env` file in the `backend/config/` directory:
```env
PORT=4000
FRONTEND_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window and navigate to the frontend directory:
```bash
cd foodon
npm install
```
Create a `.env` file in the `foodon/` root directory:
```env
VITE_BACKEND_URL=http://localhost:4000
```
Start the Vite development server:
```bash
npm run dev
```

Your app should now be running! Open `http://localhost:5173` in your browser.

---

## 🚀 Deployment Guide (Railway Backend + Vercel Frontend)

### Step 1: Database (MongoDB Atlas)
1. Ensure your MongoDB Atlas cluster is running.
2. In Atlas **Network Access**, ensure **`0.0.0.0/0` (Allow Access from Anywhere)** is added.

### Step 2: Push Latest Code to GitHub
```bash
git add .
git commit -m "Deploy readiness for Railway and Vercel"
git push origin main --force
```

### Step 3: Deploy Backend to Railway
1. Go to [railway.app](https://railway.app) and log in with GitHub.
2. Click **New Project** → **Deploy from GitHub repo**.
3. Select your repository (**`Resturantbook`**).
4. Click **Add Variables** and configure:
   - `MONGO_URI`: `your_mongodb_atlas_connection_string`
   - `FRONTEND_URL`: *(Leave empty for now, update after Step 4)*
5. Go to **Settings** → **Root Directory** → set to `backend`.
6. Go to **Settings** → **Networking** → Click **Generate Domain**.
7. Copy your new Railway domain (e.g. `https://resturantbook-production.up.railway.app`).

### Step 4: Deploy Frontend to Vercel
1. Go to [vercel.com](https://vercel.com) → **Add New > Project**.
2. Select your repository (**`Resturantbook`**).
3. **Root Directory**: `foodon`.
4. Under **Environment Variables**, add:
   - `VITE_BACKEND_URL`: *(Paste your Railway backend URL from Step 3)*
5. Click **Deploy**. Copy your live Vercel URL (e.g. `https://resturantbook-frontend.vercel.app`).

### Step 5: Final CORS Link
1. Go back to Railway → Project → Variables.
2. Update `FRONTEND_URL` to your live Vercel URL (e.g. `https://resturantbook-frontend.vercel.app`).
3. Railway automatically redeploys. Your MERN app is live!