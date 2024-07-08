import { formatDate } from "../helpers/date";

interface IScheduleService {
  isDayOff(date: Date): Promise<string>;
}
export class ScheduleService implements IScheduleService {
  async isDayOff(date: Date): Promise<string> {
    const response = await fetch(
      `https://isdayoff.ru/${formatDate(date, "YYYY")}${formatDate(
        date,
        "MM"
      )}${formatDate(date, "DD")}?cc=ru`
    );
    const data = await response.json();
    return data;
  }
}
