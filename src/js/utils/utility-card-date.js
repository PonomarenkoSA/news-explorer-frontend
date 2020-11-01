/* eslint-disable func-names */

export default function (articleDate) {
  const date = new Date(articleDate);
  const options = {
    day: 'numeric',
    month: 'long',
  };
  const cardDate = `${date.toLocaleString('ru', options)}, ${date.toLocaleString('ru', { year: 'numeric' })}`;
  return cardDate;
}
