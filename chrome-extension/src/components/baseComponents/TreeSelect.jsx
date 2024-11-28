import React, { useState } from "react";
import { TreeSelect } from "antd";
import { Text } from ".";

export const TreeSelectDropdown = ({
  name,
  label,
  disabled,
  placeholder,
  options,
  value,
  onChange,
  className,
  popupClassName,
  suffixIcon,
}) => {
  const renderTreeNodes = (data, parentKey = "") =>
    data.map((item, index) => {
      const nodeKey =
        item.value !== null && item.value !== undefined
          ? String(item.value)
          : `${parentKey}_${index}_null`;

      const className = `p-2 ${item.className}`;

      if (item.children) {
        return (
          <TreeSelect.TreeNode
            key={nodeKey}
            value={item.value}
            title={<span className={className}>{item.title}</span>}
            disabled={item.value}
            className={className}
          >
            {renderTreeNodes(item.children, nodeKey)}
          </TreeSelect.TreeNode>
        );
      }

      return (
        <TreeSelect.TreeNode
          key={nodeKey}
          value={item.value}
          title={<span className={className}>{item.title}</span>}
          className={className}
        />
      );
    });
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
    }, 250);
  };
  return (
    <div
      className="w-full custom-select-component"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {label && (
        <Text type={"label"} htmlFor={name}>
          {label}
        </Text>
      )}
      <TreeSelect
        open={visible}
        id={name}
        bordered={false}
        suffixIcon={suffixIcon}
        showSearch={false}
        disabled={disabled}
        style={{ width: "100%" }}
        placeholder={placeholder}
        className={className || "single-select"}
        popupClassName={popupClassName || "single-select__dropdown"}
        // filterTreeNode={(input, option) =>
        //     option.label.toLowerCase().includes(input.toLowerCase())
        // }
        treeDefaultExpandAll={false}
        dropdownStyle={{
          minWidth: "fit-content",
          zIndex: 999999999,
          padding: "10px 9px 4px 4px",
        }}
        value={value}
        onChange={(selectedValue, option) => {
          if (onChange) {
            onChange(selectedValue, option);
          }
        }}
      >
        {renderTreeNodes(options)}
      </TreeSelect>
    </div>
  );
};
