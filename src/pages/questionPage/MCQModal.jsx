import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import ExamTimer from "../../components/ExamTimer";
import { useApp } from "../../hooks/useApp";
import { answerAPI, getQuestionsAPI } from "../../services/api/questionApi";
import MCqQuestion from "./MCqQuestion";
const MCQModal = ({ bookId, chapterId, isModelClose }) => {
  const { userinfo } = useApp();
  const { data, isPending } = useQuery({
    queryKey: ["questions", bookId, chapterId],
    queryFn: () => getQuestionsAPI(bookId, chapterId),
    enabled: !!bookId && !!chapterId,
  });

  const questions = data?.success ? data.data : [];

  const [yourAnswer, setYourAnswer] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const startTimeRef = useRef(null);

  // Store start time once when questions are loaded
  if (!startTimeRef.current && !isPending && questions.length > 0) {
    startTimeRef.current = new Date().getTime();
  }

  // 1 minute per question
  const totalDuration = questions.length * 60;

  const handleSelect = (questionID, optionID) => {
    if (submitted) return;

    const existing = yourAnswer.find((a) => a.questionID === questionID);

    if (existing) {
      setYourAnswer(
        yourAnswer.map((a) =>
          a.questionID === questionID ? { ...a, selectedOption: optionID } : a,
        ),
      );
    } else {
      setYourAnswer([...yourAnswer, { questionID, selectedOption: optionID }]);
    }
  };

  const handleSubmit = async () => {
    if (submitted) return;

    const endTime = new Date().getTime();
    const timeDiffMs = endTime - startTimeRef.current; // milliseconds
    const timeTaken = Math.floor(timeDiffMs / 1000); // seconds

    const payload = {
      bookId,
      chapterId,
      yourAnswer,
      studentId: userinfo?.id,
      timeTaken,
    };

    try {
      const res = await answerAPI(payload);

      if (res?.success) {
        toast.success(res.message || "Answer submitted successfully!");
        setSubmitted(true);
        isModelClose(false); // close modal
      } else {
        toast.error(res.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network or server error.");
    }
  };

  if (isPending) {
    return <div className="p-6">Loading questions...</div>;
  }

  return (
    <>
      {/* Header */}
      <div className="p-6 border-b flex items-center justify-between">
        <h2 className="text-xl font-semibold">Multiple Choice Examination</h2>

        <ExamTimer
          duration={totalDuration}
          submitted={submitted}
          onTimeUp={handleSubmit}
        />
      </div>

      {/* Scrollable body */}
      <div className="p-6 overflow-y-auto max-h-[calc(100vh-9rem)]">
        <div className="space-y-4 max-w-3xl border border-gray-100 p-4 rounded">
          {questions.map((q, indx) => (
            <MCqQuestion
              key={q.id}
              q={q}
              indx={indx + 1}
              onClick={handleSelect}
              submitted={submitted}
              yourAnswer={yourAnswer}
            />
          ))}

          <button
            onClick={handleSubmit}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit Exam
          </button>
        </div>
      </div>
    </>
  );
};

export default MCQModal;
