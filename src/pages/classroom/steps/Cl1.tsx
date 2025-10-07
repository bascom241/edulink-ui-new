

const Cl1 = ({ formData, setFormData }:any) => {


  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="bg-white rounded-lg p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Classroom - Basic Information</h1>
        <p className="text-gray-600">Provide the basic information for the new classroom.</p>
      </div>

      <div className="space-y-5">
        {/* Class Name Field */}
        <div>
          <label htmlFor="className" className="block text-sm font-medium text-gray-700 mb-1">
            Class Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="className"
            name="className"
            value={formData.className}
            onChange={handleChange}
            placeholder="Enter class name"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            required
          />
        </div>

        {/* Class Category Field */}
        <div>
          <label htmlFor="classCategory" className="block text-sm font-medium text-gray-700 mb-1">
            Class Category <span className="text-red-500">*</span>
          </label>
          <select
            id="classCategory"
            name="classCategory"
            value={formData.classCategory}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            required
          >
            <option value="">Select a category</option>
            <option value="math">Mathematics</option>
            <option value="science">Science</option>
            <option value="language">Language Arts</option>
            <option value="history">History</option>
            <option value="art">Arts</option>
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Target Audience Field */}
        <div>
          <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-1">
            Target Audience
          </label>
          <textarea
            id="targetAudience"
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
            placeholder="Describe the intended audience for this class"
            rows={3}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
          />
        </div>
      </div>
    </section>
  );
};

export default Cl1;