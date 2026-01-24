const ChapterList = ({ index, ch, editData, handleEditChange, editId }) => {
  return (
    <>
      <td className="border border-gray-300 px-2 py-2 sm:px-4 sm:py-2 text-center space-x-1 sm:space-x-2">
        {index + 1}
      </td>

      {editId === ch.id ? (
        <>
          <td className="border border-gray-300 px-2 py-2 sm:px-4 sm:py-2 text-center space-x-1 sm:space-x-2">
            <input
              name="title"
              value={editData.title}
              onChange={handleEditChange}
              className="w-full border border-gray-400 px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </td>

          <td className="border border-gray-300 px-2 py-2 sm:px-4 sm:py-2 text-center space-x-1 sm:space-x-2">
            <input
              name="description"
              value={editData.description}
              onChange={handleEditChange}
              className="w-full border border-gray-400 px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </td>
          <td className="border border-gray-300 px-2 py-2 sm:px-4 sm:py-2 text-center space-x-1 sm:space-x-2">
            <input
              name="orderNo"
              value={editData.orderNo}
              onChange={handleEditChange}
              className="w-full border border-gray-400 px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </td>
        </>
      ) : (
        <>
          <td className="border border-gray-300 px-2 py-2 sm:px-4 sm:py-2 text-center space-x-1 sm:space-x-2">
            {ch.title}
          </td>
          <td className="border border-gray-300 px-2 py-2 sm:px-4 sm:py-2 text-center space-x-1 sm:space-x-2">
            {ch.description}
          </td>
        </>
      )}
    </>
  );
};

export default ChapterList;
