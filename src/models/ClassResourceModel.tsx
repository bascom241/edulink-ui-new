import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Paperclip } from "lucide-react";
import { useClassRoomStore } from "../store/useClassRoom";
import toast from "react-hot-toast";

interface ResourcesModelProps {
    setStudyResourcesModal: (value: boolean) => void;
    classId: number;
}

const ClassResourceModel = ({ setStudyResourcesModal, classId }: ResourcesModelProps) => {
    const { uploadClassResources } = useClassRoomStore();

    // local state to dynamically add multiple resources
    const [resources, setResources] = useState([{ title: "", description: "", file: null as File | null }]);

    const handleChange = (index: number, field: string, value: any) => {
        const newResources = [...resources];
        (newResources[index] as any)[field] = value;
        setResources(newResources);
    };

    const addResourceField = () => {
        setResources([...resources, { title: "", description: "", file: null }]);
    };

    const removeResource = (index: number) => {
        setResources((prev) => prev.filter((_, i) => i != index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Create FormData and append all resources
        const formData = new FormData();
        
        resources.forEach((res, index) => {
            if (res.file) {
                formData.append(`resources[${index}][title]`, res.title);
                formData.append(`resources[${index}][description]`, res.description);
                formData.append(`resources[${index}][file]`, res.file);
            }
        });

        try {
            const success = await uploadClassResources(formData, classId);
            if (success) {
                toast.success("Resources uploaded ✅");
                setStudyResourcesModal(false);
            } else {
                toast.error("Failed to upload resources ❌")
            }
        } catch (err) {
            toast.error("Failed to upload resources ❌");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center  z-50">
            <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative"
            >
                {/* Close button */}
                <button
                    onClick={() => setStudyResourcesModal(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X className="h-6 w-6" />
                </button>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Upload Class Resources
                </h2>

                {/* Form */}
                <form className="space-y-6 max-h-[60vh] overflow-y-auto " onSubmit={handleSubmit}>
                    {resources.map((res, index) => (
                        <div
                            key={index}
                            className="border relative rounded-xl p-4 shadow-sm space-y-4 bg-gray-50"
                        >
                            <button
                                type="button"
                                onClick={() => removeResource(index)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                            >
                                ✕
                            </button>
                            {/* Resource Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={res.title}
                                    onChange={(e) => handleChange(index, "title", e.target.value)}
                                    placeholder="e.g. Algebra Basics"
                                    className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    required
                                />
                            </div>

                            {/* Resource Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={res.description}
                                    onChange={(e) => handleChange(index, "description", e.target.value)}
                                    rows={2}
                                    placeholder="Brief description of the resource"
                                    className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    required
                                ></textarea>
                            </div>

                            {/* File Upload */}
                            <div>
                                <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <Paperclip className="h-4 w-4 text-indigo-500" /> Upload File
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf,.docx,.pptx,.mp4,.jpg,.png"
                                    onChange={(e) =>
                                        handleChange(index, "file", e.target.files ? e.target.files[0] : null)
                                    }
                                    className="w-full border rounded-xl px-3 py-2 text-sm cursor-pointer"
                                    required
                                />
                            </div>
                        </div>
                    ))}

                    {/* Add more resources */}
                    <button
                        type="button"
                        onClick={addResourceField}
                        className="w-full py-2 border border-dashed border-indigo-400 text-indigo-600 font-medium rounded-xl hover:bg-indigo-50 transition"
                    >
                        + Add Another Resource
                    </button>

                    {/* Submit */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition"
                    >
                        Upload All Resources
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default ClassResourceModel;