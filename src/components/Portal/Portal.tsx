import React, { ReactElement, ElementType, HTMLAttributes, FC } from "react";
import ReactDOM from "react-dom";

import "./Portal.css";

const root = document.getElementById("modal");

export interface IPortal extends HTMLAttributes<HTMLOrSVGElement> {
  className?: string;
  children: ReactElement;
  element?: ElementType;
  container?: Element | DocumentFragment;
}
export const Portal: FC<IPortal> = ({
  element: Tag = "div",
  className,
  children,
  container,
}) => {
  return root
    ? ReactDOM.createPortal(
        <Tag className={`portalBasic ${className}`}>{children}</Tag>,
        root
      )
    : container
    ? ReactDOM.createPortal(
        <Tag className={`portalBasic ${className}`}>{children}</Tag>,
        container
      )
    : null;
};
