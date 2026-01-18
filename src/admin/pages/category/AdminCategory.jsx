import { useState } from "react";
import AddCategory from "./AddCategory";
import CategoryList from "./CategoryList";

const TABS = [
  { key: "list", label: "Category List" },
  { key: "add", label: "Add Category" },
];

const AdminCategory = () => {
  const [activeTab, setActiveTab] = useState("list");

  const [formData, setFormData] = useState({
    category_name: "",
    description: "",
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
        <CategoryList
          setFormData={setFormData}
          onClick={() => setActiveTab("add")}
        />
      ) : (
        <AddCategory formData={formData} setFormData={setFormData} />
      )}
    </div>
  );
};

export default AdminCategory;
