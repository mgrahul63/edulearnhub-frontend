import { useState } from "react";
import { useLocation } from "react-router-dom";
import MCQ from "./MCQ";

const QuestionPage = () => {
  const { state } = useLocation();
  const { bookId, chapterId } = state || {};

  const [type, setType] = useState("mcq"); // "mcq" | "question"

  return (
    <div className="p-6 mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Chapter Assessment</h1>

      {/* Tabs */}
      <div className="flex gap-4 border-b pb-2">
        <button
          onClick={() => setType("mcq")}
          className={`pb-1 cursor-pointer ${
            type === "mcq"
              ? "font-semibold border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          MCQ
        </button>

        <button
          onClick={() => setType("question")}
          className={`pb-1 cursor-pointer ${
            type === "question"
              ? "font-semibold border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Questions
        </button>
      </div>

      {/* Content */}
      {type === "mcq" ? (
        <MCQ bookId={bookId} chapterId={chapterId} />
      ) : (
        <div className="text-gray-600">
          Descriptive questions will be available here.
        </div>
      )}
    </div>
  );
};

export default QuestionPage;
