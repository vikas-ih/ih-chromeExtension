// import { LoaderIcon } from 'src/icons';
import { LoaderIcon } from '../../icons';
import { classNames } from '../../utilities';

export const Button = ({
  type,
  children,
  id,
  name,
  className,
  isLoading,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      type={type}
      id={id}
      name={name}
      className={classNames(
        'btn text-[#fff]',
        className ? className : '',
        disabled || isLoading ? `disabled-${name}-btn` : ''
      )}
      disabled={disabled || isLoading ? true : false}
      onClick={onClick}
    >
      {isLoading ? <LoaderIcon className={'w-[20px] h-[20px]'} /> : children}
    </button>
  );
};
