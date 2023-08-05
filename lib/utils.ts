import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

const nthNumber = (number: number) => {
  if (number > 3 && number < 21) return "th";
  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

function formatAMPM(date: Date) {
  var hours: number | string = date.getHours();
  var minutes: number | string = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toTitleCase(str: string) {
  return str.toLowerCase().replace(/(^|\s)\S/g, (L) => L.toUpperCase());
}

export function formatToCurrency(amount: string) {
  return parseFloat(amount)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

export function formatDate(str: string) {
  let date = new Date(str);

  let day = days[date.getDay()];
  let dateDay = date.getDate();
  let month = date.toLocaleString("en-US", { month: "short" });
  let year = date.getFullYear();

  return `${day}, ${dateDay}${nthNumber(
    dateDay
  )} ${month}, ${year}, ${formatAMPM(date)} `;
}
