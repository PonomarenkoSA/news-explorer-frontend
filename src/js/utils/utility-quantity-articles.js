/* eslint-disable func-names */

export default function (name, articlesQuantity) {
  const lastNumber = String(articlesQuantity)[String(articlesQuantity).length - 1];
  let lastNumbers = 0;
  if (articlesQuantity > 9) {
    lastNumbers = String(articlesQuantity)[String(articlesQuantity).length - 2]
  + String(articlesQuantity)[String(articlesQuantity).length - 1];
  }
  if (Number(lastNumbers) > 10 && Number(lastNumbers) < 15) {
    return `${name}, у вас ${articlesQuantity} сохраненных статей`;
  }
  if (Number(lastNumber) === 0) {
    return `${name}, у вас ${articlesQuantity} сохраненных статей`;
  }
  if (Number(lastNumber) === 1) {
    return `${name}, у вас ${articlesQuantity} сохраненная статья`;
  }
  if (Number(lastNumber) > 1 && Number(lastNumber) < 5) {
    return `${name}, у вас ${articlesQuantity} сохраненных статьи`;
  }
  return `${name}, у вас ${articlesQuantity} сохраненных статей`;
}
