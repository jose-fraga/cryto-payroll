import { utcToZonedTime } from 'date-fns-tz'
import * as Localization from 'expo-localization';

/**
 * Returns the time left when submitting from a
 * given date. If there is time left it returns
 * { days, hours, minutes, seconds }, otherwise {}.
 */
export const calculateTimeLeft = (date) => {
  const difference = +new Date(date) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};


export const dateToCurrentTimeZone = (date) => {
  const timeZone = Localization.timezone;   // e.g. America/Los_Angeles
  const utcDate = utcToZonedTime(new Date(date), timeZone)
  return utcDate;
}
