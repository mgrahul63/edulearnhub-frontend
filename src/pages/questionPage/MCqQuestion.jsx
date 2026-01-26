const MCqQuestion = ({ q, indx, onClick, yourAnswer, submitted }) => {
  // selected option for this question
  const selected = yourAnswer.find(
    (a) => a.questionID === q.id,
  )?.selectedOption;

  return (
    <div className="w-full space-y-2 bg-gray-50 border border-gray-100 p-4 rounded">
      <div className="flex items-start">
        <span className="flex-none w-6 font-semibold">{indx}.</span>
        <span className="flex-1 wrap-break-word text-[17px]">
          {q?.question}
        </span>
      </div>

      <div className="flex flex-col gap-3 mt-2 ms-2">
        {q?.options?.map((opt, ind) => {
          let bgColor = "";

          // before submit → show selected
          if (!submitted && selected === opt._id) {
            bgColor = "bg-blue-100";
          }

          return (
            <div
              key={opt._id}
              onClick={() => onClick(q.id, opt._id)}
              className={`px-2 py-1 rounded cursor-pointer transition 
                ${bgColor} hover:bg-gray-100 flex items-start`}
            >
              <span className="flex-none w-6 font-semibold">{ind + 1}.</span>
              <span className="flex-1 wrap-break-word">{opt.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MCqQuestion;

//  const selected = yourAnswer.find(
//                 (a) => a.questionID === q.id,
//               )?.selectedOption;

//               let bgColor = "";
//               if (submitted) {
//                 if (isCorrect(q.id, opt.id)) bgColor = "bg-green-200";
//                 else if (selected === opt.id) bgColor = "bg-red-200";
//               } else if (selected === opt.id) {
//                 bgColor = "bg-blue-100";
//               }
