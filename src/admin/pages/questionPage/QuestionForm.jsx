import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  createQuestionAPI,
  updateQuestionAPI,
} from "../../../services/api/questionApi";

const QuestionForm = ({ initialValue = {}, bookId, chapterId, onReset }) => {
  const queryClient = useQueryClient();
  const { id, question: initQ, options: initOptions } = initialValue;
  const isEdit = Boolean(id);

  // Prepare default options
  const defaultOptions = (initOptions || []).map((opt) => ({
    optionId: opt._id || null,
    option: opt.option || opt.text || "",
    isCorrect: opt.isCorrect || false,
  }));

  // react-hook-form
  const { control, register, handleSubmit, reset } = useForm({
    defaultValues: {
      question: initQ || "",
      options: defaultOptions.length
        ? defaultOptions
        : [{ option: "", isCorrect: false, optionId: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: isEdit ? updateQuestionAPI : createQuestionAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["questions", bookId, chapterId]);
      toast.success(
        data?.message ||
          (isEdit ? "Updated successfully!" : "Created successfully!"),
      );
      onReset();
    },
    onError: (error) => {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });

  const onSubmit = (data) => {
    const payload = {
      id,
      bookId,
      chapterId,
      question: data.question,
      options: data.options.map(({ optionId, option, isCorrect }) => ({
        optionId: optionId || undefined,
        option,
        isCorrect,
      })),
    };
    mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <textarea
        placeholder="Question"
        {...register("question", { required: true })}
        className="px-2 py-1 rounded bg-gray-50"
      />

      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-2">
          <input
            {...register(`options.${index}.option`, { required: true })}
            placeholder={`Option ${index + 1}`}
            className="flex-1 px-2 py-1 rounded bg-gray-50"
          />

          <Controller
            name={`options.${index}.isCorrect`}
            control={control}
            render={({ field: ctrlField }) => (
              <label className="flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  {...ctrlField}
                  checked={ctrlField.value}
                />
                Correct
              </label>
            )}
          />

          {fields.length > 1 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="p-1 hover:bg-red-100 rounded"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ option: "", isCorrect: false, optionId: null })}
        className="flex items-center gap-1 text-sm text-blue-600 w-fit cursor-pointer"
      >
        <Plus size={16} />
        Add option
      </button>

      <div className="flex justify-between">
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 mt-2 cursor-pointer"
        >
          {isEdit ? "Update Question" : "Add Question"}
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-blue-600 mt-2 cursor-pointer"
          onClick={() => {
            reset();
            onReset();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default QuestionForm;
