🌟 EduSphere – Online Learning & Resource Management 📌 Project Overview

EduSphere is a modern full-stack web application designed for online education 🎯. Students can explore courses, watch videos, read PDFs, take quizzes, and track progress — all through a clean, responsive interface. Instructors can create and manage courses, upload content, and interact with students in real time.

The platform integrates **React Hook Form** for efficient forms, **TanStack Query** for data handling, and **Stripe** (optional) for payments. It’s fully responsive and built with **React**, **Tailwind CSS**, and modern frontend tools for a seamless learning experience.

🚀 Core Features 👤 Student Features

🔍 Browse courses and modules

🎞 Watch embedded YouTube videos

📄 Read PDFs and course materials

📝 Take quizzes and track progress

⭐ Rate courses

💬 Participate in discussions and comments

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

🛠 Technology Stack 🎨 Frontend

- React.js
- React Router
- Tailwind CSS
- DaisyUI (optional)
- React Hook Form
- TanStack Query
- Framer Motion
- React Icons
- React PDF
- React YouTube
- Quill Editor
- UUID
- React Simple Star Rating
- React Toastify

⚙ Backend (Optional / Separate Repo)

- Node.js
- Express.js
- MongoDB
- Firebase Admin (JWT Verification)
- Stripe API (optional)

🗄 Database Design (Collections)

👥 users
- name, email, role (student | instructor | admin), createdAt

📚 courses
- courseName, description, category
- bannerImage, instructorEmail (FK → users)
- createdAt, updatedAt

📄 courseMaterials
- courseId, title, type (pdf | video | quiz)
- url / content
- createdAt, updatedAt

🤝 enrollments
- userEmail, courseId
- status (active | completed)
- enrolledAt, completedAt

💰 payments (optional)
- userEmail, amount
- courseId
- stripePaymentIntentId / transactionId
- status, createdAt

📝 quizzes
- courseId, title
- questions (array of question objects)
- createdAt

🗂 quizResults
- quizId, userEmail
- answers, score
- submittedAt

🧭 Pages & Routing 🌐 Public Pages

/ – Home

/courses – Courses Listing

/courses/:id – Course Details

/login – Login

/register – Register

Optional: /about, /pricing, /contact, 404

📊 Dashboard Pages (Role-Based)

Admin: Overview, Users, Courses, Payments

Instructor: Overview, My Courses, Course Materials, Students

Student: Overview, My Courses, Progress, Quiz Results

📚 Important NPM Packages

- react, react-dom, react-router-dom
- tailwindcss, @tailwindcss/cli, @tailwindcss/vite
- react-hook-form
- @tanstack/react-query
- react-icons, lucide-react
- react-pdf, react-youtube
- quill
- uuid
- react-simple-star-rating
- react-toastify
- rc-progress
- humanize-duration
- framer-motion

🌟 Key Highlights

🔑 Role-based dashboards

🔐 Secure Firebase JWT authentication

🎞 Video and PDF content management

📝 Quizzes with scoring

🔍 Dynamic search, filter & sorting

🎨 Modern and responsive UI

✨ Smooth animations and enhanced UX

How to Run the Project Locally (Step-by-Step):

1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/edu-frontend.git
