import moment from "moment-timezone";

export function dateFormat(date, format) {
  return moment(date).format(format);
}

export function currencyFormat(value, currency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(value);
}

// Format a string as title case
export function titleCase(str) {
  return str.toLowerCase().replace(/(^|\s)\S/g, (match) => match.toUpperCase());
}

// Truncate a string to a specified length
export function truncate(str, length) {
  if (str.length > length) {
    return str.substring(0, length) + "...";
  } else {
    return str;
  }
}

// Convert a string to a slug
export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// Check if a value is empty
export function isEmpty(value) {
  return value === undefined || value === null || value === "";
}

// Check if a value is a number
export function isNumber(value) {
  return typeof value === "number" && isFinite(value);
}

// provide balance status all, open, close
export function getBalanceStatus(status) {
  return [
    { value: "all", text: "All" },
    { value: "open", text: "Open" },
    { value: "close", text: "Close" },
  ];
}

// create format number with two zero 1000 => 1,000.00
export function formatNumber(value) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: "currency",
    currency: "IDR",
  }).format(value);
}

// check if array or single value
export function isArray(value) {
  return Array.isArray(value);
}
