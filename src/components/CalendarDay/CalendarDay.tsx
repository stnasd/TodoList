import { useEffect, useState } from "react";
import { Notification } from "../Notification/Notification";
import { formatDate } from "../../utils/helpers/date";
import { ScheduleService } from "../../utils/Services/ScheduleService";

interface CalendarDayProps {
  day: Object;
  date: Date;
  monthIndex: number;
  dayNumber: number;
  setShowModal: Function;
  functions: {
    setSelectedDay: Function;
  };
  selectDate: Function;
  classes: string;
}
export const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  monthIndex,
  dayNumber,
  setShowModal,
  functions,
  selectDate,
  classes,
  date,
}) => {
  const [dayOff, setDayOff] = useState("");
  const numberOfTasks = localStorage.getItem(JSON.stringify(date))?.split(",");

  useEffect(() => {
    const scheduleService = new ScheduleService();
    scheduleService.isDayOff(date).then((data: string) => setDayOff(data));
  }, [date]);

  return (
    <div
      key={`${dayNumber}-${monthIndex}`}
      aria-hidden
      onClick={() => {
        setShowModal(() => true);
        functions.setSelectedDay(day);
        selectDate(date);
      }}
      className={`${classes} ${dayOff && "calendar__dayOff__day"}`}
    >
      {dayNumber}
      {numberOfTasks && numberOfTasks?.[0] !== "[]" && (
        <Notification quantity={numberOfTasks.length} dayOff={dayOff} />
      )}
    </div>
  );
};
