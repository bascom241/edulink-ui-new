import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface ComingSoonProps {
  title?: string;
  subtitle?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  title = "Coming Soon",
  subtitle = "We're working hard to bring this feature to you soon!",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center text-center bg-white border border-gray-200 rounded-2xl shadow-sm p-10"
    >
      <div className="relative mb-3">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse absolute -top-1 -right-1"></div>
        <Clock className="w-10 h-10 text-blue-500" />
      </div>

      <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-500 text-sm max-w-xs">{subtitle}</p>
    </motion.div>
  );
};

export default ComingSoon;
