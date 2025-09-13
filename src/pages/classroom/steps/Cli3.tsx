import { useState } from 'react'

const Cli3 = ({ formData, setFormData }: any) => {
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="bg-white rounded-lg p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Delivery Method</h1>
        <p className="text-gray-600">
          Select how your classroom will be delivered to students.
        </p>
      </div>

      <div className="space-y-6">
        {/* Delivery Model Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Delivery Model <span className="text-red-500">*</span>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Online Option */}
            <label
              className={`flex flex-col p-4 border rounded-lg cursor-pointer transition-all ${
                formData.classDeliveryModel === 'Online'
                  ? 'border-green-500 bg-green-50 ring-1 ring-green-500'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  name="classDeliveryModel"
                  value="Online"
                  checked={formData.classDeliveryModel === 'Online'}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500"
                  required
                />
                <span className="ml-2 font-medium">Online</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Virtual classes via video conferencing
              </p>
            </label>

            {/* Physical Option */}
            <label
              className={`flex flex-col p-4 border rounded-lg cursor-pointer transition-all ${
                formData.classDeliveryModel === 'Physical'
                  ? 'border-green-500 bg-green-50 ring-1 ring-green-500'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  name="classDeliveryModel"
                  value="Physical"
                  checked={formData.classDeliveryModel === 'Physical'}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 font-medium">Physical</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                In-person classes at a location
              </p>
            </label>

            {/* Hybrid Option (Disabled) */}
            <label
              className={`flex flex-col p-4 border rounded-lg transition-all opacity-50 cursor-not-allowed bg-gray-100`}
            >
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  name="classDeliveryModel"
                  value="Hybrid"
                  disabled
                  className="h-4 w-4 text-gray-400"
                />
                <span className="ml-2 font-medium text-gray-500">Hybrid</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Coming soon 🚀</p>
            </label>
          </div>
        </div>

        {/* Class Location Field */}
        <div>
          <label
            htmlFor="classLocation"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Class Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="classLocation"
            name="classLocation"
            value={formData.classLocation}
            onChange={handleChange}
            placeholder={
              formData.classDeliveryModel === 'Online'
                ? 'https://zoom.us/j/...'
                : formData.classDeliveryModel === 'Physical'
                ? '123 Main St, City, State'
                : 'Delivery option not available yet'
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            required
            disabled={formData.classDeliveryModel === 'Hybrid'}
          />

          {/* Detailed Instructions */}
          <div className="mt-3 text-sm text-gray-600 leading-relaxed">
            {formData.classDeliveryModel === 'Online' && (
              <>
                <p>
                  Please provide a valid meeting link. Supported platforms:
                  Google Meet, Zoom, or Microsoft Teams.
                </p>
                <p className="mt-1 font-medium">Examples:</p>
                <ul className="list-disc list-inside">
                  <li>https://meet.google.com/abc-defg-hij</li>
                  <li>https://zoom.us/j/1234567890</li>
                  <li>https://teams.microsoft.com/l/meetup-join/...</li>
                </ul>
                <p className="mt-1">
                  ⚡ Tip: Use a recurring meeting link so students can reuse it
                  for all sessions.
                </p>
              </>
            )}
            {formData.classDeliveryModel === 'Physical' && (
              <>
                <p>
                  Please provide the <strong>full physical address</strong> of
                  the classroom.
                </p>
                <p className="mt-1 font-medium">Example:</p>
                <p>123 Main St, Room 204, Springfield, IL 62704</p>
                <p className="mt-1">
                  ✅ Include street, building name, room number, city, state, and postal code for clarity.
                </p>
              </>
            )}
            {formData.classDeliveryModel === 'Hybrid' && (
              <p>Hybrid delivery is coming soon 🚀</p>
            )}
            {!formData.classDeliveryModel && (
              <p>
                Provide location information based on your selected delivery
                method.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cli3
