// src/components/admin/StatCard.jsx
import { createElement } from "react";

export default function StatCard({
  icon: StatIcon,
  label,
  value,
  trend,
  trendLabel,
  bg = "bg-blue-50",
  "icon-color": iconColor = "text-blue-600",
}) {
  const isPositive = trend > 0;

  // Determine the background color for the icon based on the bg prop
  const iconBgMap = {
    "bg-blue-50": "bg-blue-100",
    "bg-green-50": "bg-green-100",
    "bg-purple-50": "bg-purple-100",
    "bg-orange-50": "bg-orange-100",
    "bg-red-50": "bg-red-100",
  };

  const iconBg = iconBgMap[bg] || "bg-blue-100";

  return (
    <div
      className={`${bg} rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-600 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
          {trendLabel && (
            <p
              className={`text-sm mt-2 ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {isPositive ? "↑" : "↓"} {trendLabel}
            </p>
          )}
        </div>
        <div className={`${iconBg} p-3 rounded-lg`}>
          {createElement(StatIcon, { className: `w-6 h-6 ${iconColor}` })}
        </div>
      </div>
    </div>
  );
}
