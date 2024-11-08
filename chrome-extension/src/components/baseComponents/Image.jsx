import React from "react";
import { classNames } from "../../utilities";

export const Image = ({
  id,
  name = "image",
  className,
  src,
  alt = "image",
  onClick,
  onError,
}) => {
  return (
    <img
      id={id}
      name={name}
      className={classNames("image", className ? className : "")}
      src={src}
      alt={alt}
      onClick={onClick ? onClick : () => null}
      onError={onError ? onError : () => null}
    />
  );
};
