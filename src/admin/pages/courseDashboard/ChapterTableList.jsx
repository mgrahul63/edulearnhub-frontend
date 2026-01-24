import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ActionButton from "../../../components/ActionButton";
import ChapterList from "../../../components/ChapterList";
import { useApp } from "../../../hooks/useApp";
import {
  chapterAPI,
  deleteChapter,
  getChapterAPI,
} from "../../../services/api/chapter";

const ChapterTableList = ({ bookId }) => {
  const { courseId } = useParams();
  const { userinfo } = useApp();

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [loadingId, setLoadingId] = useState(null); // track which row is loading
  const [loadingAction, setLoadingAction] = useState(""); // "save" or "delete"

  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["chapter", courseId, bookId],
    queryFn: () => getChapterAPI(courseId, bookId),
    enabled: !!userinfo?.id || !!bookId,
  });
  const chapters = data?.success ? data.chapters : [];

  // ---------- EDIT ----------
  const handleEdit = (chapter) => {
    setEditId(chapter.id);
    setEditData(chapter);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSave = async () => {
    setLoadingId(editData.id);
    setLoadingAction("save");

    const payload = {
      ...editData,
      chapterId: editData.id,
      orderNo: Number(editData.orderNo || 0),
      method: "edit",
    };

    try {
      const res = await chapterAPI(payload);
      if (!res?.success) {
        toast.error(res?.message || "Failed to update chapter");
        return;
      }
      toast.success(res.message);
      setEditId(null);
      setEditData({});
      queryClient.invalidateQueries(["chapter", courseId]);
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoadingId(null);
      setLoadingAction("");
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditData({});
  };

  // ---------- DELETE ----------
  const handleDelete = async (id) => {
    setLoadingId(id);
    setLoadingAction("delete");
    try {
      const res = await deleteChapter(id);
      if (!res?.success) {
        toast.error(res?.message || "Failed to delete chapter");
        return;
      }
      toast.success(res.message);
      queryClient.invalidateQueries(["chapter", courseId]);
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoadingId(null);
      setLoadingAction("");
    }
  };

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full text-center border-collapse sm:text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">SN</th>
            <th className="p-3">Chapter</th>
            <th className="p-3">Description</th>
            <th className="p-3">Order</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {isPending && (
            <tr className="hover:bg-gray-100 transition-colors text-center">
              <td
                colSpan={5}
                className="border border-gray-300 px-2 py-2 sm:px-4 sm:py-2 text-center space-x-1 sm:space-x-2"
              >
                Loading...
              </td>
            </tr>
          )}
          {chapters.length > 0 &&
            chapters.map((ch, index) => (
              <tr
                key={ch.id}
                className="hover:bg-gray-100 transition-colors text-left"
              >
                <ChapterList
                  index={index}
                  ch={ch}
                  editData={editData}
                  handleEditChange={handleEditChange}
                  editId={editId}
                />

                {editId === ch.id ? (
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    <ActionButton
                      className={`border-green-600 text-black ${
                        loadingId === ch.id &&
                        loadingAction === "save" &&
                        "bg-green-400 cursor-not-allowed"
                      }`}
                      OnClick={handleSave}
                      text={
                        loadingId === ch.id && loadingAction === "save"
                          ? "Saving..."
                          : "Save"
                      }
                      disabled={loadingId === ch.id && loadingAction === "save"}
                    />
                    <ActionButton
                      className={`border-gray-500 text-gray-900 ${
                        loadingId === ch.id &&
                        loadingAction === "save" &&
                        "bg-gray-300 cursor-not-allowed"
                      }`}
                      OnClick={handleCancel}
                      text="Cancel"
                      disabled={loadingId === ch.id && loadingAction === "save"}
                    />
                  </td>
                ) : (
                  <>
                    <td className="border border-gray-300 text-center px-4 py-2 space-x-2">
                      {ch?.orderNo}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 space-x-2">
                      <ActionButton
                        className={"bg-blue-600 text-white"}
                        OnClick={() => handleEdit(ch)}
                        text={"Manage Questions"}
                      />
                      <ActionButton
                        className={"bg-blue-600 text-white"}
                        OnClick={() => handleEdit(ch)}
                        text={"Edit"}
                      />
                      <ActionButton
                        className={`bg-red-600 text-white ${
                          loadingId === ch.id &&
                          loadingAction === "delete" &&
                          "bg-red-400 cursor-not-allowed"
                        }`}
                        OnClick={() => handleDelete(ch.id)}
                        text={
                          loadingId === ch.id && loadingAction === "delete"
                            ? "Deleting..."
                            : "Delete"
                        }
                        disabled={
                          loadingId === ch.id && loadingAction === "delete"
                        }
                      />
                    </td>
                  </>
                )}
              </tr>
            ))}
          {!isPending && chapters.length === 0 && (
            <tr className="hover:bg-gray-100 transition-colors text-center">
              <td
                colSpan={5}
                className="border border-gray-300 px-2 py-2 sm:px-4 sm:py-2 text-center space-x-1 sm:space-x-2"
              >
                No Chapter found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ChapterTableList;
