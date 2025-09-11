import Cl1 from "./steps/Cl1";
import Cli2 from "./steps/Cli2";
import { useState } from "react";
import { Check, ArrowLeft, ArrowRight } from "lucide-react";
import Cli3 from "./steps/Cli3";
import Cli4 from "./steps/Cli4";
import Cli5 from "./steps/Cli5";
import Cli6 from "./steps/Cli6";
import { useClassRoomStore } from "../../store/useClassRoom";
import { Loader } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const Classroom = () => {
  const steps = ["Class Info", "Pricing", "Class Delivery Method",   "Review & Submit"];
  const { createClassroom, creatingClassroom } = useClassRoomStore();
  const { user } = useAuthStore()
  const [formData, setFormData] = useState({
    // Step 1
    className: "",
    classCategory: "",
    targetAudience: "",

    // Step 2
    price: "",
    duration: "",

    // Step 3
    classDeliveryModel: "",
    classLocation: "",

    // Step 4
    description: "",

    // Step 5 (materials)
    materials: {
      resources: [{ file: "", title: "", description: "" }],
      assignments: [{ file: "", title: "", description: "" }],
      tasks: [{ file: "", title: "", description: "" }],
    },
  });


  const formToSubmit = new FormData();

  formToSubmit.append("classroom", new Blob([JSON.stringify({
    className: formData.className,
    classCategory: formData.classCategory,
    targetAudience: formData.targetAudience,
    price: formData.price,
    duration: formData.duration,
    classDeliveryModel: formData.classDeliveryModel,
    classLocation: formData.classLocation,
    description: formData.description
  })], { type: "application/json" }), "classroom.json");

  formToSubmit.append("students", new Blob([JSON.stringify([])], { type: "application/json" }), "students.json");

//   /// resources
// formData.materials.resources.forEach((r: any) => {
//   if (r.file instanceof File) {
//     formToSubmit.append("resourcesFiles", r.file, r.file.name);
//   }
//   formToSubmit.append("resourcesTitle", r.title || "");
//   formToSubmit.append("resourcesDescription", r.description || "");
// });

// // assignments
// formData.materials.assignments.forEach((a: any) => {
//   if (a.file instanceof File) {
//     formToSubmit.append("assignmentFiles", a.file, a.file.name);
//   }
//   formToSubmit.append("assignmentTitle", a.title || "");
//   formToSubmit.append("assignmentDescription", a.description || "");
// });

// tasks
// formData.materials.tasks.forEach((t: any) => {
//   if (t.file instanceof File) {
//     formToSubmit.append("taskFiles", t.file, t.file.name);
//   }
//   formToSubmit.append("taskTitle", t.title || "");
//   formToSubmit.append("taskDescription", t.description || "");
// });


  const userId = user?.userId;
  const onSubmit = () => {
    if (!isLastStep) return;
    if (userId) {
      createClassroom(formToSubmit, userId)
    }

    // Final submission logic here
    console.log("Final form data:", formData);
  }



  const stepComponents = [
    <Cl1 formData={formData} setFormData={setFormData} />,
    <Cli2 formData={formData} setFormData={setFormData} />,
    <Cli3 formData={formData} setFormData={setFormData} />,
    <Cli4 formData={formData} setFormData={setFormData} />,
    // <Cli5 formData={formData} setFormData={setFormData} />,
    <Cli6 formData={formData} onSubmit={onSubmit} onEditStep={(step) => setCurrentStep(step)} />
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, stepComponents.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const isLastStep = currentStep === stepComponents.length - 1;
  const isFirstStep = currentStep === 0;








  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <section className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Create A New Classroom
          </h1>
          <p className="text-gray-600">
            Follow the steps below to create a new classroom for your students.
          </p>
        </section>

        {/* Step Progress Bar */}
        <section className="mb-10">
          <div className="flex items-center justify-between relative ">
            {/* Connecting line */}
            <div className="absolute top-4 left-10 right-10 h-0.5 bg-gray-200 z-0"></div>

            {steps.map((label, index) => {
              const stepNumber = index + 1;
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;

              return (
                <div key={index} className="flex flex-col items-center z-10 flex-1 ">
                  {/* Circle */}
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      text-sm font-medium
                      ${isCompleted
                        ? "bg-green-600 text-white"
                        : isActive
                          ? "bg-white border-2 border-green-600 text-green-600"
                          : "bg-gray-200 text-gray-500"
                      }
                    `}
                  >
                    {isCompleted ? <Check size={16} /> : stepNumber}
                  </div>

                  {/* Label */}
                  <span
                    className={`mt-2 text-sm font-medium whitespace-nowrap
                      ${isActive ? "text-green-700" : "text-gray-500"}
                    `}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Step Content */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="mb-6">{stepComponents[currentStep]}</div>

          {/* Navigation buttons */}
          <div className="flex justify-between pt-4 border-t border-gray-100">
            <button
              onClick={prevStep}
              disabled={isFirstStep}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors
                ${isFirstStep
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-green-700 hover:bg-green-50"
                }`}
            >
              <ArrowLeft size={18} className="mr-2" />
              Previous
            </button>
            <button
              onClick={nextStep}
              disabled={isLastStep}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors
                ${isLastStep
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
                }`}
            >
              Next
              <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Classroom;