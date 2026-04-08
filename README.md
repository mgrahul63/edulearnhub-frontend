🌟 EduLearnHub – Online Learning & Resource Management  
📌 Project Overview

EduLearnHub is a modern full-stack web application designed for online education 🎯. Users can create accounts as **Students** or **Instructors**, explore courses, watch videos, read PDFs, take quizzes, and track progress. Instructors can create courses, upload materials, manage quizzes, and interact with students.  

The platform integrates **Firebase Authentication** (Email/Password + Google Sign-In), **JWT-based protected routes**, and uses **React Hook Form** & **TanStack Query** for efficient frontend data handling.  

---

🚀 Core Features  
👤 Student Features

🔍 Browse courses and learning materials  
🎞 Watch embedded YouTube videos  
📄 Read PDFs and course resources  
📝 Take quizzes and track progress  
⭐ Rate courses  
💬 Comment and discuss course content  

🧑‍🏫 Instructor Features

🏷 Create and manage courses  
📂 Upload PDFs, videos, and quizzes  
👥 View enrolled students  
📊 Track student progress  

✨ Additional Features

🔐 Firebase Authentication (Email/Password + Google Sign-In)  
🪪 JWT-based protected routes  
🔎 Search, filter, and sort courses  
📱 Fully responsive design (mobile, tablet, desktop)  
🎞 Smooth animations using Framer Motion  
⚡ Efficient data fetching with TanStack Query  

---

🛠 Technology Stack  
🎨 Frontend

React.js  
React Router  
Tailwind CSS  
React Hook Form  
TanStack Query  
Framer Motion  
React Icons  
React PDF  
React YouTube  
Quill Editor  
UUID  
React Simple Star Rating  
React Toastify  
RC Progress Bar  
Humanize Duration  

⚙ Backend

Node.js  
Express.js  
MongoDB  
Firebase Admin (JWT Verification)  
Stripe API (optional)  

---

🗄 Database Design (Collections)  
👥 users

name, email, role (student | instructor | admin)  
createdAt  

🏛 courses

courseName, description, category, bannerImage, instructorEmail (FK → users)  
createdAt, updatedAt  

📂 courseMaterials

courseId, title, type (pdf | video | quiz), url / content, createdAt, updatedAt  

🤝 enrollments

userEmail, courseId, status (active | completed), enrolledAt, completedAt  

📝 quizzes

courseId, title, questions (array), createdAt  

📊 quizResults

quizId, userEmail, answers, score, submittedAt  

💰 payments (optional)

userEmail, amount, courseId, stripePaymentIntentId / transactionId, status, createdAt  

---

🧭 Pages & Routing  
🌐 Public Pages

/ – Home  
/courses – Courses Listing  
/courses/:id – Course Details  
/login – Login  
/register – Register (Student or Instructor)  

Optional: /about, /pricing, /contact, 404  

📊 Dashboard Pages (Role-Based)

Admin: Overview, Users, Courses, Payments  
Instructor: Overview, My Courses, Materials, Students  
Student: Overview, My Courses, Progress, Quiz Results  

---

📚 Important NPM Packages

react, react-dom, react-router-dom, tailwindcss, @tailwindcss/cli, @tailwindcss/vite, react-hook-form, @tanstack/react-query, react-icons, lucide-react, react-pdf, react-youtube, quill, uuid, react-simple-star-rating, react-toastify, rc-progress, humanize-duration, framer-motion  

---

🌟 Key Highlights

🔑 Role-based dashboards  
🔐 Secure Firebase JWT authentication  
🎞 Video and PDF content management  
📝 Quizzes with scoring  
🔍 Dynamic search, filter & sorting  
🎨 Modern and responsive UI  
✨ Smooth animations and enhanced UX  

---

## How to Run the Project Locally (Step-by-Step)

1️⃣ Clone the Repositories  

```bash
git clone https://github.com/mgrahul63/edulearnhub-frontend.git
git clone https://github.com/mgrahul63/edulearnhub-backend.git

2️⃣ Install Dependencies
# Frontend
cd edulearnhub-frontend
npm install

# Backend
cd ../edulearnhub-backend
npm install


3️⃣ Environment Variables
#Frontend
VITE_API_URL=your_server_url
VITE_FIREBASE_API_KEY=your_key
VITE_STRIPE_PUBLISHABLE_KEY=your_key (optional)

#Backend
PORT=5000
MONGO_URI=your_mongodb_uri
STRIPE_SECRET_KEY=your_stripe_secret
FB_SERVICE_KEY=your_firebase_service_key



🧪 Demo User Accounts
Student
Email: mgrahul3@gmail.com
Password: 123456

Instructor
Email: mgrahul00@gmail.com
Password: 123456


🔗 Live Project & Source Code

🌐 Live Site: [https://edulearnhub.vercel.app/](https://edulearnhub.vercel.app/)

💻 Client Repo: [https://github.com/mgrahul63/edulearnhub-frontend](https://github.com/mgrahul63/edulearnhub-frontend)

🖥 Server Repo: [https://github.com/mgrahul63/edulearnhub-backend](https://github.com/mgrahul63/edulearnhub-backend)

👨‍💻 Developed by

MG Rahul

© All Rights Reserved

About
EduLearnHub is a full-stack web application for online education with role-based dashboards, interactive course content, quizzes, and optional Stripe payments. Users can register as Students or Instructors to interact with the platform.
