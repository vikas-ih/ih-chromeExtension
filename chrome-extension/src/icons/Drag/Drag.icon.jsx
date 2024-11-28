import React, { useState } from 'react';
import { classNames } from '../../utilities';
import './Drag.scss';

export const DragIcon = ({ fill = '#516F90', id, className, onClick }) => {
  const [tooltip, setTooltip] = useState('Drag Me');

  const handleMouseEnter = () => {
    setTooltip('Drag to resize');
  };

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleMouseMove = debounce((event) => {
    const cursorStyle = window
      .getComputedStyle(event.target)
      .getPropertyValue('cursor');
    if (cursorStyle.includes('grab') || cursorStyle.includes('all-scroll')) {
      setTooltip('Grabbing Cursor');
    } else {
      setTooltip('Drag to resize');
    }
  }, 50);

  return (
    <div
      className="flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      title={tooltip}
    >
      <svg
        className={classNames(
          'fixed drag-me cursor-height',
          className ? className : ''
        )}
        onClick={onClick ? onClick : () => null}
        xmlns="http://www.w3.org/2000/svg"
        height="32"
        viewBox="0 -920 980 990"
        width="32"
        fill="#808080"
      ></svg>
    </div>
  );
};
