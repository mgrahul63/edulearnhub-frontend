import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { useApp } from "../../../hooks/useApp";
import { getCategoryAPI } from "../../../services/api/category";
import { addCourseAPI } from "../../../services/api/course";

const AddCourse = ({ formData, setFormData, onSuccess }) => {
  const { userinfo } = useApp();
  const [loading, setLoading] = useState(null);

  const { data: categories } = useQuery({
    queryKey: ["category", userinfo],
    queryFn: getCategoryAPI,
    enabled: !!userinfo,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // 🔒 extra safety

    const {
      title,
      description,
      categoryId,
      instructorId,
      price,
      status,
      image,
      method,
      id,
    } = formData;

    if (!title.trim() || !description.trim() || !categoryId) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true); // ✅ START LOADING IMMEDIATELY

      const fd = new FormData();
      fd.append("title", title);
      fd.append("description", description);
      fd.append("categoryId", categoryId);
      fd.append("instructorId", userinfo.id || "");
      fd.append("price", price);
      fd.append("status", status);

      if (image) {
        fd.append("image", image);
      }

      if (method === "edit" && id) {
        fd.append("id", id);
      }

      const res = await addCourseAPI(fd);

      if (res.data.success) {
        toast.success(
          res.data.message || method === "edit"
            ? "Course updated successfully"
            : "Course added successfully",
        );

        setFormData({
          title: "",
          description: "",
          categoryId: "",
          instructorId: "",
          price: 0,
          image: null,
          status: "draft",
          method: "new",
          id: null,
        });

        onSuccess?.();
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving the course"); // ❌ ERROR HANDLING
    } finally {
      setLoading(false); // ✅ ALWAYS STOP LOADING
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      categoryId: "",
      instructorId: "",
      price: 0,
      image: null,
      status: "draft",
      method: "new",
      id: null,
    });
  };

  return (
    <div className="max-w-3xl p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">
        {formData.method === "edit" ? "Edit Course" : "Add New Course"}
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            rows={4}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category *</label>
          <select
            name="categoryId"
            value={formData.categoryId || ""}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="">Select Category</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price || 0}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status || "draft"}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        {/* 🔥 IMAGE UPLOAD */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Thumbnail Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div className="flex items-center gap-3 mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`bg-indigo-600 text-white px-6 py-2 rounded transition ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:bg-indigo-700"
            }`}
          >
            {loading
              ? "Uploading... Please wait"
              : formData.method === "edit"
                ? "Update Course"
                : "Add Course"}
          </button>

          {formData.method === "edit" && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
