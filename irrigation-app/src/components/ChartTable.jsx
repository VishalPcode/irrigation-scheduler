import React, { useState, useEffect } from "react";

// Determine status based on current time and start/end
const getStatus = (start, end) => {
  const now = new Date();
  const getMin = (t) => parseInt(t.slice(0, 2)) * 60 + parseInt(t.slice(2, 4));
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const startMin = getMin(start);
  const endMin = getMin(end);
  if (nowMin < startMin) return "Pending";
  if (nowMin >= startMin && nowMin <= endMin) return "In Progress";
  return "Done";
};

// Convert HHMM string to 24-hour format
const formatTime24 = (timeStr) => {
  const hours = timeStr.slice(0, 2);
  const minutes = timeStr.slice(2, 4);
  return `${hours}:${minutes}`;
};

// Tailwind styles for status
const getStatusColor = (status) => {
  switch (status) {
    case "Done":
      return "bg-green-200 text-green-800";
    case "In Progress":
      return "bg-yellow-200 text-yellow-800";
    case "Pending":
      return "bg-gray-200 text-gray-800";
    default:
      return "bg-white text-black";
  }
};

export default function ChartTable({ schedule, filter }) {
  const [timeTick, setTimeTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeTick((prev) => prev + 1);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const filtered = schedule.filter((entry) => {
    const status = getStatus(entry.startTime, entry.endTime);
    return (
      (filter.plot === "All" || entry.plot === filter.plot) &&
      (filter.status === "All" || status === filter.status)
    );
  });

  return (
    <div className="overflow-x-auto rounded-2xl bg-white p-2 shadow-lg">
      <table className="min-w-full table-auto text-sm">
        <thead>
          <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
            <th className="px-4 py-3 text-center">#</th>
            <th className="px-4 py-3 text-center">Plot</th>
            <th className="px-4 py-3 text-center">Start Time</th>
            <th className="px-4 py-3 text-center">End Time</th>
            <th className="px-4 py-3 text-center">Run By</th>
            <th className="px-4 py-3 text-center">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y-0 space-y-4">
          {filtered.map((entry, idx) => {
            const status = getStatus(entry.startTime, entry.endTime);
            return (
              <tr
                key={entry.index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                <td className="px-4 py-4 text-center font-medium text-gray-800 rounded-l-xl">
                  {entry.index}
                </td>
                <td className="px-4 py-4 text-center">{entry.plot}</td>
                <td className="px-4 py-4 text-center">{formatTime24(entry.startTime)}</td>
                <td className="px-4 py-4 text-center">{formatTime24(entry.endTime)}</td>
                <td className="px-4 py-4 text-center">{entry.RunBy}</td>
                <td className="px-4 py-4 text-center rounded-r-xl">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      status
                    )}`}
                  >
                    {status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
