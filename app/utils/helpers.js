import { SCHEDULE } from "./config.js";

export function calculateNextCollectionDate(todayDate) {
  const daysTillNextWed =
    todayDate.getDay() <= 3
      ? 3 - todayDate.getDay()
      : 7 - todayDate.getDay() + 3;

  const nextCollectionDate = new Date(todayDate);
  nextCollectionDate.setDate(todayDate.getDate() + daysTillNextWed);

  return nextCollectionDate;
}

export function calculateCollectionSchedule(nextCollectionDate) {
  const startDate = new Date(SCHEDULE.startingDate);
  const endDate = new Date(nextCollectionDate);

  //tests
  //const endDate = new Date("2023-12-27T00:00:01"); // weekGreen
  //const endDate = new Date("2023-12-20T00:00:01"); // weekBrown
  //const endDate = new Date("2024-01-03T00:00:01"); // weekBrown

  const differenceInDays = Math.floor(
    (endDate - startDate) / (1000 * 60 * 60 * 24)
  );

  return differenceInDays % 14 === 0 ? SCHEDULE.weekBrown : SCHEDULE.weekGreen;
}
