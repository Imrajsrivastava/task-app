# 📝 Task Management App

A full-stack **Task Management Application** built with **React (Vite)** for the frontend and **Node.js + Express + MongoDB** for the backend.  
Users can **register, log in, and manage tasks** (CRUD operations). Tasks are private to each user.  

---


## 📌 Have All Features

- 🔐 **Authentication** (Register/Login with JWT + bcrypt for password hashing)  
- ✅ **Task Management (CRUD)**  
  - Create, Read, Update, Delete tasks  
  - Each task has `title`, `description`, `status`, and `createdAt`  
  - Only task creators can update/delete their tasks  
- 🔍 **Search & Filters**  
  - Search tasks by title or description  
  - Filter by status (`All`, `Pending`, `Done`)  
- 📄 **Pagination** for task listing  
- 🎨 **Frontend (React + TailwindCSS)**  
  - Pages: Register, Login, Dashboard (Task List), Task Form (Create/Edit)  
  - Clean and minimal UI  
- ⚡ **React Query** for data fetching, caching & mutations  


##  Tech Stack

**Frontend (Vite + React)**  
- React 18  
- React Router DOM  
- React Query  
- TailwindCSS  
- Axios  

**Backend (Node.js + Express)**  
- Express.js  
- MongoDB + Mongoose  
- bcryptjs  
- jsonwebtoken (JWT)  
- cors + cookie-parser  

---

## ⚙️ Prerequisites

Make sure you have installed:  
- **Node.js** (>= 18.x)  
- **npm** (>= 9.x)  
- **MongoDB** (local or MongoDB Atlas cloud)  


## ⚙️ Installation & Setup

cd backend
npm install
npm run dev

Backend runs on: http://localhost:5000


cd frontend
npm install

npm run dev
http://localhost:5173

### 1️⃣ Clone the repository
```bash

git clone https://github.com/Imrajsrivastava/task-app.git 
cd task-app

/ Deployed Links**

- **Frontend (Vercel)**:  https://task-frontend-k46pcnzwn-imrajsrivastavas-projects.vercel.app/login 
 and -- seprate repo for deployement :### https://github.com/Imrajsrivastava/task-frontend


- **Backend (Render)**: https://task-backend-y77t.onrender.com/ 
-- seprate repo for deployement :### https://github.com/Imrajsrivastava/task-backend


-----here----

Final deployed link for Task Management App :::::=> https://task-frontend-k46pcnzwn-imrajsrivastavas-projects.vercel.app/login 

-- combine repo for development ::#####. https://github.com/Imrajsrivastava/task-app

