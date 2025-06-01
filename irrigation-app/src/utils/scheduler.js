export function generateIrrigationSchedule({ plots, motors, startTime, endTime, runtime, interval }) {
  const result = [];

  const toMinutes = (t) => parseInt(t.slice(0, 2), 10) * 60 + parseInt(t.slice(2, 4), 10);

  const toHHMM = (minutes) => {
    const h = String(Math.floor(minutes / 60)).padStart(2, '0');
    const m = String(minutes % 60).padStart(2, '0');
    return `${h}${m}`;
  };

  const startMin = toMinutes(startTime);
  const endMin = toMinutes(endTime);

  let timeCursor = startMin;
  let index = 0;
  let plotIndex = 0;

  while (timeCursor + runtime <= endMin && plotIndex < plots.length) {
    for (let motorIndex = 0; motorIndex < motors.length && plotIndex < plots.length; motorIndex++) {
      result.push({
        index: index++,
        plot: plots[plotIndex],
        startTime: toHHMM(timeCursor),
        endTime: toHHMM(timeCursor + runtime),
        RunBy: motors[motorIndex]
      });
      plotIndex++;
    }

    timeCursor += runtime + interval;
  }

  return result;
}
