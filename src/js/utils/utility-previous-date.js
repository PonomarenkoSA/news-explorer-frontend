/* eslint-disable func-names */

export default function (quantityDays) {
  const currentDate = new Date();
  const previousDate = new Date(currentDate.getTime() - (quantityDays * 24 * 60 * 60 * 1000));
  const dateFrom = previousDate.toISOString();
  const dateTo = currentDate.toISOString();
  const dates = { dateFrom, dateTo };
  return dates;
}