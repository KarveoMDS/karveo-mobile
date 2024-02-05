export const useWeek = (days: number) => {
  const today = new Date();
  let first = today.getDate() - today.getDay() + 1 + days;

  if (today.getDay() === 0) {
    first -= 7;
  }

  const firstday = new Date(today.setDate(first));

  const week = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(firstday);
    day.setDate(firstday.getDate() + i);
    day.setHours(0, 0, 0, 0);
    week.push(day);
  }

  return week;
};

export const useCurrentWeek = () => {
  return useWeek(0);
};

export const useDay = (date: Date | undefined, shift: number) => {
  const day = new Date(date || new Date());
  day.setDate(day.getDate() + shift);
  day.setHours(0, 0, 0, 0);
  return day;
};
export const useCurrentDay = () => {
  const today = new Date();
  return useDay(today, 0);
};

export const useWeekString = (week: Date[]) => {
  return week.map((day) => day.toISOString().split('T')[0]);
};
