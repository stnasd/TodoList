import "./Notification.css";

interface NotificationProps {
  quantity: number;
  dayOff: string;
}

export const Notification = (props: NotificationProps) => {
  return (
    <div
      className={`notification ${props.dayOff && "notification__dayOff"}
        `}
    >
      {props.quantity}
    </div>
  );
};
