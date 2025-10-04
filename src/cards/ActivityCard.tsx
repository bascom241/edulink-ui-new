export const ActivityCard = ({ name, text, time }: any) => (
  <div className="flex items-center gap-3 mb-2">
    <img src={`https://i.pravatar.cc/32?u=${name}`} alt="avatar" className="w-8 h-8 rounded-full" />
    <div className="flex-1">
      <p className="text-sm text-gray-700">
        <span className="font-semibold">{name}</span> {text}
      </p>
    </div>
    <span className="text-xs text-gray-400">{time}</span>
  </div>
);