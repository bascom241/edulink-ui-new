
import type { ChangeEvent } from "react";
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

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const InputField: React.FC<InputFieldProps> = ({ id, label, type, placeholder, value, onChange }) => (
  <div className="w-full md:w-1/3">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      value={value}
      onChange={onChange}
    />
  </div>
);

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}
const SelectField: React.FC<SelectFieldProps> = ({ id, label, value, onChange, options }) => (
  <div className="w-full md:w-1/4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      id={id}
      className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      value={value}
      onChange={onChange}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);