import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

interface Flower {
  id: number;
  left: number;
  delay: number;
  duration: number;
}

const PaymentSucces: React.FC = () => {
  const [flowers, setFlowers] = useState<Flower[]>([]);

  useEffect(() => {
    // Create floating flower data on mount
    const newFlowers = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // horizontal position in %
      delay: Math.random() * 1.5, // delay before animation starts
      duration: 5 + Math.random() * 3, // animation duration
    }));
    setFlowers(newFlowers);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-50 to-blue-50 overflow-hidden">
      {/* 🌸 Floating Flowers */}
      {flowers.map((flower) => (
        <motion.div
          key={flower.id}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: [0.5, 1, 0], y: [-100, -300] }}
          transition={{
            duration: flower.duration,
            repeat: Infinity,
            delay: flower.delay,
            ease: "easeOut",
          }}
          className="absolute text-pink-400 text-2xl"
          style={{ left: `${flower.left}%` }}
        >
          🌸
        </motion.div>
      ))}

      {/* ✅ Success Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-lg rounded-3xl p-10 flex flex-col items-center text-center z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 200,
            damping: 10,
          }}
          className="mb-4"
        >
          <CheckCircle className="w-16 h-16 text-green-500" />
        </motion.div>

        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          Payment Successful!
        </h1>

        <p className="text-gray-600 max-w-md">
          🎉 Thank you for your payment. Your classroom enrollment has been confirmed.
          <br /> You’ll be redirected shortly or you can close this page.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-6 px-6 py-3 rounded-full bg-green-600 text-white font-medium shadow hover:bg-green-700 transition"
          onClick={() => (window.location.href = "/dashboard")}
        >
          Go to Dashboard
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PaymentSucces;
