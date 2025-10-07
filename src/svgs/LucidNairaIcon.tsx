

/**
 * Lucide-style Naira (₦) icon component
 *
 * Props:
 * - size: number (px) for width/height (default 24)
 * - strokeWidth: number for stroke width (default 2)
 * - color: stroke color (default 'currentColor')
 * - ...props passed to the <svg>
 *
 * Example: <LucideNairaIcon size={32} color="#008000" />
 */

export default function LucideNairaIcon({ size = 24, strokeWidth = 2, color = "currentColor", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      {/* Left vertical stem */}
      <path d="M8 4v16" />

      {/* Right vertical stem */}
      <path d="M16 4v16" />

      {/* Diagonal connecting bottom-left to top-right (the "N" stroke) */}
      <path d="M8 20L16 4" />

      {/* Double horizontal bars crossing the N (the distinctive ₦ lines) */}
      <path d="M4 9h16" />
      <path d="M4 15h16" />
    </svg>
  );
}


