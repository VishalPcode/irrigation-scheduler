import React from "react";

export default function StatusFilter({ schedule, filter, setFilter }) {
  const plots = [...new Set(schedule.map((entry) => entry.plot))];
  const statuses = ["All", "Pending", "In Progress", "Done"];

  return (
    <div className="flex gap-4 mb-6">
      <select
        value={filter.plot}
        onChange={(e) => setFilter({ ...filter, plot: e.target.value })}
        className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      >
        <option value="All">All Plots</option>
        {plots.map((plot) => (
          <option key={plot} value={plot}>
            {plot}
          </option>
        ))}
      </select>

      <select
        value={filter.status}
        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
}
