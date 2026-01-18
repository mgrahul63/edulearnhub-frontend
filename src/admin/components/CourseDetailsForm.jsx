import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";

const CourseDetailsForm = ({ initialData, onSubmit, setCourseInfo }) => {
  const [loading, setLoading] = useState(false);

  const { control, register, handleSubmit, watch, reset, setValue } = useForm({
    defaultValues: initialData,
  });

  // Reset form after fetching data
  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  // সব ফিল্ডের মান রিয়েল টাইমে ধরে রাখবে
  const watchAll = useWatch({ control });
  // প্রতিবার watchAll পরিবর্তিত হলে parent update
  if (setCourseInfo) setCourseInfo(watchAll);

  const watchFullDescription = watch("fullDescription");

  const {
    fields: descFields,
    append: appendDesc,
    remove: removeDesc,
  } = useFieldArray({ control, name: "fullDescription" });

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

  const submitHandler = (data) => {
    // check if every attribute has at least one value
    const allValid =
      data.fullDescription.length > 0 &&
      data.requirements.some((r) => r.trim() !== "") &&
      data.whatYouWillLearn.some((r) => r.trim() !== "") &&
      data.targetAudience.some((r) => r.trim() !== "") &&
      data.language.trim() &&
      data.totalDuration > 0 &&
      data.totalLessons > 0;

    if (!allValid) {
      alert("Please fill at least one value for every attribute");
      return;
    }

    setLoading(true);
    onSubmit(data);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      {/* Full Description */}
      <div>
        <h3 className="font-medium mb-2">Full Description</h3>
        {descFields.map((field, index) => (
          <div key={field.id} className="mb-4 p-3 border rounded">
            <div className="flex justify-between mb-2">
              <span>Block {index + 1}</span>
              <button
                type="button"
                onClick={() => removeDesc(index)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
            <div className="flex gap-1 w-full">
              <Controller
                control={control}
                name={`fullDescription.${index}.type`}
                render={({ field: typeField }) => (
                  <select
                    {...typeField}
                    className="border p-1 rounded mb-2 w-4/12"
                  >
                    <option value="paragraph">Paragraph</option>
                    <option value="list">List</option>
                    <option value="link">Link</option>
                  </select>
                )}
              />

              {/* Paragraph */}
              {watchFullDescription[index]?.type === "paragraph" && (
                <textarea
                  {...register(`fullDescription.${index}.text`)}
                  className="w-full border p-2 rounded"
                  placeholder="Paragraph text"
                />
              )}

              {/* List */}
              {watchFullDescription[index]?.type === "list" && (
                <div>
                  {watchFullDescription[index].items?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 mb-1">
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
                    className="text-indigo-600 text-sm mt-1"
                  >
                    + Add List Item
                  </button>
                </div>
              )}

              {/* Link */}
              {watchFullDescription[index]?.type === "link" && (
                <div className="flex flex-col gap-2 w-full">
                  <input
                    {...register(`fullDescription.${index}.url`)}
                    className="w-full border p-2 rounded"
                    placeholder="Link URL"
                  />
                  <input
                    {...register(`fullDescription.${index}.description`)}
                    className="w-full border p-2 rounded"
                    placeholder="Link Description"
                  />
                </div>
              )}
            </div>
          </div>
        ))}

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

      {/* Requirements, Learn, Target */}
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
            {field
              .replace(/([A-Z])/g, " $1") // add space before uppercase letters
              .replace(/^./, (str) => str.toUpperCase())}{" "}
            {/* capitalize first letter */}
          </h3>
          {fieldsArray.map((f, i) => (
            <div key={f.id} className="flex items-center gap-2 mb-1">
              <input
                {...register(`${field}.${i}`)}
                className="w-full border p-1 rounded"
                placeholder={`Enter ${field}`}
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
            className="text-indigo-600 text-sm mt-1"
          >
            + Add {field}
          </button>
        </div>
      ))}

      {/* Other Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="">Total Duration(minutes)</label>
          <input
            type="number"
            placeholder="Total Duration (minutes)"
            {...register("totalDuration")}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="">Total Lessons</label>
          <input
            type="number"
            placeholder="Total Lessons"
            {...register("totalLessons")}
            className="border p-2 rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div>
          <label htmlFor="">Language</label>
          <input
            type="text"
            placeholder="Language"
            {...register("language")}
            className="border p-2 rounded"
          />
        </div>
        <div className="block">
          <label htmlFor="">Level</label>
          <br />
          <select {...register("level")} className="border p-2 rounded">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="">Demo Video URl</label>
        <input
          type="text"
          placeholder="Promo Video URL"
          {...register("promoVideoUrl")}
          className="border p-2 rounded w-full mt-2"
        />
      </div>
      <label className="flex items-center gap-2 mt-2">
        <input type="checkbox" {...register("certificate")} />
        Certificate
      </label>

      <button
        type="submit"
        disabled={loading}
        className={`mt-4 px-6 py-2 rounded bg-indigo-600 text-white ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Saving..." : "Save Course Details"}
      </button>
    </form>
  );
};

export default CourseDetailsForm;
