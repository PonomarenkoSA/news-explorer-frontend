/* eslint-disable func-names */
/* eslint no-param-reassign: "error" */

export default function (date) {
  const keywordArticlesArray = date.map((item) => item.keyword);
  const keywordArticlesObj = keywordArticlesArray.reduce((obj, key) => {
    if (!obj[key]) {
      obj[key] = 1;
    } else {
      obj[key] += 1;
    }
    return obj;
  }, {});

  const sortedKeys = Object.keys(keywordArticlesObj)
    .sort((a, b) => keywordArticlesObj[b] - keywordArticlesObj[a]);
  return sortedKeys;
}
