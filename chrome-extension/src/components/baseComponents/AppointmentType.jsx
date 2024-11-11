import { Radio } from "antd";
import { FollowUpIcon, IntakeIcon, AmbientAiIcon } from "../../icons";
import { isAuraOnlyAppointmentType } from "../../utilities/commonFunction";

export const AppointmentType = ({ item, appointmentTypes }) => {
  const isAuraAppointmentType = isAuraOnlyAppointmentType(
    item.value,
    appointmentTypes
  );

  const radioIconType = () => {
    if (item.value === 1) {
      return "IntakeIcon";
    } else if (isAuraAppointmentType) {
      return "AmbientAiIcon";
    }
    return "FollowUpIcon";
  };

  const iconClassName = () => {
    if (item.value === 1) {
      return "intake-radio-outlook";
    } else if (isAuraAppointmentType) {
      return "auraonly-radio-outlook";
    }
    return "followup-radio-outlook";
  };

  const renderIconToShow = () => {
    if (item.value === 1) {
      return <IntakeIcon />;
    } else if (isAuraAppointmentType) {
      return <AmbientAiIcon />;
    }
    return <FollowUpIcon />;
  };

  if (item.label === "Non-VCA") {
    return null;
  }

  return (
    <Radio key={item.value} value={item.value} className={radioIconType()}>
      <div className={`flex ${iconClassName()}`}>
        <span className="mx-1 mt-1">{renderIconToShow()}</span>
        <span className="mx-1">{item.label}</span>
      </div>
    </Radio>
  );
};
