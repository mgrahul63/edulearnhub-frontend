import { useQuery } from "@tanstack/react-query";
import { useApp } from "../../hooks/useApp";
import { getAnswerAPI } from "../../services/api/questionApi";

const PreviousMCQ = ({ bookId, chapterId }) => {
  const { userinfo } = useApp();
  const { data, isPending, isError } = useQuery({
    queryKey: ["mcqQuestionsAndAnswer", bookId, chapterId, userinfo?.id],
    queryFn: () => getAnswerAPI(bookId, chapterId, userinfo?.id),
    enabled: !!bookId && !!chapterId && !!userinfo?.id, // fetch only if all params exist
  });

  if (isPending) return <div>Loading previous answers...</div>;
  if (isError) return <div>Error fetching answers.</div>;

  const mcqQuestionsAndAnswer = data?.data || [];

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatTime = (seconds = 0) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}m ${sec.toString().padStart(2, "0")}s`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {mcqQuestionsAndAnswer.map((mqa, indx) => (
        <div
          key={mqa.id}
          className="border border-gray-200 rounded-lg p-4 bg-white
             hover:shadow-md hover:border-blue-400
             transition-all duration-200 cursor-pointer"
        >
          <p className="text-sm text-gray-500 mb-1">{indx + 1}.</p>

          <p className="text-lg font-semibold text-gray-800">
            {mqa.book.bookName} Book
          </p>

          <p className="text-sm text-gray-600 mt-1">
            Chapter: {mqa.chapter.title}
          </p>

          <div className="mt-3 text-sm text-gray-500 space-y-1">
            <p>Submitted: {formatDate(mqa.submittedAt)}</p>
            <p>Time taken: {formatTime(mqa.timeTaken)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PreviousMCQ;
