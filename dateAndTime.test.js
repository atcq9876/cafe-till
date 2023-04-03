const DateAndTime = require('./dateAndTime');

describe('dateAndTime', () => {
  it('returns the current date and time in the desired format', () => {
    const currentDateAndTime = (new Date(Date.now())).toISOString().replace('T', ' ').replace(/\..+/, '').replace(/-/g, '.');;
    const dateAndTime = new DateAndTime();
    expect(dateAndTime.getDateAndTime()).toEqual(currentDateAndTime);
  })
})
