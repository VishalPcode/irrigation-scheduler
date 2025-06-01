import React, { useState, useEffect } from "react";

const getSecondsFromTime = (t) => {
  const hh = parseInt(t.slice(0, 2), 10);
  const mm = parseInt(t.slice(2, 4), 10);
  const ss = t.length >= 6 ? parseInt(t.slice(4, 6), 10) : 0;
  return hh * 3600 + mm * 60 + ss;
};

const getStatus = (start, end) => {
  const now = new Date();
  const nowSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  const startSeconds = getSecondsFromTime(start);
  const endSeconds = getSecondsFromTime(end);
  
  if (nowSeconds < startSeconds) return "Pending";
  if (nowSeconds >= startSeconds && nowSeconds <= endSeconds) return "In Progress";
  return "Done";
};

const formatTime24 = (timeStr) => {
  const hours = timeStr.slice(0, 2);
  const minutes = timeStr.slice(2, 4);
  const seconds = timeStr.length >= 6 ? timeStr.slice(4, 6) : "00";
  return `${hours}:${minutes}:${seconds}`;
};

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
  const [nextCountdown, setNextCountdown] = useState(null);

const formatCountdown = (totalSec) => {
  const hh = String(Math.floor(totalSec / 3600)).padStart(2, "0");
  const mm = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
  const ss = String(totalSec % 60).padStart(2, "0");
  return { hh, mm, ss };
};

 useEffect(() => {
  const interval = setInterval(() => {
    setTimeTick((prev) => prev + 1);

    const now = new Date();
    const nowSec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

    let nextEventSec = Infinity;

    for (const entry of schedule) {
      const startSec = getSecondsFromTime(entry.startTime);
      const endSec = getSecondsFromTime(entry.endTime);

      if (nowSec < startSec) {
        nextEventSec = Math.min(nextEventSec, startSec);
      } else if (nowSec >= startSec && nowSec < endSec) {
        nextEventSec = Math.min(nextEventSec, endSec);
      }
    }

    if (nextEventSec < Infinity) {
      const remaining = nextEventSec - nowSec;
      setNextCountdown(formatCountdown(remaining));
    } else {
      setNextCountdown(null);
    }
  }, 1000);

  return () => clearInterval(interval);
}, [schedule]);


  const filtered = schedule.filter((entry) => {
    const status = getStatus(entry.startTime, entry.endTime);
    return (
      (filter.plot === "All" || entry.plot === filter.plot) &&
      (filter.status === "All" || status === filter.status)
    );
  });

  return (
    <div className="overflow-x-auto rounded-2xl bg-white p-2 shadow-lg">
      <div className="mb-4 text-center text-lg font-semibold text-blue-700">
        {nextCountdown
          ? `Next update in: ${nextCountdown.hh}:${nextCountdown.mm}:${nextCountdown.ss}`
          : "Done!"}
      </div>

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
