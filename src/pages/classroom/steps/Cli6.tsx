import { Edit, CheckCircle, AlertCircle, Loader } from "lucide-react";

interface Cli6Props {
  formData: any;
  onEditStep: (step: number) => void;
  onSubmit: () => void;
}
import { useClassRoomStore } from "../../../store/useClassRoom";
const Cli6 = ({ formData, onEditStep, onSubmit }: Cli6Props) => {
  const sections = [
    {
      title: "Basic Information",
      step: 1,
      data: [
        { label: "Class Name", value: formData.className },
        { label: "Category", value: formData.classCategory },
        { label: "Target Audience", value: formData.targetAudience },
      ],
    },
    {
      title: "Pricing & Duration",
      step: 2,
      data: [
        { label: "Price", value: formData.price },
        {
          label: "Duration",
          value: formData.duration
            ? `${formData.duration} (Auto-expires after this period)`
            : "",
        },
      ],
    },
    {
      title: "Delivery Method",
      step: 3,
      data: [
        { label: "Model", value: formData.deliveryModel },
        { label: "Location", value: formData.classLocation },
      ],
    },
    {
      title: "Class Description",
      step: 4,
      data: [{ label: "Description", value: formData.description }],
    },
    // {
    //   title: "Class Materials",
    //   step: 5,
    //   // ⚡ Instead of a flat `data`, we’ll render custom for materials
    //   materials: formData.materials,
    // },
  ];

  const {creatingClassroom} = useClassRoomStore()
  return (
    <section className="bg-white rounded-lg p-6">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Review Classroom
        </h1>
        <p className="text-gray-600">
          Please review all details before creating your classroom.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="space-y-6 mb-8">
        {sections.map((section, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {section.title}
              </h3>
              <button
                onClick={() => onEditStep(section.step - 1)}
                className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </button>
            </div>

            {/* Default Data Rendering */}
            {section.data && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.data.map((item, itemIndex) => (
                  <div key={itemIndex} className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      {item.label}
                    </p>
                    <p className="text-gray-900 break-words">
                      {item.value || (
                        <span className="text-gray-400">Not provided</span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            )}

            
            {/* {section.materials && (
              <div className="space-y-6">
                {Object.entries(section.materials).map(([category, items]: any) => (
                  <div key={category}>
                    <h4 className="font-medium text-gray-700 mb-2 capitalize">
                      {category}
                    </h4>
                    {items.length > 0 ? (
                      <ul className="space-y-3">
                        {items.map((item: any, i: number) => (
                          <li
                            key={i}
                            className="p-3 border border-gray-200 rounded-lg"
                          >
                            <p className="text-gray-900 font-medium">
                              {item.title || "Untitled"}
                            </p>
                            <p className="text-sm text-gray-600">
                              {item.description || "No description"}
                            </p>
                            {item.file && (
                              <p className="text-sm text-blue-600 break-all mt-1">
                                {item.file}
                              </p>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400 text-sm">No {category} added</p>
                    )}
                  </div>
                ))}
              </div>
            )} */}
          </div>
        ))}
      </div>

      {/* Final Check & Submit */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-800 mb-1">Before you create</h4>
            <p className="text-blue-700 text-sm">
              Please ensure all information is correct. You can edit any section
              by clicking the Edit button. Once created, some details cannot be
              changed.
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          onClick={onSubmit}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          {
            creatingClassroom ? <Loader className="animate-spin" />: "Create classroom"
          }
        </button>
        <p className="text-sm text-gray-500 mt-3">
          You'll be able to add students and schedule sessions after creation
        </p>
      </div>
    </section>
  );
};

export default Cli6;
