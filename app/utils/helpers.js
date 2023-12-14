import { SCHEDULE } from "./config.js";
import {
  loadBankHolidaysFromLocalStorage,
  updateLocalStorage,
} from "./localStorage.js";

export function calculatePlannedCollectionDate(todayDate) {
  const daysTillNextWed =
    todayDate.getDay() <= 3
      ? 3 - todayDate.getDay()
      : 7 - todayDate.getDay() + 3;

  const collectionDate = modifyDays(todayDate, daysTillNextWed);

  console.log(collectionDate);

  return collectionDate;
}

// export default X => import XXX from "" => XXX()
// export function A() => import {A} from "" => A()
// export function A() => import * as XXX from "" => XXX.A()

export function calculateCollectionSchedule(plannedCollectionDate) {
  console.log("planned coll date", plannedCollectionDate);
  const startDate = new Date(SCHEDULE.startingDate);
  const endDate = new Date(plannedCollectionDate);
  console.log("end date", endDate);

  //tests
  //const endDate = new Date("2023-12-27T00:00:01"); // weekGreen
  //const endDate = new Date("2023-12-20T00:00:01"); // weekBrown
  //const endDate = new Date("2024-01-03T00:00:01"); // weekBrown

  const differenceInDays = Math.floor(
    (endDate - startDate) / (1000 * 60 * 60 * 24)
  );

  console.log("differenceInDays", differenceInDays);
  return differenceInDays % 14 === 0 ? SCHEDULE.weekBrown : SCHEDULE.weekGreen;
}

