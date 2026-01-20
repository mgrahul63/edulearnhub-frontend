import axios from "axios";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import CourseDocs from "./pages/CourseDocs";
import CourseQuiz from "./pages/CourseQuiz";
import CourseDetails from "./pages/student/CourseDetails";
import CoursesList from "./pages/student/CoursesList";
import Home from "./pages/student/Home";
import Loading from "./pages/student/Loading";
import MyEnrollments from "./pages/student/MyEnrollments";
import PaymentCancel from "./pages/student/PaymentCancel";
import PaymentSuccess from "./pages/student/PaymentSuccess";
import Player from "./pages/student/Player";

import AddCourses from "./pages/educator/AddCourses";
import Dashboard from "./pages/educator/Dashboard";
import Educator from "./pages/educator/Educator";
import MyCourses from "./pages/educator/MyCourses";
import StudentsEnrolled from "./pages/educator/StudentsEnrolled";

import AdminCategory from "./admin/pages/category/AdminCategory";
import AddCourseDetails from "./admin/pages/course/AddCourseDetails";
import AddminCourse from "./admin/pages/course/AddminCourse";
import AdminUser from "./admin/pages/users/AdminUser";
import ViewCourseDetails from "./components/educator/ViewCourseDetails";
import Login from "./pages/login/Login";
import Signup from "./pages/register/Signup";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Educator />}>
          {/* user start */}
          <Route path="educator" element={<Dashboard />} />
          <Route path="educator/:courseId" element={<ViewCourseDetails />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="/course-list" element={<CoursesList />} />
          <Route path="/course-list/:keyword" element={<CoursesList />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/my-enrollments" element={<MyEnrollments />} />
          <Route path="/player/:courseId" element={<Player />} />
          <Route path="/loading/:path" element={<Loading />} />
          <Route path="/course/:id/docs" element={<CourseDocs />} />
          <Route path="/course/:id/quiz" element={<CourseQuiz />} />

          {/* Payment Routes */}
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel" element={<PaymentCancel />} />
          {/* user end */}

          {/* admin start */}
          <Route path="admin/educator" element={<Dashboard />} />
          <Route
            path="admin/educator/:courseId"
            element={<ViewCourseDetails />}
          />
          <Route path="admin/courses" element={<AddminCourse />} />
          <Route
            path="admin/courses/:courseId"
            element={<AddCourseDetails />}
          />
          <Route path="admin/categories" element={<AdminCategory />} />
          <Route path="admin/users" element={<AdminUser />} />
          <Route path="add-courses" element={<AddCourses />} />
          {/* admin end */}
          <Route path="students-enrolled" element={<StudentsEnrolled />} />
          <Route
            path="*"
            element={
              <h1 className="text-center mt-20 text-3xl">404 Not Found</h1>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
