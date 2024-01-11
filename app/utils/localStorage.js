const BANK_HOLIDAYS_KEY = "bank_holidays";

export function loadBankHolidaysFromLocalStorage() {
  return localStorage.getItem(BANK_HOLIDAYS_KEY) !== null
    ? JSON.parse(localStorage.getItem(BANK_HOLIDAYS_KEY))
    : [];
}

export function updateLocalStorage(bankHolidays) {
  localStorage.setItem(BANK_HOLIDAYS_KEY, JSON.stringify(bankHolidays));
}
