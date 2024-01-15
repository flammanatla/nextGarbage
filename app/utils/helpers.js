import { SCHEDULE } from "./config.js";
import { loadBankHolidays } from "./loadHolidays.js";

export function calculatePlannedCollectionDate(todayDate) {
  console.log(todayDate);
  const daysTillNextWed =
    todayDate.getDay() <= 3
      ? 3 - todayDate.getDay()
      : 7 - todayDate.getDay() + 3;

  const collectionDate = modifyDays(todayDate, daysTillNextWed);

  return collectionDate;
}

export function calculateCollectionSchedule(plannedCollectionDate) {
  const startDate = new Date(SCHEDULE.startingDate);
  const endDate = new Date(plannedCollectionDate);

  const differenceInDays = Math.floor(
    (endDate - startDate) / (1000 * 60 * 60 * 24)
  );

  return differenceInDays % 14 === 0 ? SCHEDULE.weekBrown : SCHEDULE.weekGreen;
}

// calculate day shift and return adjusted collection date
export const calculateAdjustedCollectionDate = async function (
  todayDate,
  plannedCollectionDate
) {
  const bankHolidays = await loadBankHolidays(todayDate);

  // get plannedCollection date and prepare the array of 1 and 2 days earlier
  const daysBeforeCollection = [
    modifyDays(plannedCollectionDate, 2, true).toISOString().substring(0, 10),
    modifyDays(plannedCollectionDate, 1, true).toISOString().substring(0, 10),
    plannedCollectionDate.toISOString().substring(0, 10),
  ];

  // check if any member of daysBeforeCollection is in the list of bank holidays
  // [ '2023-01-02', '2023-01-03', '2023-01-04' ]
  // [ "2023-01-02", "2023-04-10", "2023-05-01", "2023-05-29"]

  const holidaySet = new Set(bankHolidays.days);

  const found = daysBeforeCollection.find((date) => holidaySet.has(date));

  const nextCollectionDate = found
    ? modifyDays(plannedCollectionDate, 1)
    : plannedCollectionDate;

  return nextCollectionDate;
};

const modifyDays = (startDate, days, subtract = false) => {
  const result = new Date(startDate);
  result.setDate(result.getDate() + days * (subtract ? -1 : 1));
  return result;
};
