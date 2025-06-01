import React, { useState } from "react";

export default function InputForm({ onSubmit }) {
  const getDefaultTimes = () => {
    const now = new Date();
    let start = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      20,
      0
    );
    let end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 0);

    if (now > end) {
      start.setDate(start.getDate() + 1);
      end.setDate(end.getDate() + 1);
    }
    return { start, end };
  };

  const { start, end } = getDefaultTimes();

  const [form, setForm] = useState({
    plots: 1,
    motors: 1,
    startTime: start,
    endTime: end,
    runtime: 1,
    interval: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeChange = (key, timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const now = new Date();
    let selectedTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes,
      0,
      0
    );

    if (selectedTime < now) {
      selectedTime.setDate(selectedTime.getDate() + 1);
    }

    setForm((prev) => ({ ...prev, [key]: selectedTime }));
  };

  const formatLocalTime = (date) =>
    `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

  const formatTimeForSubmit = (date) =>
    date.toTimeString().slice(0, 8).replace(/:/g, "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const submissionData = {
      ...form,
      plots: parseInt(form.plots, 10),
      motors: parseInt(form.motors, 10),
      runtime: parseInt(form.runtime, 10),
      interval: parseInt(form.interval, 10),
      startTime: formatTimeForSubmit(form.startTime),
      endTime: formatTimeForSubmit(form.endTime),
    };

    onSubmit(submissionData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-6 mx-auto p-4 "
    >
      <div>
        <label htmlFor="plots" className="block font-medium mb-1 capitalize">
          Plots
        </label>
        <input
          type="number"
          name="plots"
          value={form.plots}
          onChange={handleChange}
          min={1}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      <div>
        <label htmlFor="motors" className="block font-medium mb-1 capitalize">
          Motors
        </label>
        <input
          type="number"
          name="motors"
          value={form.motors}
          onChange={handleChange}
          min={1}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      <div>
        <label
          htmlFor="startTime"
          className="block font-medium mb-1 capitalize"
        >
          Start Time
        </label>
        <input
          type="time"
          name="startTime"
          value={formatLocalTime(form.startTime)}
          onChange={(e) => handleTimeChange("startTime", e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      <div>
        <label htmlFor="endTime" className="block font-medium mb-1 capitalize">
          End Time
        </label>
        <input
          type="time"
          name="endTime"
          value={formatLocalTime(form.endTime)}
          onChange={(e) => handleTimeChange("endTime", e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      <div>
        <label htmlFor="runtime" className="block font-medium mb-1 capitalize">
          Runtime (minutes)
        </label>
        <input
          type="number"
          name="runtime"
          value={form.runtime}
          onChange={handleChange}
          min={1}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      <div>
        <label htmlFor="interval" className="block font-medium mb-1 capitalize">
          Interval (minutes)
        </label>
        <input
          type="number"
          name="interval"
          value={form.interval}
          onChange={handleChange}
          min={1}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      <div className="col-span-2">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 w-full rounded"
        >
          Generate Schedule
        </button>
      </div>
    </form>
  );
}
