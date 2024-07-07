import React, { useEffect, useState } from "react";

import { Notification } from "../Notification/Notification";
import { checkDateIsEqual, checkIsToday } from "../../utils/helpers/date";
import { useCalendar } from "./hooks/useCalendar";

import "./Calendar.css";
import { SelectedModal } from "../SelectedModal/SelectedModal";

interface CalendarProps {
  locale?: string;
  selectedDate: Date;
  selectDate: (date: Date) => void;
  firstWeekDayNumber?: number;
}

export const Calendar: React.FC<CalendarProps> = ({
  locale = "default",
  selectedDate: date,
  selectDate,
  firstWeekDayNumber = 2,
}) => {
  const { functions, state } = useCalendar({
    locale,
    selectedDate: date,
    firstWeekDayNumber,
  });
  const [showModal, setShowModal] = useState(false);

  const renderDays = state.calendarDays.map((day) => {
    const isToday = checkIsToday(day.date);
    const isSelectedDay = checkDateIsEqual(day.date, state.selectedDay.date);
    const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;
    const numberOfTasks = localStorage
      .getItem(JSON.stringify(day.date))
      ?.split(",").length;
    return (
      <div
        key={`${day.dayNumber}-${day.monthIndex}`}
        aria-hidden
        onClick={() => {
          setShowModal(() => true);
          functions.setSelectedDay(day);
          selectDate(day.date);
        }}
        className={[
          "calendar__day",
          isToday ? "calendar__today__item" : "",
          isSelectedDay ? "calendar__selected__item" : "",
          isAdditionalDay ? "calendar__additional__day" : "",
        ].join(" ")}
      >
        {day.dayNumber}
        {numberOfTasks && <Notification quantity={numberOfTasks} />}
      </div>
    );
  });

  return (
    <div className="calendar">
      <div className="calendar__header">
        <div
          aria-hidden
          className="calendar__header__arrow__left"
          onClick={() => functions.onClickArrow("left")}
        />
        {state.mode === "days" && (
          <div aria-hidden onClick={() => functions.setMode("monthes")}>
            {state.monthesNames[state.selectedMonth.monthIndex].month}{" "}
            {state.selectedYear}
          </div>
        )}
        {state.mode === "monthes" && (
          <div aria-hidden onClick={() => functions.setMode("years")}>
            {state.selectedYear}
          </div>
        )}
        {state.mode === "years" && (
          <div>
            {state.selectedYearsInterval[0]} -{" "}
            {
              state.selectedYearsInterval[
                state.selectedYearsInterval.length - 1
              ]
            }
          </div>
        )}
        <div
          aria-hidden
          className="calendar__header__arrow__right"
          onClick={() => functions.onClickArrow("right")}
        />
      </div>
      <div className="calendar__body">
        {state.mode === "days" && (
          <>
            <div className="calendar__week__names">
              {state.weekDaysNames.map((weekDaysName) => (
                <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
              ))}
            </div>
            <div className="calendar__days">{renderDays}</div>
          </>
        )}
        {state.mode === "monthes" && (
          <div className="calendar__pick__items__container">
            {state.monthesNames.map((monthesName) => {
              const isCurrentMonth =
                new Date().getMonth() === monthesName.monthIndex &&
                state.selectedYear === new Date().getFullYear();
              const isSelectedMonth =
                monthesName.monthIndex === state.selectedMonth.monthIndex;

              return (
                <div
                  key={monthesName.month}
                  aria-hidden
                  onClick={() => {
                    functions.setSelectedMonthByIndex(monthesName.monthIndex);
                    functions.setMode("days");
                  }}
                  className={[
                    "calendar__pick__item",
                    isSelectedMonth ? "calendar__selected__item" : "",
                    isCurrentMonth ? "calendar__today__item" : "",
                  ].join(" ")}
                >
                  {monthesName.monthShort}
                </div>
              );
            })}
          </div>
        )}

        {state.mode === "years" && (
          <div className="calendar__pick__items__container">
            <div className="calendar__unchoosable__year">
              {state.selectedYearsInterval[0] - 1}
            </div>
            {state.selectedYearsInterval.map((year) => {
              const isCurrentYear = new Date().getFullYear() === year;
              const isSelectedYear = year === state.selectedYear;

              return (
                <div
                  key={year}
                  aria-hidden
                  onClick={() => {
                    functions.setSelectedYear(year);
                    functions.setMode("monthes");
                  }}
                  className={[
                    "calendar__pick__item",
                    isCurrentYear ? "calendar__today__item" : "",
                    isSelectedYear ? "calendar__selected__item" : "",
                  ].join(" ")}
                >
                  {year}
                </div>
              );
            })}
            <div className="calendar__unchoosable__year">
              {state.selectedYearsInterval[
                state.selectedYearsInterval.length - 1
              ] + 1}
            </div>
          </div>
        )}
        {showModal && (
          <SelectedModal
            setShowModal={setShowModal}
            date={state.selectedDay.date}
          />
        )}
      </div>
    </div>
  );
};
