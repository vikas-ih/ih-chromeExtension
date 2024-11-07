import React from "react";
import { classNames } from "../../utilities"


interface HeaderProps {
  type: string;
  id?: string;
  name?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Header = ({
  type,
  id,
//   name,
  children,
  className,
  onClick,
}: HeaderProps) => {
  const renderText = (type:any) => {
    switch (type) {
      case "h1":
        return (
          <h1
            id={id}
            className={classNames("h1", className ? className : "")}
            // name={name}
            onClick={onClick ? onClick : () => null}
          >
            {children}
          </h1>
        );
      case "h2":
        return (
          <h2
            id={id}
            className={classNames("h2", className ? className : "")}
            // name={name}
            onClick={onClick ? onClick : () => null}
          >
            {children}
          </h2>
        );
      case "h3":
        return (
          <h3
            id={id}
            className={classNames("h3", className ? className : "")}
            // name={name}
            onClick={onClick ? onClick : () => null}
          >
            {children}
          </h3>
        );
      case "h4":
        return (
          <h4
            id={id}
            className={classNames("h4", className ? className : "")}
            // name={name}
            onClick={onClick ? onClick : () => null}
          >
            {children}
          </h4>
        );
      case "h5":
        return (
          <h5
            id={id}
            className={classNames("h5", className ? className : "")}
            // name={name}
            onClick={onClick ? onClick : () => null}
          >
            {children}
          </h5>
        );
      case "h6":
        return (
          <h6
            id={id}
            className={classNames("h6", className ? className : "")}
            // name={name}
            onClick={onClick ? onClick : () => null}
          >
            {children}
          </h6>
        );
      default:
        return null;
    }
  };
  return <>{renderText(type)}</>;
};
