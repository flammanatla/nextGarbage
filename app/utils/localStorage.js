export function loadBankHolidaysFromLocalStorage() {
  return localStorage.getItem("bank_holidays") !== null
    ? JSON.parse(localStorage.getItem("bank_holidays"))
    : [];
}

export function updateLocalStorage(bankHolidays) {
  localStorage.setItem("bank_holidays", JSON.stringify(bankHolidays));
}
