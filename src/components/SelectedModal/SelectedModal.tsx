import { ModalWindow } from "../ModalWindow/ModalWindow";
import { useEffect, useState } from "react";

import "./SelectedModal.css";

interface ModalProps {
  date: Date;
  setShowModal: Function;
}

export const SelectedModal: React.FC<ModalProps> = ({ date, setShowModal }) => {
  const [showTaskMenu, setShowTaskMenu] = useState(false);
  const [task, setTask] = useState("");
  const [dateTasks, setDateTasks] = useState("");
  const [complitedTasks, setComplitedTasks] = useState("");

  useEffect(() => {
    setDateTasks(() => localStorage.getItem(JSON.stringify(date)) || "");
    setComplitedTasks(
      () => localStorage.getItem(JSON.stringify(date + "ComplitedTask")) || " "
    );
  }, [dateTasks]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const onSubmitTask = () => {
    const prevTaskData = localStorage.getItem(JSON.stringify(date));
    const parsedPrevTaskData = prevTaskData ? JSON.parse(prevTaskData) : [];
    const newData = [...parsedPrevTaskData, task];

    localStorage.setItem(JSON.stringify(date), JSON.stringify(newData));
    setTask(() => "");
    setDateTasks(() => localStorage.getItem(JSON.stringify(date)) || "");
    setShowTaskMenu(() => false);
  };

  const onComplitedTask = (spanElement: string) => {
    const prevComplitedTask = localStorage.getItem(
      JSON.stringify(date + "ComplitedTask")
    );
    const parsedComplitedTask = prevComplitedTask
      ? JSON.parse(prevComplitedTask)
      : [];
    const newData = [...parsedComplitedTask, spanElement];

    localStorage.setItem(
      JSON.stringify(date + "ComplitedTask"),
      JSON.stringify(newData)
    );

    setComplitedTasks(
      () => localStorage.getItem(JSON.stringify(date + "ComplitedTask")) || " "
    );
  };

  const onDeleteTask = (item: string) => {
    let tasksLocal = localStorage.getItem(JSON.stringify(date)) || "";
    const tasksArray = tasksLocal.split(",").map((item) => {
      return item.replace(/[\[\]"]/g, "");
    });
    let indexToRemove = tasksArray.indexOf(item);
    const newData = indexToRemove > -1 && [
      ...tasksArray.slice(0, indexToRemove),
      ...tasksArray.slice(indexToRemove + 1),
    ];

    localStorage.setItem(JSON.stringify(date), JSON.stringify(newData));
    setDateTasks(() => localStorage.getItem(JSON.stringify(date)) || "");

    if (complitedTasks.length > 2) {
      const complitedTasksArray = complitedTasks.split(",").map((item) => {
        return item.replace(/[\[\]"]/g, "");
      });
      let indexToRemove = complitedTasksArray.indexOf(item);
      const newComplData = indexToRemove > -1 && [
        ...complitedTasksArray.slice(0, indexToRemove),
        ...complitedTasksArray.slice(indexToRemove + 1),
      ];
      localStorage.setItem(
        JSON.stringify(date + "ComplitedTask"),
        JSON.stringify(newComplData)
      );
      setComplitedTasks(
        () =>
          localStorage.getItem(JSON.stringify(date + "ComplitedTask")) || " "
      );
    }
  };

  const renderTasks = () => {
    if (dateTasks !== "[]" && dateTasks) {
      const tasksElemetns = dateTasks.split(",").map((spanItem, index) => {
        const complitedClass = complitedTasks.split(",").some((item) => {
          return (
            item.replace(/[\[\]"]/g, "") === spanItem.replace(/[\[\]"]/g, "")
          );
        });
        return (
          <li className="modal__task_name" key={spanItem + index}>
            <span
              className={`modal__task_name_span ${
                complitedClass ? "complited" : ""
              }`}
            >
              {spanItem.replace(/[\[\]"]/g, "")}
            </span>
            <div
              className="modal__content__icon__trash "
              onClick={() => onDeleteTask(spanItem.replace(/[\[\]"]/g, ""))}
            />
            {!complitedClass && (
              <div
                className="modal__content__icon__checkmark"
                onClick={() =>
                  onComplitedTask(spanItem.replace(/[\[\]"]/g, ""))
                }
              />
            )}
          </li>
        );
      });
      return (
        <>
          <div className="modal__task__list">
            <p>Задачи</p>
            <ul>{tasksElemetns}</ul>
          </div>
          <div className="modal__buttons">
            <button onClick={() => setShowTaskMenu(() => true)}>
              Добавить
            </button>
            <button onClick={() => setShowModal(false)}>Закрыть</button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="modal__task__list_empty">
            <ul>
              <li className="modal__task_name">
                На этот день пока нет задач...
              </li>
            </ul>
          </div>
          <div className="modal__buttons">
            <button onClick={() => setShowTaskMenu(() => true)}>
              Добавить
            </button>
            <button onClick={() => setShowModal(false)}>Закрыть</button>
          </div>
        </>
      );
    }
  };

  return (
    <div>
      <ModalWindow className="modal">
        <div className="modal__content">
          {(!showTaskMenu && <>{renderTasks()}</>) || (
            <div className="modal__content_input_task">
              <label>
                <p>Задача</p>
                <input type="text" value={task} onChange={handleInputChange} />
              </label>
              <div className="modal__buttons">
                {task.length > 0 && (
                  <button onClick={onSubmitTask}>Добавить</button>
                )}
                <button onClick={() => setShowModal(false)}>Закрыть</button>
              </div>
            </div>
          )}
        </div>
      </ModalWindow>
    </div>
  );
};
