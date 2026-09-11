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

## 🚀 Deployment Guide (100% Vercel)

We will deploy both the Frontend and Backend to Vercel for a seamless, unified hosting experience!

### Step 1: Database (MongoDB Atlas)
1. Ensure your MongoDB Atlas cluster is running.
2. In your Atlas **Network Access** settings, make sure you allow access from anywhere (`0.0.0.0/0`) so Vercel can reach your database.

### Step 2: Push to GitHub
If you are having trouble pushing to GitHub, run these commands in your terminal from the root folder (`RestuarantBooking`):
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```
*(Note: I have added a root `.gitignore` file to ensure you don't accidentally push large `node_modules` folders, which is usually the reason Git pushes fail!)*

### Step 3: Backend Deployment (Vercel)
1. Create an account on [Vercel](https://vercel.com) and click **Add New > Project**.
2. Import your GitHub repository.
3. Edit the **Root Directory** to `backend`.
4. The Build settings will automatically detect the new `vercel.json` file I created for you.
5. Under **Environment Variables**, add:
   - `MONGO_URI`: `your_mongodb_connection_string`
   - `FRONTEND_URL`: (Leave this blank for now).
6. Click **Deploy**. Copy the backend URL Vercel gives you (e.g., `https://my-backend.vercel.app`).

### Step 4: Frontend Deployment (Vercel)
1. Go back to your Vercel dashboard and click **Add New > Project**.
2. Import the exact same GitHub repository again.
3. Edit the **Root Directory** to `foodon`.
4. Vercel will automatically detect that you are using Vite.
5. Under **Environment Variables**, add:
   - `VITE_BACKEND_URL`: Paste the backend URL you copied in Step 3.
6. Click **Deploy**. Vercel will give you a live frontend URL (e.g., `https://my-restaurant.vercel.app`).

### Step 5: Finalize Connection
1. Go back to your Backend project in Vercel.
2. Go to Settings > Environment Variables.
3. Update the `FRONTEND_URL` to match your new frontend Vercel URL exactly (`https://my-restaurant.vercel.app`).
4. **Redeploy** the backend so the new CORS security policy takes effect.

**You're done! Your interactive restaurant booking system is live.**