<img width="1919" height="872" alt="image" src="https://github.com/user-attachments/assets/d387ef2b-0f3a-4a86-8827-7bc0bbe60c78" />

# 🚀 Team Task Manager (Full-Stack)

## 📌 Project Overview

Team Task Manager is a full-stack web application designed to manage team tasks efficiently with role-based access control.

This system allows Admin users to create and assign tasks, while Members can view and update only their assigned tasks.

---

## ✨ Features

### 🔐 Authentication

* User Signup & Login
* JWT-based authentication
* Secure password hashing using bcrypt

### 🧑‍💼 Role-Based Access Control

* **Admin**

  * Create tasks
  * Assign tasks to users
  * View all tasks
* **Member**

  * View assigned tasks only
  * Update task status

---

### 📋 Task Management

* Create and assign tasks
* Track task progress
* Update status:

  * Pending
  * In Progress
  * Completed

---

### 📊 Dashboard

* Total tasks overview
* Completed tasks tracking
* Pending tasks tracking
* Personalized user dashboard

---

## ⚙️ Tech Stack

### Frontend:

* React.js
* Axios
* Custom CSS

### Backend:

* Node.js
* Express.js
* MongoDB (Mongoose)

### Authentication:

* JWT (JSON Web Token)
* bcryptjs

---

## 🌐 Live Application

Backend (Render):
👉 https://full-stack-task-management-system-8ebt.onrender.com

Frontend (Vercel):
👉 [(Add your Vercel link here)](https://task-management-h7yv.vercel.app/)

---

## 📦 GitHub Repositories

### 🔹 Frontend:

👉 https://github.com/adi-cse/Task-Management

### 🔹 Backend:

👉 https://github.com/adi-cse/Full-stack-Task-Management-System

---

## 🔧 Installation & Setup

### 1️⃣ Clone the repositories

```id="c1"
git clone https://github.com/adi-cse/Task-Management
git clone https://github.com/adi-cse/Full-stack-Task-Management-System
```

---

### 2️⃣ Install dependencies

```id="c2"
cd Full-stack-Task-Management-System
npm install

cd ../Task-Management
npm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env` file in backend:

```id="c3"
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### 4️⃣ Run the application

#### Backend:

```id="c4"
npm run dev
```

#### Frontend:

```id="c5"
npm run dev
```

---

## 🔐 API Endpoints

### Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`

### Tasks

* GET `/api/tasks` (Admin only)
* GET `/api/tasks/my` (Member)
* POST `/api/tasks` (Admin)
* PUT `/api/tasks/:id` (Member)

### Users

* GET `/api/users`

---

## 🚀 Deployment

* Backend deployed on **Render**
* Frontend deployed on **Vercel**


## 🎯 Conclusion

This project demonstrates:

* Full-stack development
* REST API design
* Authentication & Authorization
* Role-based access control
* Real-world task management workflow

---

## 👨‍💻 Author

**Aditya Singh**

