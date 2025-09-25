import { useState } from 'react';

const Cli3 = ({ formData, setFormData }: any) => {
  const [showLinkGenerator, setShowLinkGenerator] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('');

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePlatformLink = () => {
    switch(selectedPlatform) {
      case 'google-meet':
        return 'https://meet.google.com/new';
      case 'zoom':
        return 'https://zoom.us/meeting/schedule';
      case 'microsoft-teams':
        return 'https://teams.microsoft.com/meeting';
      case 'telegram':
        return 'https://t.me/';
      case 'whatsapp':
        return 'https://chat.whatsapp.com/';
      default:
        return '';
    }
  };

  const platformInstructions = {
    'google-meet': 'Create a meeting and copy the link to use for your classroom',
    'zoom': 'Schedule a meeting and copy the invitation link',
    'microsoft-teams': 'Create a meeting and share the join link',
    'telegram': 'Create a group and generate an invite link from group settings',
    'whatsapp': 'Create a group and generate an invite link from group info'
  };

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform);
    setShowLinkGenerator(true);
  };

  const applyGeneratedLink = () => {
    if (selectedPlatform && generatePlatformLink()) {
      setFormData((prev: any) => ({
        ...prev,
        classLocation: generatePlatformLink()
      }));
      setShowLinkGenerator(false);
    }
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
          <div className="flex justify-between items-center mb-1">
            <label
              htmlFor="classLocation"
              className="block text-sm font-medium text-gray-700"
            >
              Class Location <span className="text-red-500">*</span>
            </label>
            
            {formData.classDeliveryModel === 'Online' && (
              <button
                type="button"
                onClick={() => setShowLinkGenerator(!showLinkGenerator)}
                className="text-sm text-green-600 hover:text-green-800 font-medium flex items-center"
              >
                {showLinkGenerator ? 'Hide Link Generator' : 'Generate Meeting Link'}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
          
          <input
            type="text"
            id="classLocation"
            name="classLocation"
            value={formData.classLocation}
            onChange={handleChange}
            placeholder={
              formData.classDeliveryModel === 'Online'
                ? 'https://meet.google.com/abc-defg-hij'
                : formData.classDeliveryModel === 'Physical'
                ? '123 Main St, City, State'
                : 'Delivery option not available yet'
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            required
            disabled={formData.classDeliveryModel === 'Hybrid'}
          />

          {/* Link Generator */}
          {showLinkGenerator && formData.classDeliveryModel === 'Online' && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Generate Meeting Link</h3>
              <p className="text-xs text-gray-600 mb-3">Select a platform to generate a meeting link</p>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3">
                {[
                  { id: 'google-meet', name: 'Google Meet', icon: '📹' },
                  { id: 'zoom', name: 'Zoom', icon: '🔍' },
                  { id: 'microsoft-teams', name: 'Teams', icon: '💼' },
                  { id: 'telegram', name: 'Telegram', icon: '📨' },
                  { id: 'whatsapp', name: 'WhatsApp', icon: '💚' }
                ].map((platform) => (
                  <button
                    key={platform.id}
                    type="button"
                    onClick={() => handlePlatformSelect(platform.id)}
                    className={`flex flex-col items-center p-2 rounded border text-sm ${
                      selectedPlatform === platform.id
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg mb-1">{platform.icon}</span>
                    <span>{platform.name}</span>
                  </button>
                ))}
              </div>
              
              {selectedPlatform && (
                <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-medium">Instructions:</span> {platformInstructions[selectedPlatform as keyof typeof platformInstructions]}
                  </p>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={generatePlatformLink()}
                      readOnly
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={applyGeneratedLink}
                      className="px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-r hover:bg-green-700"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    ⚡ Tip: For ongoing classes, use a recurring meeting link so students can reuse it for all sessions.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Detailed Instructions */}
          <div className="mt-3 text-sm text-gray-600 leading-relaxed">
            {formData.classDeliveryModel === 'Online' && (
              <>
                <p>
                  Please provide a valid meeting link. Supported platforms:
                  Google Meet, Zoom, or Microsoft Teams.
                </p>
                <p className="mt-1 font-medium">Best Practices:</p>
                <ul className="list-disc list-inside">
                  <li>Use a recurring meeting link for all sessions in this classroom</li>
                  <li>For Telegram/WhatsApp, create a dedicated group for this classroom</li>
                  <li>Test the link before sharing with students</li>
                </ul>
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

export default Cli3;