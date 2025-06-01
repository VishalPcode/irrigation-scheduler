import React, { useState } from "react";
import InputForm from "./components/InputForm";
import ChartTable from "./components/ChartTable";
import StatusFilter from "./components/StatusFilter";
import { generateIrrigationSchedule } from "./utils/scheduler";

export default function App() {
  const [inputData, setInputData] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [filter, setFilter] = useState({ plot: "All", status: "All" });

  const handleSubmit = (data) => {
    const plots = Array.from({ length: data.plots }, (_, i) => `D${i + 1}`);
    const motors = Array.from({ length: data.motors }, (_, i) => `M${i + 1}`);

    const newSchedule = generateIrrigationSchedule({
      plots,
      motors,
      startTime: data.startTime,
      endTime: data.endTime,
      runtime: data.runtime,
      interval: data.interval,
    });

    setInputData(data);
    setSchedule(newSchedule);
  };

  return (
    <div className="bg-green-100 min-h-screen">
      <div className="p-2 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-1">Irrigation System Scheduler</h1>

        <InputForm onSubmit={handleSubmit} />

        {schedule.length > 0 && (
          <>
            <StatusFilter
              schedule={schedule}
              filter={filter}
              setFilter={setFilter}
            />
            <ChartTable schedule={schedule} filter={filter} />
          </>
        )}
      </div>
    </div>
  );
}
