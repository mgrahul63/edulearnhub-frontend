// Dashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useApp } from "../../hooks/useApp";
import { getCoursesAPI } from "../../services/api/course";

const categoriesData = [
  "Web Development",
  "Data Science",
  "Design",
  "Business",
  "Language",
];

const Dashboard = () => {
  const { userinfo } = useApp();
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  useEffect(() => {
    const fetchCoureses = async () => {
      const res = await getCoursesAPI();
      setCourses(res.data.courses);
    };
    fetchCoureses();
  }, [userinfo]);

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Categories */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Categories</h2>
        <div className="flex space-x-3 overflow-x-auto">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-2 rounded-full flex-shrink-0 ${
              selectedCategory === "All"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All
          </button>
          {categoriesData.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full flex-shrink-0 ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCourses?.length > 0 ? (
            filteredCourses.map((course) => (
              <Link
                to={course?.id}
                key={course?.id}
                state={{course}}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
              >
                <img
                  src={course?.thumbnail || assets.course_2_thumbnail}
                  alt={course.title}
                  className="rounded w-full h-40 object-cover mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {course.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-bold text-blue-600">
                    ${course.price}
                  </span>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm transition">
                    Enroll
                  </button>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center mt-10 font-medium text-lg">
              Course not available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
