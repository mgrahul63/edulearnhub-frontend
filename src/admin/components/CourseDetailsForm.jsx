import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";

const CourseDetailsForm = ({ initialData, onSubmit, setCourseInfo }) => {
  const [loading, setLoading] = useState(false);

  const { control, register, handleSubmit, watch, reset, setValue } = useForm({
    defaultValues: initialData,
  });

  // reset form when initial data changes
  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  // sync all form data to parent (SAFE)
  const watchAll = useWatch({ control });
  useEffect(() => {
    if (setCourseInfo) setCourseInfo(watchAll);
  }, [watchAll, setCourseInfo]);

  const watchFullDescription = watch("fullDescription");

  // Full Description Field Array (WITH MOVE)
  const {
    fields: descFields,
    append: appendDesc,
    remove: removeDesc,
    move: moveDesc,
  } = useFieldArray({
    control,
    name: "fullDescription",
  });

  const {
    fields: reqFields,
    append: appendReq,
    remove: removeReq,
  } = useFieldArray({ control, name: "requirements" });

  const {
    fields: learnFields,
    append: appendLearn,
    remove: removeLearn,
  } = useFieldArray({ control, name: "whatYouWillLearn" });

  const {
    fields: targetFields,
    append: appendTarget,
    remove: removeTarget,
  } = useFieldArray({ control, name: "targetAudience" });

  const submitHandler = async (data) => {
    const allValid =
      data.fullDescription?.length > 0 &&
      data.requirements?.some((r) => r.trim()) &&
      data.whatYouWillLearn?.some((r) => r.trim()) &&
      data.targetAudience?.some((r) => r.trim()) &&
      data.language?.trim();

    if (!allValid) {
      alert("Please fill at least one value for every attribute");
      return;
    }

    setLoading(true);
    await onSubmit(data);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      {/* ================= FULL DESCRIPTION ================= */}
      <div>
        <h3 className="font-medium mb-2">Full Description</h3>

        {descFields.map((field, index) => (
          <div key={field.id} className="mb-4 p-3 border rounded">
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <span>Block {index + 1}</span>

              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => moveDesc(index, index - 1)}
                  className={`text-sm ${
                    index === 0
                      ? "opacity-40 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  ↑
                </button>

                <button
                  type="button"
                  disabled={index === descFields.length - 1}
                  onClick={() => moveDesc(index, index + 1)}
                  className={`text-sm ${
                    index === descFields.length - 1
                      ? "opacity-40 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  ↓
                </button>

                <button
                  type="button"
                  onClick={() => removeDesc(index)}
                  className="text-red-500 text-sm cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex gap-2">
              <Controller
                control={control}
                name={`fullDescription.${index}.type`}
                render={({ field }) => (
                  <select {...field} className="border p-1 rounded w-4/12">
                    <option value="paragraph">Paragraph</option>
                    <option value="list">List</option>
                    <option value="link">Link</option>
                  </select>
                )}
              />

              {/* Paragraph */}
              {watchFullDescription?.[index]?.type === "paragraph" && (
                <div className="flex flex-col">
                  <input
                    {...register(`fullDescription.${index}.heading`)}
                    className="w-full border p-2 rounded"
                    placeholder="Paragraph Heading (optional)"
                  />
                  <textarea
                    {...register(`fullDescription.${index}.text`)}
                    className="w-full border p-2 rounded"
                    placeholder="Paragraph text"
                  />
                </div>
              )}

              {/* List */}
              {watchFullDescription?.[index]?.type === "list" && (
                <div className="w-full">
                  <input
                    {...register(`fullDescription.${index}.heading`)}
                    className="w-full border p-1 rounded"
                    placeholder={`List Heading (optional)`}
                  />
                  {watchFullDescription[index]?.items?.map((_, idx) => (
                    <div key={idx} className="flex gap-2 mb-1">
                      <input
                        {...register(`fullDescription.${index}.items.${idx}`)}
                        className="w-full border p-1 rounded"
                        placeholder={`List item ${idx + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const items = [
                            ...(watchFullDescription[index].items || []),
                          ];
                          items.splice(idx, 1);
                          setValue(`fullDescription.${index}.items`, items);
                        }}
                        className="text-red-500 text-sm"
                      >
                        X
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const items = [
                        ...(watchFullDescription[index].items || []),
                        "",
                      ];
                      setValue(`fullDescription.${index}.items`, items);
                    }}
                    className="text-indigo-600 text-sm"
                  >
                    + Add List Item
                  </button>
                </div>
              )}

              {/* Link */}
              {watchFullDescription?.[index]?.type === "link" && (
                <div className="flex flex-col gap-2 w-full">
                  <input
                    {...register(`fullDescription.${index}.heading`)}
                    className="border p-2 rounded"
                    placeholder="Link Heading (optional)"
                  />
                  <input
                    {...register(`fullDescription.${index}.url`)}
                    className="border p-2 rounded"
                    placeholder="Link URL"
                  />
                  <input
                    {...register(`fullDescription.${index}.description`)}
                    className="border p-2 rounded"
                    placeholder="Link description"
                  />
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Add buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => appendDesc({ type: "paragraph", text: "" })}
            className="px-3 py-1 bg-indigo-600 text-white rounded"
          >
            + Paragraph
          </button>
          <button
            type="button"
            onClick={() => appendDesc({ type: "list", items: [""] })}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            + List
          </button>
          <button
            type="button"
            onClick={() =>
              appendDesc({ type: "link", url: "", description: "" })
            }
            className="px-3 py-1 bg-purple-600 text-white rounded"
          >
            + Link
          </button>
        </div>
      </div>

      {/* ================= OTHER SECTIONS ================= */}
      {[
        {
          field: "requirements",
          fieldsArray: reqFields,
          appendFn: appendReq,
          removeFn: removeReq,
        },
        {
          field: "whatYouWillLearn",
          fieldsArray: learnFields,
          appendFn: appendLearn,
          removeFn: removeLearn,
        },
        {
          field: "targetAudience",
          fieldsArray: targetFields,
          appendFn: appendTarget,
          removeFn: removeTarget,
        },
      ].map(({ field, fieldsArray, appendFn, removeFn }) => (
        <div key={field} className="border rounded p-2">
          <h3 className="font-medium mb-2">
            {field.replace(/([A-Z])/g, " $1")}
          </h3>

          {fieldsArray.map((f, i) => (
            <div key={f.id} className="flex gap-2 mb-1">
              <input
                {...register(`${field}.${i}`)}
                className="w-full border p-1 rounded"
              />
              <button
                type="button"
                onClick={() => removeFn(i)}
                className="text-red-500 text-sm"
              >
                X
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => appendFn("")}
            className="text-indigo-600 text-sm"
          >
            + Add
          </button>
        </div>
      ))}

      {/* ================= OTHER FIELDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="number"
          {...register("totalDuration")}
          placeholder="Total Duration (minutes)"
          className="border p-2 rounded"
        />
        <input
          type="number"
          {...register("totalLessons")}
          placeholder="Total Lessons"
          className="border p-2 rounded"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          {...register("language")}
          placeholder="Language"
          className="border p-2 rounded"
        />
        <select {...register("level")} className="border p-2 rounded">
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <label className="flex gap-2">
        <input type="checkbox" {...register("certificate")} />
        Certificate
      </label>

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-indigo-600 text-white rounded"
      >
        {loading ? "Saving..." : "Save Course Details"}
      </button>
    </form>
  );
};

export default CourseDetailsForm;
