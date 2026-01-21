const NotFoundData = ({message}) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center mt-16">
      <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center max-w-sm">
        <svg
          className="w-16 h-16 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17v-4h6v4m2 0H7a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v8a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {message || "No courses found."}
        </h3>
        <p className="text-gray-500 text-sm">
          Try changing the category, or check back later for new courses.
        </p>
      </div>
    </div>
  );
};

export default NotFoundData;
