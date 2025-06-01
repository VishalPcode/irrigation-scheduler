export function generateIrrigationSchedule({ plots, motors, startTime, endTime, runtime, interval }) {
  const result = [];
  const getTimeInMinutes = t => parseInt(t.slice(0, 2)) * 60 + parseInt(t.slice(2, 4));
  const formatTime = m => `${String(Math.floor(m / 60)).padStart(2, '0')}${String(m % 60).padStart(2, '0')}`;

  const startMin = getTimeInMinutes(startTime);
  const endMin = getTimeInMinutes(endTime);

  let timeCursor = startMin;
  let index = 0;
  let plotIndex = 0;

  while (timeCursor + runtime <= endMin) {
    for (let m = 0; m < motors.length && plotIndex < plots.length; m++) {
      result.push({
        index: index++,
        plot: plots[plotIndex % plots.length],
        startTime: formatTime(timeCursor),
        endTime: formatTime(timeCursor + runtime),
        RunBy: motors[m % motors.length]
      });
      plotIndex++;
    }
    timeCursor += runtime + interval;
  }

  return result;
}
