import React, { useState } from 'react';
import { Select } from 'antd';
import { classNames } from '../../utilities';
// import { classNames } from 'src/utilities';

export const SelectHover = ({
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
  dropdownId, // New prop for dropdown id
}) => {
  const [visible, setVisible] = useState(false);
  let hideTimeout = null;

  const handleMouseEnter = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }
    setVisible(true);
  };

  const handleMouseLeave = () => {
    hideTimeout = setTimeout(() => {
      setVisible(false);
    }, 100);
  };

  return (
    <div
      className="w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Select
        open={visible}
        id={id}
        name={name}
        disabled={disabled}
        style={{ WebkitTextFillColor: '#000' }}
        bordered={false}
        placeholder={placeholder}
        className={classNames(
          'border-none bg-white rounded-xl py-1  outline-none w-full',
          inputClassName ? inputClassName : ''
        )}
        options={options.map(option => ({
          ...option,
          id: "optionsIds",
        }))}
        popupClassName={popupClassName}
        onChange={onChange ? onChange : () => null}
        value={value}
        showSearch
        filterOption={filterOption}
        mode={mode}
        dropdownRender={(menu) => (
          <div id={dropdownId}>
            {menu}
          </div>
        )}
      />
    </div>
  );
};
