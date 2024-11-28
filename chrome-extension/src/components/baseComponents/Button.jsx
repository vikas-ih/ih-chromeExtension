import React, { useState } from 'react';
import { classNames } from '../../utilities';

export const Button = ({
  type,
  id,
  isActive,
  name = 'button_component',
  children,
  handleClick,
  className,
  onClick,
  disabled,
  initialActive = false,
}) => {
  const renderButton = () => {
    switch (type) {
      case 'button':
        return (
          <button
            type="button"
            id={id}
            name={name}
            className={classNames(
              'bg-[#00D090] hover:bg-[#059669] flex items-center justify-center text-white font-normal p-2 py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline',
              className ? className : ''
            )}
            onClick={onClick ? onClick : () => null}
            disabled={disabled}
          >
            {children}
          </button>
        );
      case 'submit':
        return (
          <button
            type="submit"
            id={id}
            name={name}
            className={`
        font-normal py-2 px-3 rounded-xl focus:outline-none focus:shadow-outline ring-1 ring-[#E5E8EB]
        ${
          isActive
            ? 'bg-[#00D090] hover:bg-[#059669] text-white'
            : 'bg-white text-gray-700'
        }
      `}
            onClick={() => handleClick(id)}
          >
            {children}
          </button>
        );
      case 'icon':
        return (
          <button
            type="icon"
            id={id}
            name={name}
            className={classNames('', className ? className : '')}
          >
            {children}
          </button>
        );
      // case 'buttonDropdown':
      //     return (
      //         <button
      //             type="button"
      //             id={id}
      //             name={name}
      //             className={classNames('dropdown-button', className ? className : '')}
      //             onClick={onClick ? onClick : () => null}
      //         >

      //             <span className="dropdown-text"> {children}</span>
      //             <span className="line"></span>
      //             <Dropdown fill='#fff' className="dropdown-icon-button" />

      //         </button>
      //     )
      case 'cancel':
        return (
          <button
            id={id}
            name={name}
            type="cancel"
            className={classNames(
              'bg-red-500 hover:bg-red-400 text-white font-normal p-2 py-3 px-5 rounded-xl focus:outline-none focus:shadow-outline',
              className ? className : ''
            )}
            onClick={onClick ? onClick : () => null}
          >
            {children}
          </button>
        );
      default:
        break;
    }
  };
  return <>{renderButton()}</>;
};
