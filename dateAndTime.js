class DateAndTime {
  constructor() {}

  getDateAndTime() {
    return new Date(Date.now())
      .toISOString()
      .replace('T', ' ')
      .replace(/\..+/, '')
      .replace(/-/g, '.');;
  }
}

module.exports = DateAndTime;
