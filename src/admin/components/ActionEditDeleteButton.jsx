import { Pencil, Trash2 } from "lucide-react";
const ActionEditDeleteButton = ({ onEdit, onDelete }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        className="p-1 rounded hover:bg-red-100 cursor-pointer"
        onClick={onEdit}
        title="Edit"
      >
        <Pencil size={18} />
      </button>

      <button
        className="p-1 rounded hover:bg-red-100 cursor-pointer"
        onClick={onDelete}
        title="Delete"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default ActionEditDeleteButton;
