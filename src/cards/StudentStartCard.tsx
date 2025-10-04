export const StatCard = ({ icon, label, value, color }: any) => (
  <div className={`flex items-center gap-3 p-3 bg-${color}-50 rounded-xl`}>
    <div className={`p-2 bg-${color}-500 rounded-lg`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-bold text-gray-900">{value}</p>
    </div>
  </div>
);
