import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { chapterAPI } from "../../../services/api/chapter";
const ChapterCreateForm = ({ bookId }) => {
  const { courseId } = useParams();
  const queryClient = useQueryClient();
  const [createOpen, setCreateOpen] = useState(false);
  const [newChapter, setNewChapter] = useState({
    title: "",
    description: "",
    orderNo: "",
  });

  // ---------- CREATE ----------
  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewChapter({ ...newChapter, [name]: value });
  };

  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!bookId) return toast.error("Book ID not found");
    if (!newChapter.title.trim())
      return toast.error("Chapter title is required");
    if (!newChapter?.orderNo) return toast.error("Order number is required");

    const payload = {
      ...newChapter,
      orderNo: Number(newChapter.orderNo),
      courseId,
      bookId,
      method: "new",
    };

    try {
      if (loading) return;
      setLoading(true);

      const res = await chapterAPI(payload);

      if (!res?.success) {
        toast.error(res?.message || "Failed to add chapter");
        return;
      }

      toast.success(res.message || "Chapter added successfully");
      queryClient.invalidateQueries(["chapter", courseId]);
      setNewChapter({ title: "", description: "", orderNo: "" });
      setCreateOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Server error while creating chapter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={() => setCreateOpen(true)}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Add more chapter
      </button>

      {createOpen && (
        <div className="mt-4 p-4 border rounded-lg space-y-3">
          <h3 className="text-lg font-medium">New Chapter</h3>

          <input
            name="title"
            placeholder="Title"
            value={newChapter.title}
            onChange={handleCreateChange}
            className="w-full border px-3 py-2 rounded"
          />

          <input
            name="description"
            placeholder="Description"
            value={newChapter.description}
            onChange={handleCreateChange}
            className="w-full border px-3 py-2 rounded"
          />

          <input
            name="orderNo"
            placeholder="Order No"
            type="number"
            value={newChapter.orderNo}
            onChange={handleCreateChange}
            className="w-full border px-3 py-2 rounded"
          />

          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Create
            </button>
            <button
              onClick={() => setCreateOpen(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterCreateForm;
