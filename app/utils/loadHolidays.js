import {
  loadBankHolidaysFromLocalStorage,
  updateLocalStorage,
} from "./localStorage.js";

export const loadBankHolidays = async function (todayDate) {
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
