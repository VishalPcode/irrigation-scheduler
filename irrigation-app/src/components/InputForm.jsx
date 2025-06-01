import React, { useState, useEffect } from "react";

export default function InputForm({ onSubmit }) {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0);
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 7, 0);

  if (now > end) {
    start.setDate(start.getDate() + 1);
    end.setDate(end.getDate() + 1);
  }

  const [form, setForm] = useState({
    plots: 1,
    motors: 1,
    startTime: start,
    endTime: end,
    runtime: 1,
    interval: 1,
  });

  useEffect(() => {
    console.log("Component mounted with initial form state:", form);
  }, []);

  const handleChange = (e) => {
    const updatedForm = { ...form, [e.target.name]: e.target.value };
    setForm(updatedForm);
    console.log(`Field changed - ${e.target.name}:`, e.target.value);
    console.log("Updated form state:", updatedForm);
  };

  const handleTimeChange = (key, value) => {
    const now = new Date();
    const selectedTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      value.getHours(),
      value.getMinutes(),
      0,
      0
    );

    if (selectedTime < now) {
      selectedTime.setDate(selectedTime.getDate() + 1);
    }

    const updatedForm = { ...form, [key]: selectedTime };
    setForm(updatedForm);
    console.log(`Time changed - ${key}:`, selectedTime.toString());
    console.log("Updated form state:", updatedForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formatTime = (date) =>
      date.toTimeString().split(" ")[0].replace(/:/g, "").substring(0, 6);

    const submissionData = {
      ...form,
      startTime: formatTime(form.startTime),
      endTime: formatTime(form.endTime),
      plots: parseInt(form.plots),
      motors: parseInt(form.motors),
      runtime: parseInt(form.runtime),
      interval: parseInt(form.interval),
    };

    console.log("Submitting form with data:", submissionData);

    onSubmit(submissionData);
  };

  const formatLocalTime = (date) =>
    date.getHours().toString().padStart(2, "0") +
    ":" +
    date.getMinutes().toString().padStart(2, "0");

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-6 mb-6 mx-auto p-4"
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
          className="border border-gray-300 rounded px-3 py-2 w-full"
          min={1}
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
          className="border border-gray-300 rounded px-3 py-2 w-full"
          min={1}
        />
      </div>

      <div>
        <label htmlFor="startTime" className="block font-medium mb-1 capitalize">
          Start Time
        </label>
        <input
          type="time"
          name="startTime"
          value={formatLocalTime(form.startTime)}
          onChange={(e) => {
            const [hours, minutes] = e.target.value.split(":");
            const date = new Date();
            date.setHours(parseInt(hours));
            date.setMinutes(parseInt(minutes));
            handleTimeChange("startTime", date);
          }}
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
          onChange={(e) => {
            const [hours, minutes] = e.target.value.split(":");
            const date = new Date();
            date.setHours(parseInt(hours));
            date.setMinutes(parseInt(minutes));
            handleTimeChange("endTime", date);
          }}
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
          className="border border-gray-300 rounded px-3 py-2 w-full"
          min={1}
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
          className="border border-gray-300 rounded px-3 py-2 w-full"
          min={1}
        />
      </div>

      <div className="col-span-2">
        <button
          type="submit"
          className="pointer bg-green-500 hover:bg-green-600 text-white px-4 py-2 w-full rounded"
        >
          Generate Schedule
        </button>
      </div>
    </form>
  );
}
