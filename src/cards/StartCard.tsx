

interface StatCardProps {
  title: string;
  value: string | number;
}
export const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);




