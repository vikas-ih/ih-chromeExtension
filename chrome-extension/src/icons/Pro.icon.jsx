import { Tooltip } from "antd";
import { classNames } from "../utilities";
// import { useSelector } from 'react-redux';

export const ProIconSvg = ({
  className,
  onClick,
  fill = "#FFE082",
  size = 15,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      className={classNames("iconify iconify--fxemoji", className)}
      preserveAspectRatio="xMidYMid meet"
      onClick={onClick}
    >
      <path
        fill={fill}
        d="M459.866 218.346l-186.7.701c-4.619.017-7.618-4.861-5.517-8.975L370.845 8.024c3.103-6.075-4.493-11.949-9.592-7.417L39.948 286.141c-4.221 3.751-1.602 10.732 4.045 10.78l170.444 1.457c4.443.038 7.391 4.619 5.583 8.679L133.317 501.73c-2.688 6.035 4.709 11.501 9.689 7.16l320.937-279.725c4.307-3.753 1.637-10.84-4.077-10.819z"
      ></path>
    </svg>
  );
};

export const ProIcon = ({
  fill = "#FFE082",
  className,
  onClick,
  forceFlashIcon = false,
}) => {
  const { currentPractitionerEntitlements } = useSelector(
    (state) => state?.practitionerState
  );
  const isAuraProTrial = currentPractitionerEntitlements?.plans?.some(
    (plan) => plan?.metadata?.trial === true
  );
  if (!isAuraProTrial && !forceFlashIcon) {
    return null;
  }
  return (
    <Tooltip title="This is a Pro feature">
      <ProIconSvg className={className} onClick={onClick} fill={fill} />
    </Tooltip>
  );
};