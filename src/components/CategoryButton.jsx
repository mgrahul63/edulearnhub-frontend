const CategoryButton = ({ category_name, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 text-sm sm:text-base rounded-full whitespace-nowrap cursor-pointer bg-gray-200 text-gray-700 hover:bg-gray-300"
    >
      {category_name}
    </button>
  );
};

export default CategoryButton;
