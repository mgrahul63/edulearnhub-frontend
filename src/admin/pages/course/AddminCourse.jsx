import { useState } from "react";
import { useApp } from "../../../hooks/useApp";
import AddCourse from "./AddCourse";
import CourseList from "./CourseList";

const TABS = [
  { key: "list", label: "Courses List" },
  { key: "add", label: "Add Course" },
];

const AddminCourse = () => {
  const { userinfo } = useApp();
  const [activeTab, setActiveTab] = useState("list");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    instructorId: userinfo?.id || "",
    price: 0,
    image: null,
    status: "draft",
    method: "new",
    id: null,
  });
  return (
    <div className="p-6">
      <div className="flex gap-4 border-b pb-3 mb-2">
        {TABS?.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 font-medium cursor-pointer ${
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
