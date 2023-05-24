type DateFormat =
  | "DD.MM.YYYY"
  | "YYYY.MM.DD"
  | "DD.MM.YYYY HH:MM"
  | "YYYY.MM.DD HH:MM";

export default class ExtendedDate extends Date {
  NumberTo2Length(num: number) {
    const numStr = num.toString();
    return numStr.length === 1 ? `0${numStr}` : numStr;
  }

  Format = (format?: DateFormat) => {
    const day = this.NumberTo2Length(this.getDate());
    const month = this.NumberTo2Length(this.getMonth() + 1);
    const year = this.getFullYear().toString();

    const hours = this.NumberTo2Length(this.getHours());
    const min = this.NumberTo2Length(this.getMinutes());

    switch (format) {
      case "DD.MM.YYYY":
        return `${day}.${month}.${year}`;
      case "YYYY.MM.DD":
        return `${year}.${month}.${day}`;
      case "DD.MM.YYYY HH:MM":
        return `${day}.${month}.${year} ${hours}:${min}`;
      case "YYYY.MM.DD HH:MM":
        return `${year}.${month}.${day} ${hours}:${min}`;
      default:
        return `${day}.${month}.${year}`;
    }
  };
}
