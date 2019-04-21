class RequestHelper {
  constructor(url) {
    this.url = url;
  }

  get() {
    return fetch(this.url).then(res => res.json());
  }

}

module.exports = RequestHelper;
