const OptionCard = ({ SN, option }) => {
  return (
    <div
      className={`w-full px-2 py-1 rounded cursor-pointer transition hover:bg-gray-100 flex items-start`}
    >
      <span className="flex-none w-6 font-semibold">{SN}.</span>
      <span className="flex-1 wrap-break-word">{option}</span>
    </div>
  );
};

export default OptionCard;
