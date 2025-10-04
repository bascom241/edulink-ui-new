

const Cli2 = ({ formData, setFormData }: any) => {

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value
    }));

    console.log(formData)
  };

  return (
    <section className="bg-white rounded-lg p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Pricing & Duration</h1>
        <p className="text-gray-600">Set the pricing and duration for your classroom.</p>
      </div>

      <div className="space-y-5">
        {/* Classroom Price Field */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Classroom Price
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">Leave empty if the class is free</p>
        </div>

        {/* Duration Field */}
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
            Duration in Days <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Enter number of days"
            min="1"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            required
          />
          <p className="mt-2 text-sm text-blue-600 bg-blue-50 p-2 rounded-md">
            ⓘ Class will auto-expire after this duration.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Cli2