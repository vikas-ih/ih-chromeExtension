import React from "react";
import { Select } from "antd";
import { classNames } from "../../utilities";
export const SingleSelect = ({
  disabled,
  placeholder,
  options,
  onChange,
  id,
  inputClassName,
  popupClassName,
  bordered,
  name,
  value,
  filterOption,
  mode = null,
}) => {
  return (
    <Select
      id={id}
      name={name}
      disabled={disabled}
      style={{ WebkitTextFillColor: "#000" }}
      bordered={false}
      placeholder={placeholder}
      className={classNames(
        "border-none bg-white rounded-xl py-1 w-full",
        inputClassName ? inputClassName : ""
      )}
      options={options}
      popupClassName={popupClassName}
      onChange={onChange ? onChange : () => null}
      value={value}
      showSearch
      filterOption={filterOption}
      mode={mode}
    />
  );
};
