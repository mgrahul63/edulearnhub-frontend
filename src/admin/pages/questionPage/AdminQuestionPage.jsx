import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getQuestionsAPI } from "../../../services/api/questionApi";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

const AdminQuestionPage = () => {
  const { state } = useLocation();
  const { bookId, chapterId } = state || {};
  const [selectQuestion, setSelectQuestion] = useState({});

  const { data } = useQuery({
    queryKey: ["questions", bookId, chapterId],
    queryFn: () => getQuestionsAPI(bookId, chapterId),
    enabled: !!bookId && !!chapterId,
  });

  const questions = data?.success ? data.data : [];

  return (
    <div className="p-6 mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-6">Admin Questions Page</h1>

      <div className="flex w-full gap-6">
        {/* Left: Question List */}
        <div className="flex-1 space-y-3 w-8/12 border border-gray-100 p-2 rounded">
          {!data ? (
            <p>Loading questions...</p>
          ) : questions.length === 0 ? (
            <p>No questions added yet. Please add one!</p>
          ) : (
            questions.map((q, indx) => (
              <QuestionList
                key={q.id}
                q={q}
                indx={indx}
                onEdit={() => setSelectQuestion(q)}
                onDelete={() => console.log(q)}
              />
            ))
          )}
        </div>

        {/* Right: Add/Edit Question Form */}
        <div className="space-y-4 w-4/12">
          <h2 className="text-xl font-semibold">Add New Question</h2>
          <QuestionForm
            key={selectQuestion?.id || "new"}
            initialValue={selectQuestion}
            onReset={() => setSelectQuestion({})}
            bookId={bookId}
            chapterId={chapterId}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminQuestionPage;
