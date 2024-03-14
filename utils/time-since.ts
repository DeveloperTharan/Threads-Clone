export const timeSince = (date: Date) => {
  const seconds = Math.floor((getCurrentTime() - date.getTime()) / 1000);
  const interval = getInterval(seconds);

  if (interval.unit) {
    return Math.floor(interval.value) + interval.unit;
  }

  return Math.floor(seconds) + "s";
};

const getCurrentTime = () => {
  return new Date().getTime();
};

const getInterval = (seconds: number) => {
  const intervals = [
    { unit: "y", divisor: 31536000 },
    { unit: "m", divisor: 2592000 },
    { unit: "d", divisor: 86400 },
    { unit: "h", divisor: 3600 },
    { unit: "m", divisor: 60 },
  ];

  for (const { unit, divisor } of intervals) {
    const interval = seconds / divisor;
    if (interval > 1) {
      return { value: interval, unit };
    }
  }

  return {};
};
