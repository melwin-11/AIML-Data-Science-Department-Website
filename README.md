# Departmental Website (MERN Stack)

A fully functional and scalable departmental website built with the **MERN stack** (MongoDB, Express.js, React, Node.js).  
The backend uses **MongoDB Atlas** for cloud database management, and the app is deployed on **Vercel** for seamless hosting.

---

## 🚀 Features
- Modern **Next.js frontend** (React framework)
- RESTful **Express backend**
- **MongoDB Atlas** integration
- **JWT authentication**
- Modular, clean architecture
- Fully scalable for production use

---

## 🛠️ Tech Stack
- **Frontend**: Next.js (React), TailwindCSS 
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JSON Web Token (JWT)
- **Hosting**: Vercel (frontend) + MongoDB Atlas (DB)

---


---

## ⚙️ Setup Instructions

### 1. Clone the Repository
    ->git clone https://github.com/your-username/departmental-website.git
    ->cd departmental-website

### 2. Backend Setup
    -> cd backend
    -> npm install

Create a .env file inside backend/ with the following:

    -> PORT=5000
    -> MONGO_URI=your_mongodb_atlas_connection_string
    -> JWT_SECRET=your_secret_key


node server.js


### 3. Frontend Setup
    -> cd ../frontend
    -> npm install


Run the frontend:

    ->npm run dev

### 4. Deployment
1.) Push your code to GitHub.
2.) Import your repository into Vercel
3.) Set up environment variables in Vercel:

    ->MONGO_URI

    ->JWT_SECRET

    ->PORT
