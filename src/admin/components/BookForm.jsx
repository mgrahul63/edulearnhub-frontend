import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ActionButton from "../../components/ActionButton";
import { addBookAPI, updateBookAPI } from "../../services/api/chapter";

const BookForm = ({ setOpenBookForm, selectBook }) => {
  const { courseId } = useParams();
  const queryClient = useQueryClient();
  const method = selectBook?.id ? "edit" : "new";

  const [formData, setFormData] = useState({
    bookName: selectBook?.bookName || "",
    bookImage: null, // always start null for file upload
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "bookImage") {
      setFormData((prev) => ({ ...prev, bookImage: files[0] || null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // --- Validation ---
    if (!formData.bookName.trim()) {
      alert("Book name is required");
      return;
    }

    if (method === "new" && !formData.bookImage) {
      alert("Book image is required for new books");
      return;
    }

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("bookName", formData.bookName);
      fd.append("courseId", courseId);
      if (formData.bookImage) {
        fd.append("bookImage", formData.bookImage);
      }

      if (method === "edit" && selectBook?.id) {
        fd.append("bookId", selectBook._id);
      }

      let res = null;
      if (method === "edit") {
        res = await updateBookAPI(fd);
      } else {
        res = await addBookAPI(fd);
      }
      if (res?.success) {
        toast.success(
          method === "edit"
            ? "Book updated successfully"
            : "Book added successfully",
        );
        setFormData({ bookName: "", bookImage: null });
        queryClient.invalidateQueries(["books", courseId]);
        setOpenBookForm(false);
      } else {
        toast.error(res?.message || "Failed to save book");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while saving book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md"
      encType="multipart/form-data"
    >
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Book Name</label>
        <input
          type="text"
          name="bookName"
          value={formData.bookName}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Book Image</label>
        <input
          type="file"
          name="bookImage"
          onChange={handleChange}
          className="border rounded px-3 py-2"
          accept="image/*"
          required={method === "new"}
        />
      </div>

      <div className="flex gap-3">
        <ActionButton
          text={loading ? "Saving..." : "Submit"}
          className="bg-green-500 text-white"
          type="submit"
          disabled={loading}
        />
        <ActionButton
          text="Cancel"
          className="bg-gray-300"
          OnClick={() => !loading && setOpenBookForm(false)}
          type="button"
        />
      </div>
    </form>
  );
};

export default BookForm;
