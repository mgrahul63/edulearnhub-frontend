import { toast } from "react-toastify";
import { addCategoryAPI } from "../../../services/api/category";

const AddCategory = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { category_name, description, id } = formData;

    if (!category_name.trim()) {
      alert("Category name is required");
      return;
    }

    if (description?.trim() && description.length > 500) {
      alert("Description should be less than 500 characters");
      return;
    }

    try {
      const payload = { category_name, description };
      if (formData.method === "edit" && id) {
        payload.id = id;
      }

      const res = await addCategoryAPI(payload);

      if (res.data.success) {
        toast.success(
          res.data.message || formData.method === "edit"
            ? "Category updated successfully"
            : "Category added successfully",
        );

        // Reset form
        setFormData({
          category_name: "",
          description: "",
          method: "new",
          id: null,
        });
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add category");
    }
  };

  const handleCancel = () => {
    setFormData({
      category_name: "",
      description: "",
      method: "new",
      id: null,
    });
  };
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">
        {formData.method === "edit" ? "Edit Category" : "Add New Category"}
      </h2>

      <form className="max-w-md space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          id="category_name"
          name="category_name"
          value={formData.category_name}
          onChange={handleChange}
          placeholder="Category Name"
          className="w-full border px-4 py-2 rounded"
        />

        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Category Description"
          className="w-full border px-4 py-2 rounded"
          rows={3}
        />

        <div className="flex items-center gap-3 mt-4">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          >
            {formData.method === "edit" ? "Update Category" : "Add Category"}
          </button>

          {formData.method === "edit" && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
