import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import ActionButton from "../../components/ActionButton";
import ChapterList from "../../components/ChapterList";
import { useApp } from "../../hooks/useApp";
import { getChapterAPI } from "../../services/api/chapter";

const ChapterTableList = ({ bookId }) => {
  const { courseId } = useParams();
  const { userinfo } = useApp();

  const { data, isPending } = useQuery({
    queryKey: ["chapter", courseId, bookId], // REQUIRED
    queryFn: () => getChapterAPI(courseId, bookId),
    enabled: !!userinfo?.id && !!courseId && !!bookId,
  });

  const chapters = data?.success ? data.chapters : [];

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full text-center border-collapse text-xs sm:text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-2 sm:px-3 sm:py-3">SN</th>
            <th className=" px-2 py-2 sm:px-3 sm:py-3">Chapter</th>
            <th className=" px-2 py-2 sm:px-3 sm:py-3">Description</th>
            <th className=" px-2 py-2 sm:px-3 sm:py-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {isPending && (
            <tr className="hover:bg-gray-100 transition-colors text-center">
              <td
                colSpan={4}
                className="border border-gray-300 px-2 py-2 sm:px-4 sm:py-2 text-center space-x-1 sm:space-x-2"
              >
                Loading...
              </td>
            </tr>
          )}
          {chapters.length > 0 &&
            chapters.map((ch, index) => (
              <tr key={ch?.id} className="hover:bg-gray-100 transition-colors">
                <ChapterList index={index} ch={ch} />
                <td className="border border-gray-300 px-2 py-2 sm:px-4 sm:py-2 text-center space-x-1 sm:space-x-2">
                  <Link
                    to={`questions/${ch?.id}`}
                    state={{ bookId, chapterId: ch?.id }}
                  >
                    <ActionButton
                      className={"border-green-600 text-black"}
                      text={"Questions"}
                    />
                  </Link>
                  <Link to={`videos/${ch?.id}`}>
                    <ActionButton
                      className={"border-green-600 text-black"}
                      text={"Videos"}
                    />
                  </Link>
                </td>
              </tr>
            ))}

          {!isPending && chapters.length === 0 && (
            <tr className="hover:bg-gray-100 transition-colors text-center">
              <td
                colSpan={4}
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
