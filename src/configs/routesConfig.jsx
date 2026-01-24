import AdminCategory from "../admin/pages/category/AdminCategory";
import AddCourseDetails from "../admin/pages/course/AddCourseDetails";
import AddminCourse from "../admin/pages/course/AddminCourse";
import AdminCourseDahsboard from "../admin/pages/courseDashboard/AdminCourseDahsboard";
import Instructor from "../admin/pages/instructor/Instructor";
import AdminUser from "../admin/pages/users/AdminUser";
import AppLayout from "../components/AppLayout";
import ViewCourseDetails from "../components/educator/ViewCourseDetails";
import ErrorBoundary from "../components/ErrorBoundary";
import CourseDashboard from "../pages/courseDashboard/CourseDashboard";
import CourseDocs from "../pages/CourseDocs";
import CourseQuiz from "../pages/CourseQuiz";
import Dashboard from "../pages/educator/Dashboard";
import Educator from "../pages/educator/Educator";
import MyCourses from "../pages/educator/MyCourses";
import StudentsEnrolled from "../pages/educator/StudentsEnrolled";
import Login from "../pages/login/Login";
import Payments from "../pages/payments/Payments";
import Signup from "../pages/register/Signup";
import CourseDetails from "../pages/student/CourseDetails";
import CoursesList from "../pages/student/CoursesList";
import Home from "../pages/student/Home";
import Loading from "../pages/student/Loading";
import MyEnrollments from "../pages/student/MyEnrollments";
import PaymentCancel from "../pages/student/PaymentCancel";
import PaymentSuccess from "../pages/student/PaymentSuccess";
import Player from "../pages/student/Player";
import ProtectRoute from "../routes/ProtectRoute";

export const routerConfig = [
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "/", element: <Home />, errorElement: <ErrorBoundary /> },
      { path: "signup", element: <Signup />, errorElement: <ErrorBoundary /> },
      { path: "login", element: <Login />, errorElement: <ErrorBoundary /> },

      // Protected student/educator routes
      {
        path: "/", // must be "/" or some prefix
        element: <Educator />,
        children: [
          {
            element: <ProtectRoute />,
            children: [
              {
                path: "educator",
                element: <Dashboard />,
                errorElement: <ErrorBoundary />,
              },
              { path: "educator/:courseId", element: <ViewCourseDetails /> },
              {
                path: "educator/dashboard/:courseId",
                element: <CourseDashboard />,
              },
              { path: "my-courses", element: <MyCourses /> },
              { path: "course-list", element: <CoursesList /> },
              { path: "course-list/:keyword", element: <CoursesList /> },
              { path: "course/:id", element: <CourseDetails /> },
              {
                path: "payments/:courseId",
                element: <Payments />,
              },
              { path: "my-enrollments", element: <MyEnrollments /> },
              { path: "player/:courseId", element: <Player /> },
              { path: "loading/:path", element: <Loading /> },
              { path: "course/:id/docs", element: <CourseDocs /> },
              { path: "course/:id/quiz", element: <CourseQuiz /> },
              { path: "payment-success", element: <PaymentSuccess /> },
              { path: "payment-cancel", element: <PaymentCancel /> },

              // instructor routes
              { path: "instructor/educator", element: <Dashboard /> },
              {
                path: "instructor/:instructorId",
                element: <Instructor />,
              },
              {
                path: "instructor/educator/:courseId",
                element: <ViewCourseDetails />,
              },
              { path: "instructor/courses", element: <AddminCourse /> },
              {
                path: "instructor/courses/:courseId",
                element: <AddCourseDetails />,
              },
              {
                path: "instructor/courses/dashboard/:courseId",
                element: <AdminCourseDahsboard />,
              },

              // admin routes
              { path: "admin/categories", element: <AdminCategory /> },
              { path: "admin/users", element: <AdminUser /> },

              // Common
              { path: "students-enrolled", element: <StudentsEnrolled /> },

              // 404
              {
                path: "*",
                element: (
                  <h1 className="text-center mt-20 text-3xl">404 Not Found</h1>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
];
