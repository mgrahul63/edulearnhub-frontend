// components/ErrorBoundary.jsx

const ErrorBoundary = ({ error }) => {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Something went wrong!
      </h1>
      <p className="text-lg">{error?.message || "Unknown error occurred."}</p>
    </div>
  );
};

export default ErrorBoundary;
