import React from "react";
import "./ModalWindow.css";
import { Portal } from "../Portal/Portal";

interface IModalWindow {
  height?: string;
  width?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  children: React.ReactElement;
  className?: string;
}
export const ModalWindow: React.FC<IModalWindow> = ({
  height,
  width,
  top,
  right,
  bottom,
  left,
  className,
  children,
}) => {
  return (
    <Portal className="portal">
      <div id="bgModal" className="bg">
        <div
          style={{ height, width, top, right, bottom, left }}
          className={`modal ${className}`}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};
