const suffix = (date) => {
  let string = date.toString();
  const end = string.charAt(string.length - 1);
  if (end === "1" && string !== "11") {
    string = `${string}st`;
  } else if (end === "2" && string !== "13") {
    string = `${string}nd`;
  } else if (end === "3" && string !== "13") {
    string = `${string}rd`;
  } else {
    string = `${string}th`;
  }
  return string;
};

module.exports = (
  timestamp,
  { monthLength = "short", dateSuffix = true } = {}
) => {
  const months = {
    0: monthLength === "short" ? "jan" : "January",
    1: monthLength === "short" ? "feb" : "Febuary",
    2: monthLength === "short" ? "mar" : "March",
    3: monthLength === "short" ? "apr" : "April",
    4: monthLength === "short" ? "may" : "May",
    5: monthLength === "short" ? "jun" : "June",
    6: monthLength === "short" ? "jul" : "July",
    7: monthLength === "short" ? "aug" : "August",
    8: monthLength === "short" ? "sep" : "September",
    9: monthLength === "short" ? "oct" : "October",
    10: monthLength === "short" ? "nov" : "November",
    11: monthLength === "short" ? "dec" : "December",
  };
  const object = new Date(timestamp);
  const month = months[object.getMonth()];
  const day = dateSuffix ? suffix(object.getDate()) : object.getDate();
  const year = object.getFullYear();
  let hour =
    object.getHours() > 12
      ? Math.floor(object.getHours() - 12)
      : object.getHours();
  if (hour === 0) {
    hour = 12;
  }

  const minutes = (dateObj.getMinutes() < 10 ? "0" : "") + dateObj.getMinutes();

  // set `am` or `pm`
  const periodOfDay = dateObj.getHours() >= 12 ? "pm" : "am";

  const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;

  return formattedTimeStamp;
};