// calculate day shift and return adjusted collection date
export const calculateNextCollectionDate = async function (
  todayDate,
  plannedCollectionDate
) {
  const bankHolidays = await loadBankHolidays(todayDate);

  // get nextCollection date and prepare the array of 1 and 2 days earlier
  const daysBeforeCollection = [
    modifyDays(plannedCollectionDate, 2, true).toISOString().substring(0, 10),
    modifyDays(plannedCollectionDate, 1, true).toISOString().substring(0, 10),
    plannedCollectionDate.toISOString().substring(0, 10),
  ];

  console.log(daysBeforeCollection);

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

const loadBankHolidays = async function (todayDate) {
  //const today = new Date();
  // check localStorage,
  // retrieve data from it
  // if (!bankHolidays || bankHolidays.year !== today.getFullYear) {
  // if empty or invalid
  // await fetch holidays
  // then store in localStorage
  //}
  const currentYear = todayDate.getFullYear();
  let bankHolidays = loadBankHolidaysFromLocalStorage();

  if (!bankHolidays || bankHolidays.year !== currentYear) {
    bankHolidays = await fetchHolidays(currentYear);
    updateLocalStorage(bankHolidays);
  }

  // const holidays = {
  //   year: 2023,
  //   days: ["2023-01-02", "2023-04-10", "2023-05-01", "2023-05-29"], //list will contain only bank holidays happened on Mon, Tue or Wed
  // };

  return bankHolidays;
};

const modifyDays = (startDate, days, subtract = false) => {
  const result = new Date(startDate);
  result.setDate(result.getDate() + days * (subtract ? -1 : 1));
  return result;
};

// [{"title":"New Year’s Day","date":"2018-01-01","notes":"","bunting":true},{"title":"Good Friday","date":"2018-03-30","notes":"","bunting":false},{"title":"Easter Monday","date":"2018-04-02","notes":"","bunting":true},{"title":"Early May bank holiday","date":"2018-05-07","notes":"","bunting":true},{"title":"Spring bank holiday","date":"2018-05-28","notes":"","bunting":true},{"title":"Summer bank holiday","date":"2018-08-27","notes":"","bunting":true},{"title":"Christmas Day","date":"2018-12-25","notes":"","bunting":true},{"title":"Boxing Day","date":"2018-12-26","notes":"","bunting":true},{"title":"New Year’s Day","date":"2019-01-01","notes":"","bunting":true},{"title":"Good Friday","date":"2019-04-19","notes":"","bunting":false},{"title":"Easter Monday","date":"2019-04-22","notes":"","bunting":true},{"title":"Early May bank holiday","date":"2019-05-06","notes":"","bunting":true},{"title":"Spring bank holiday","date":"2019-05-27","notes":"","bunting":true},{"title":"Summer bank holiday","date":"2019-08-26","notes":"","bunting":true},{"title":"Christmas Day","date":"2019-12-25","notes":"","bunting":true},{"title":"Boxing Day","date":"2019-12-26","notes":"","bunting":true},{"title":"New Year’s Day","date":"2020-01-01","notes":"","bunting":true},{"title":"Good Friday","date":"2020-04-10","notes":"","bunting":false},{"title":"Easter Monday","date":"2020-04-13","notes":"","bunting":false},{"title":"Early May bank holiday (VE day)","date":"2020-05-08","notes":"","bunting":true},{"title":"Spring bank holiday","date":"2020-05-25","notes":"","bunting":true},{"title":"Summer bank holiday","date":"2020-08-31","notes":"","bunting":true},{"title":"Christmas Day","date":"2020-12-25","notes":"","bunting":true},{"title":"Boxing Day","date":"2020-12-28","notes":"Substitute day","bunting":true},{"title":"New Year’s Day","date":"2021-01-01","notes":"","bunting":true},{"title":"Good Friday","date":"2021-04-02","notes":"","bunting":false},{"title":"Easter Monday","date":"2021-04-05","notes":"","bunting":true},{"title":"Early May bank holiday","date":"2021-05-03","notes":"","bunting":true},{"title":"Spring bank holiday","date":"2021-05-31","notes":"","bunting":true},{"title":"Summer bank holiday","date":"2021-08-30","notes":"","bunting":true},{"title":"Christmas Day","date":"2021-12-27","notes":"Substitute day","bunting":true},{"title":"Boxing Day","date":"2021-12-28","notes":"Substitute day","bunting":true},{"title":"New Year’s Day","date":"2022-01-03","notes":"Substitute day","bunting":true},{"title":"Good Friday","date":"2022-04-15","notes":"","bunting":false},{"title":"Easter Monday","date":"2022-04-18","notes":"","bunting":true},{"title":"Early May bank holiday","date":"2022-05-02","notes":"","bunting":true},{"title":"Spring bank holiday","date":"2022-06-02","notes":"","bunting":true},{"title":"Platinum Jubilee bank holiday","date":"2022-06-03","notes":"","bunting":true},{"title":"Summer bank holiday","date":"2022-08-29","notes":"","bunting":true},{"title":"Bank Holiday for the State Funeral of Queen Elizabeth II","date":"2022-09-19","notes":"","bunting":false},{"title":"Boxing Day","date":"2022-12-26","notes":"","bunting":true},{"title":"Christmas Day","date":"2022-12-27","notes":"Substitute day","bunting":true},{"title":"New Year’s Day","date":"2023-01-02","notes":"Substitute day","bunting":true},{"title":"Good Friday","date":"2023-04-07","notes":"","bunting":false},{"title":"Easter Monday","date":"2023-04-10","notes":"","bunting":true},{"title":"Early May bank holiday","date":"2023-05-01","notes":"","bunting":true},{"title":"Bank holiday for the coronation of King Charles III","date":"2023-05-08","notes":"","bunting":true},{"title":"Spring bank holiday","date":"2023-05-29","notes":"","bunting":true},{"title":"Summer bank holiday","date":"2023-08-28","notes":"","bunting":true},{"title":"Christmas Day","date":"2023-12-25","notes":"","bunting":true},{"title":"Boxing Day","date":"2023-12-26","notes":"","bunting":true},{"title":"New Year’s Day","date":"2024-01-01","notes":"","bunting":true},{"title":"Good Friday","date":"2024-03-29","notes":"","bunting":false},{"title":"Easter Monday","date":"2024-04-01","notes":"","bunting":true},{"title":"Early May bank holiday","date":"2024-05-06","notes":"","bunting":true},{"title":"Spring bank holiday","date":"2024-05-27","notes":"","bunting":true},{"title":"Summer bank holiday","date":"2024-08-26","notes":"","bunting":true},{"title":"Christmas Day","date":"2024-12-25","notes":"","bunting":true},{"title":"Boxing Day","date":"2024-12-26","notes":"","bunting":true},{"title":"New Year’s Day","date":"2025-01-01","notes":"","bunting":true},{"title":"Good Friday","date":"2025-04-18","notes":"","bunting":false},{"title":"Easter Monday","date":"2025-04-21","notes":"","bunting":true},{"title":"Early May bank holiday","date":"2025-05-05","notes":"","bunting":true},{"title":"Spring bank holiday","date":"2025-05-26","notes":"","bunting":true},{"title":"Summer bank holiday","date":"2025-08-25","notes":"","bunting":true},{"title":"Christmas Day","date":"2025-12-25","notes":"","bunting":true},{"title":"Boxing Day","date":"2025-12-26","notes":"","bunting":true}]
const fetchHolidays = async function (currentYear) {
  console.log("curr year", typeof currentYear);
  const response = await AJAX("https://www.gov.uk/bank-holidays.json");

  const filteredHolidays = response["england-and-wales"].events
    .filter((event) => Number(event.date.slice(0, 4)) === currentYear)
    .map((holiday) => holiday.date)
    .filter((holiday) => [1, 2, 3].includes(new Date(holiday).getDay()));

  const filteredHolidaysWithCurrentYear = {
    year: currentYear,
    days: filteredHolidays,
  };

  return filteredHolidaysWithCurrentYear;
};

const AJAX = async function (url) {
  const response = await fetch(url);

  let data;

  try {
    data = await response.json();
    console.log(data);
  } catch (_) {
    throw new Error(`(${response.status} ${response.statusText})`);
  }

  console.log(data);
  return data;
};
