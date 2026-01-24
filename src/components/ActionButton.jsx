const ActionButton = ({ OnClick, text, className, disabled }) => {
  return (
    <button
      onClick={OnClick}
      className={`text-xs sm:text-sm px-2 sm:px-3 py-1 border rounded ${className} hover:bg-gray-500 cursor-pointer ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default ActionButton;
