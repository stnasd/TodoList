import "./Notification.css";

interface NotificationProps {
  quantity: number;
}

export const Notification = (props: NotificationProps) => {
  return <div className="notification">{props.quantity}</div>;
};
