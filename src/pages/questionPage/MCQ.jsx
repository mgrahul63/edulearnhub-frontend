import { useState } from "react";
import MCQModal from "./MCQModal";
import PreviousMCQ from "./PreviousMCQ";

const MCQ = ({ bookId, chapterId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="space-y-4">
        <PreviousMCQ bookId={bookId} chapterId={chapterId} />

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          >
            Attend Exam
          </button>

          <span className="text-sm text-gray-500">
            Time-bound • No auto-save
          </span>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
          <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg relative my-10 max-h-[calc(100vh-5rem)] overflow-hidden">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black cursor-pointer z-10"
            >
              ✕
            </button>
            <MCQModal
              bookId={bookId}
              chapterId={chapterId}
              isModelClose={setIsModalOpen}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MCQ;
