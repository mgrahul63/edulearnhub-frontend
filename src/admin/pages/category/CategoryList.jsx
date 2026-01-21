import { useQuery } from "@tanstack/react-query";
import { useApp } from "../../../hooks/useApp";
import { getCategoryAPI } from "../../../services/api/category";

const CategoryList = ({ setFormData, onClick }) => {
  const { userinfo } = useApp();

  const {
    data: categories,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["admin-category", userinfo],
    queryFn: getCategoryAPI,
    enabled: !!userinfo,
  });

  const handleEdit = (category) => {
    const { category_name, description } = category;
    setFormData({
      category_name,
      description,
      method: "edit",
      id: category?.id,
    });
    onClick();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Categories</h2>

      {categories?.length ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col justify-between p-5 border rounded-xl bg-white hover:shadow-lg transition duration-300"
            >
              {/* Text Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                  {category.category_name}
                </h3>
                {category.description && (
                  <p className="text-sm text-gray-500 line-clamp-3">
                    {category.description}
                  </p>
                )}
              </div>

              {/* Edit Button */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleEdit(category)}
                  className="px-4 py-2 text-sm font-medium rounded-md border border-indigo-500 text-indigo-600 hover:bg-indigo-50 transition"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">No categories found.</p>
      )}
    </div>
  );
};

export default CategoryList;
