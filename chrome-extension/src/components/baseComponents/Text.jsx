import React from "react";
import { classNames } from "../../utilities";

export const Text = ({
  type,
  id,
  name,
  children,
  className,
  onClick,
  dataCelloClick,
}) => {
  const renderText = () => {
    switch (type) {
      case "p":
        return (
          <p
            id={id}
            className={classNames(className ? className : "")}
            name={name}
          >
            {children}
          </p>
        );
      case "span":
        return (
          <span
            id={id}
            className={classNames(className ? className : "")}
            name={name}
            onClick={onClick ? onClick : () => null}
            data-Cello-Click={dataCelloClick}
          >
            {children}
          </span>
        );
      case "label":
        return (
          <label
            htmlFor={id}
            className={classNames(
              "label cursor-pointer",
              className ? className : ""
            )}
            name={name}
          >
            {children}
          </label>
        );
      case "error":
        return (
          <div className="relative">
            <small
              id={`error_${id}`}
              className={classNames(
                "error absolute",
                className ? className : ""
              )}
              name={`error_${name}`}
            >
              {children}
            </small>
          </div>
        );
      default:
        return null;
    }
  };
  return <>{renderText()}</>;
};
