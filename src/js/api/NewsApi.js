export default class NewsApi {
  constructor(params) {
    this.baseUrl = params.baseUrl;
    this.apiKey = params.apiKey;
    this.language = params.language;
    this.sortBy = params.sortBy;
    this.pageSize = params.pageSize;
  }

  getNews(q, dateFrom, dateTo) {
    return fetch(`${this.baseUrl}q=${q}&from=${dateFrom}&to=${dateTo}&language=${this.language}&sortBy=${this.sortBy}&pageSize=${this.pageSize}&apiKey=${this.apiKey}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject();
      })
      .catch((err) => Promise.reject(err.message));
  }
}
