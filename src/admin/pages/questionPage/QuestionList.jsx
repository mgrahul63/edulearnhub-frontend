import ActionEditDeleteButton from "../../components/ActionEditDeleteButton";
import OptionCard from "../../components/OptionCard";

const QuestionList = ({ q, indx, onEdit, onDelete }) => {
  return (
    <div
      key={q.id}
      className="w-full space-y-2 bg-gray-50 border border-gray-100 p-4 rounded"
    >
      <div className="flex justify-between">
        <div className="flex items-start">
          <span className="flex-none w-6 font-semibold">{indx + 1}.</span>
          <span className="flex-1 wrap-break-word text-[17px]">
            {q.question}
          </span>
        </div>
        <ActionEditDeleteButton onEdit={onEdit} onDelete={onDelete} />
      </div>

      <div className="flex flex-col gap-3 mt-2 ms-2">
        {q.options.map((opt, ind) => (
          <div
            key={opt?._id}
            className="flex items-center justify-between w-full"
          >
            <OptionCard SN={ind + 1} option={opt?.text} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionList;
