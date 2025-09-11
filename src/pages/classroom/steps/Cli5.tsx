import { Plus, X, Link, File, Upload } from "lucide-react";

type MaterialCategory = "resources" | "assignments" | "tasks";

interface MaterialItem {
  file: string;
  title: string;
  description: string;
}

const Cli5 = ({ formData, setFormData }: any) => {
  const { materials } = formData;

  const addItem = (category: MaterialCategory) => {
    setFormData((prev: any) => ({
      ...prev,
      materials: {
        ...prev.materials,
        [category]: [...prev.materials[category], { file: "", title: "", description: "" }],
      },
    }));
  };

  const removeItem = (category: MaterialCategory, index: number) => {
    if (formData.materials[category].length <= 1) return;

    setFormData((prev: any) => ({
      ...prev,
      materials: {
        ...prev.materials,
        [category]: prev.materials[category].filter((_: any, i: number) => i !== index),
      },
    }));
  };

  const updateItem = (category: MaterialCategory, index: number, field: keyof MaterialItem, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      materials: {
        ...prev.materials,
        [category]: prev.materials[category].map((item: MaterialItem, i: number) =>
          i === index ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  const handleFileUpload = (category: MaterialCategory, index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      updateItem(category, index, "file", file.name);
    }
  };

  return (
    <section className="bg-white rounded-lg p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Class Materials</h1>
        <p className="text-gray-600">Add resources, assignments, and tasks for your students.</p>
      </div>

      <div className="space-y-8">
        {(["resources", "assignments", "tasks"] as MaterialCategory[]).map((category) => (
          <div
            key={category}
            className={`border-l-4 pl-4 ${
              category === "resources"
                ? "border-blue-500"
                : category === "assignments"
                ? "border-green-500"
                : "border-purple-500"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <File
                  className={`w-5 h-5 mr-2 ${
                    category === "resources"
                      ? "text-blue-500"
                      : category === "assignments"
                      ? "text-green-500"
                      : "text-purple-500"
                  }`}
                />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {materials[category].filter((item: MaterialItem) => item.title.trim() || item.file.trim() || item.description.trim()).length} added
              </span>
            </div>

            <div className="space-y-3">
              {materials[category].map((item: MaterialItem, index: number) => (
                <div key={index} className="space-y-2 border border-gray-200 p-3 rounded-lg group">
                  {/* Title */}
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateItem(category, index, "title", e.target.value)}
                    placeholder={`${category.slice(0, -1)} title`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />

                  {/* Description */}
                  <textarea
                    value={item.description}
                    onChange={(e) => updateItem(category, index, "description", e.target.value)}
                    placeholder={`${category.slice(0, -1)} description`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />

                  {/* File Upload */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Link className="w-4 h-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={item.file}
                        onChange={(e) => updateItem(category, index, "file", e.target.value)}
                        placeholder="Paste file link or filename"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>

                    <label className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
                      <Upload className="w-4 h-4 text-gray-600" />
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(category, index, e)} />
                    </label>

                    {materials[category].length > 1 && (
                      <button
                        onClick={() => removeItem(category, index)}
                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => addItem(category)}
              className="mt-4 flex items-center text-green-600 hover:text-green-700 font-medium text-sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add {category.slice(0, -1)}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Cli5;
