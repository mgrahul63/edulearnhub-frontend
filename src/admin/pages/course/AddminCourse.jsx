import { useState } from "react";
import AddCourse from "./AddCourse";
import CourseList from "./CourseList";

const TABS = [
  { key: "list", label: "Courses List" },
  { key: "add", label: "Add Course" },
];

const AddminCourse = () => {
  const [activeTab, setActiveTab] = useState("list");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    instructorId: "",
    price: 0,
    image: null, // 🔥 file object যাবে এখানে
    status: "draft",
    method: "new",
    id: null,
  });

  return (
    <div className="p-6">
      <div className="flex gap-4 border-b pb-3 mb-6">
        {TABS?.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 font-medium ${
              activeTab === key
                ? "border-b-2 border-indigo-500 text-indigo-600"
                : "text-gray-500"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === "list" ? (
        <CourseList
          setFormData={setFormData}
          onEdit={() => setActiveTab("add")}
        />
      ) : (
        <AddCourse formData={formData} setFormData={setFormData} />
      )}
    </div>
  );
};

export default AddminCourse;
