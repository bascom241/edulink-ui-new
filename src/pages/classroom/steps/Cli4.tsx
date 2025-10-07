

const Cli4 = ({ formData, setFormData }: any) => {

  const maxChars = 250;
  const charsRemaining = maxChars - formData.description.length;

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    // Limit input to maxChars characters
    if (value.length <= maxChars) {
      setFormData((prev: FormData) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <section className="bg-white rounded-lg p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Class Description</h1>
        <p className="text-gray-600">Describe your classroom to potential students.</p>
      </div>

      <div className="space-y-4">
        {/* Description Field */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <span className={`text-xs ${
              charsRemaining < 20 ? 'text-amber-600' : 'text-gray-500'
            }`}>
              {charsRemaining} characters remaining
            </span>
          </div>
          
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe what students will learn, teaching methods, prerequisites, etc."
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
          />
          
          {/* Character progress bar */}
          <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className={`h-1.5 rounded-full ${
                charsRemaining > 50 ? 'bg-green-500' : 
                charsRemaining > 20 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${(formData.description.length / maxChars) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Writing Tips
          </h3>
          <ul className="text-xs text-blue-600 list-disc pl-5 space-y-1">
            <li>Mention key learning objectives</li>
            <li>Describe your teaching style</li>
            <li>Highlight any unique aspects of your class</li>
            <li>Keep it concise and engaging</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Cli4