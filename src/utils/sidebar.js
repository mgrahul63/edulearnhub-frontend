import { assets } from "../assets/assets";

const SIDEBARMENUS = {
  admin: [
    { name: "Dashboard", path: "/admin/educator", icon: assets.home_icon },
    { name: "Manage Users", path: "admin/users", icon: assets.user_icon },
    {
      name: "Manage Categories",
      path: "admin/categories",
      icon: assets.category_icon,
    },
    { name: "Manage Courses", path: "admin/courses", icon: assets.cross_icon },
  ],
  educator: [
    { name: "Dashboard", path: "/educator", icon: assets.home_icon },
    { name: "My Courses", path: "my-courses", icon: assets.my_course_icon },
    {
      name: "Student Enrolled",
      path: "students-enrolled",
      icon: assets.person_tick_icon,
    },
  ],
};
export { SIDEBARMENUS };
