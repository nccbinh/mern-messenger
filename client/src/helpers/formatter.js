/**
 * Formatter Helper
 * @author Binh Nguyen
 * @since 0.1.0
 */

/**
 * @name formatTime
 * @description Date time formatter
 * @param {Date} time time to be formatted.
 * @returns formatted time with format "hh:mm:ss mm/dd/yy"
 */
exports.formatTime = function (time) {
  const curr = new Date();
  const year = formatNum(
    time.getYear() > 100 ? time.getYear() - 100 : this.getYear()
  );
  const month = formatNum(time.getMonth() + 1);
  const date = formatNum(time.getDate());
  let result = formatNum(time.getHours()) + ":" + formatNum(time.getMinutes());
  if (
    time.getDate() !== curr.getDate() ||
    time.getMonth() !== curr.getMonth() ||
    time.getYear() !== curr.getYear()
  ) {
    result += " " + month + "/" + date;
    if (time.getYear() !== curr.getYear()) {
      result += "/" + year;
    }
  }
  return result;
};

const formatNum = (num) => {
  return (num < 10 ? "0" : "") + num;
};
