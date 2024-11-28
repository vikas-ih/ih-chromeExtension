import "../../style/_button.scss";

const ButtonGroup = ({
  options = [],
  value,
  onChange,
  wrap = true,
  className,
}) => {
  return (
    <div
      className={["button-group", wrap && "wrap", className]
        .filter(Boolean)
        .join(" ")}
    >
      {options.map((option, index) => (
        <button
          className={value === option.value ? "selected" : ""}
          key={index}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export { ButtonGroup };
