import {
  Modal,
  Button as AntButton,
  Checkbox,
  Radio,
  Switch,
  Button,
} from "antd";
import { Field, FieldArray, Form, Formik } from "formik";
import React, { Fragment } from "react";
import { object } from "yup";
// import { DatePicker, DateTimePicker, Text } from ".";
import { SingleSelect } from "./SIngleSelect";
import { PatternFormat } from "react-number-format";
import TextArea from "antd/es/input/TextArea";
import { classNames } from "../../utilities";
import { TreeSelectDropdown } from "./TreeSelect";
import { BellIcon, CloseIcon } from "../../icons";
// import { DownArrowIcon } from "src/icons/Downarrow.icon";
import { Bars } from "react-loader-spinner";
// import { AppointmentType } from "src/components/baseComponents/AppointmentType";
import { isEmpty } from "lodash";
import { DownArrowIcon } from "../../icons/Downarrow.icon";
import { AppointmentType } from "./AppointmentType";
import { Text } from "./Text";

const vSchema = object({});
export const ModalComponent = ({
  open,
  sections, // Array of sections with headings and fields
  validationSchema = vSchema,
  initialValues,
  className,
  submitButtonText = "Ok",
  cancelButtonText = "Cancel",
  handleCancel = () => null,
  handleSubmit,
  customBody,
  additionalBody,
  loading,
  centered,
  disableSubmit,
  handleRadioButton,
  followUpFlag,
  appointmentTypes,
  emailInfoVisible,
  closable,
  setEmailInfoVisible,
  updatedEmailsArray,
  handleRemoveEmail,
  getConditionsbyType,
  practitionerEmailTag,
  setShowExistingFlag,
  submitLoading,
}) => {
  const nameOptions = [
    { value: "Hours", name: "Hours" },
    { value: "Days", name: "Days" },
    { value: "Weeks", name: "Weeks" },
  ];

  const allAppointmentTypes = !isEmpty(appointmentTypes)
    ? [...appointmentTypes]
    : [];

  return (
    <Formik
      initialValues={initialValues || {}}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ errors, touched, resetForm, setFieldValue, values }) => (
        <Modal
          mask={true}
          open={open}
          onCancel={handleCancel}
          closable={closable}
          afterClose={() => resetForm()}
          className={classNames(`custom-modal`, className ? className : "")}
          centered={centered}
          footer={null}
          maskClosable={false}
        >
          <div className="modal_background">
            <Form autoComplete="off">
              {sections?.map((section, index) => (
                <div className="modal__header" key={`section-${index}`}>
                  <div className="modal__header mb-3">
                    {section.heading === "radio_group" ? (
                      <>
                        <div className="">Add Appointments</div>
                        {followUpFlag && (
                          <div className="flex items-center mt-2">
                            <span className="font-change">
                              Appointment Type
                            </span>
                            <span className="ml-3">
                              <Radio.Group
                                onChange={(e) => {
                                  setFieldValue("condition_id", null);
                                  setFieldValue("first_name", "");
                                  setFieldValue("last_name", "");
                                  setFieldValue("gender", null);
                                  setFieldValue("phone_text", null);
                                  setFieldValue("email_text", "");
                                  setFieldValue("birth_date", null);
                                  setFieldValue("search_patient_name", null);
                                  setShowExistingFlag(false);
                                  handleRadioButton(e);
                                }}
                                defaultValue={1}
                              >
                                {appointmentTypes.map((item) => (
                                  <AppointmentType
                                    key={item.value}
                                    item={item}
                                    appointmentTypes={allAppointmentTypes}
                                  />
                                ))}
                              </Radio.Group>
                            </span>
                          </div>
                        )}
                      </>
                    ) : section.heading === "provider_emails" ? (
                      <>
                        {followUpFlag && (
                          <>
                            <div className="flex items-center">
                              <span className="mr-2">
                                Provider Notification Emails
                              </span>

                              <DownArrowIcon
                                className={`arrow-icon-rotate ${
                                  emailInfoVisible ? "open" : ""
                                }`}
                                onClick={() =>
                                  setEmailInfoVisible(!emailInfoVisible)
                                }
                              />
                            </div>
                            <div
                              className={`Dropdownemail ${
                                emailInfoVisible
                                  ? "grid grid-cols-1 gap-2"
                                  : "hidden"
                              }`}
                            >
                              {practitionerEmailTag && (
                                <div className="physician-Emails mx-1">
                                  {getConditionsbyType?.practitioner_emails}
                                </div>
                              )}
                              <div className="practitioner_emails">
                                {updatedEmailsArray?.length > 0 &&
                                  updatedEmailsArray.map((email, index) => (
                                    <div key={index} className="email-item">
                                      {email}
                                      <button
                                        type="cancel"
                                        className="remove-email-button ml-3"
                                        onClick={(event) =>
                                          handleRemoveEmail(event, index)
                                        }
                                      >
                                        ✖
                                      </button>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      section.heading
                    )}
                  </div>
                  <div className="modal____body">
                    {customBody ? (
                      customBody
                    ) : (
                      <div className={section.className}>
                        {section.fields.map(
                          (
                            {
                              type,
                              name,
                              title,
                              helperTitle,
                              options,
                              placeholder,
                              onChange,
                              dataIndex,
                              dataField,
                              dataKey,
                              onValueChange,
                              onKeyDown,
                              disabled,
                              disableDate,
                              disableTime,
                              className,
                              dropdownArrow,
                              disabledDate,
                              onClick,
                              placement,
                              extraIcon,
                              action,
                              ...props
                            },
                            fieldIndex
                          ) => (
                            <Fragment key={`${name}-${fieldIndex}`}>
                              <div
                                className={`${className} modal__form-el`}
                                key={name}
                              >
                                <Text
                                  type="p"
                                  className={`modal__form-el-label mb-2 ${
                                    touched[name] && errors[name] ? "error" : ""
                                  }`}
                                >
                                  {title}
                                </Text>

                                {type === "datepicker" ? (
                                  <DatePicker
                                    name={name}
                                    disabledDate={disabledDate}
                                    placement={placement}
                                    className={className}
                                    placeholder={placeholder}
                                  />
                                ) : type === "switch" ? (
                                  <Text
                                    type="label"
                                    className="modal__form-el-label mb-2"
                                  >
                                    {helperTitle}
                                    <Switch
                                      className="mx-3"
                                      key={name}
                                      defaultChecked={false}
                                      style={{
                                        backgroundColor: "#00000040",
                                      }}
                                      onChange={(checked) => {
                                        setFieldValue(name, checked);
                                      }}
                                    />
                                  </Text>
                                ) : type === "datetimepicker" ? (
                                  <DateTimePicker
                                    name={name}
                                    disableDate={disableDate}
                                    disableTime={disableTime}
                                    format="MM-DD-YYYY h:mm a"
                                  />
                                ) : type === "select" ? (
                                  <SingleSelect
                                    name={name}
                                    options={options}
                                    placeholder={placeholder}
                                    disabled={disabled}
                                    className={`single-select ${
                                      touched[name] && errors[name]
                                        ? "error"
                                        : ""
                                    }`}
                                    popupClassName={props?.popupClassName}
                                    onChange={
                                      onChange
                                        ? (value, option) => {
                                            onChange(
                                              value,
                                              option,
                                              setFieldValue
                                            );
                                          }
                                        : () => null
                                    }
                                    value={values[name]}
                                    dropdownArrow={dropdownArrow}
                                    error={touched[name] && errors[name]}
                                    extraIcon={extraIcon}
                                  />
                                ) : type === "treeSelect" ? (
                                  <TreeSelectDropdown
                                    name={name}
                                    options={options}
                                    placeholder={placeholder}
                                    disabled={false}
                                    className={`single-select ${
                                      touched[name] && errors[name]
                                        ? "error"
                                        : ""
                                    }`}
                                    popupClassName={props?.popupClassName}
                                    onChange={onChange}
                                    value={values[name]}
                                  />
                                ) : type === "label" ? (
                                  <div className="modal__form-el">
                                    <Text className={``}>{title}</Text>
                                  </div>
                                ) : type === "radio" ? (
                                  <div>
                                    {options.map((option) => (
                                      <label
                                        key={option.value}
                                        className="modal__form-el-radio"
                                      >
                                        <Field
                                          type="radio"
                                          name={name}
                                          value={option.value}
                                        />
                                        {option.label}
                                      </label>
                                    ))}
                                  </div>
                                ) : type === "phonenumber_text" ? (
                                  <PatternFormat
                                    className={`modal__form-el-field ${
                                      touched[name] && errors[name]
                                        ? "error"
                                        : ""
                                    }`}
                                    key={name}
                                    type={type}
                                    name={name}
                                    disabled={disabled}
                                    placeholder={placeholder}
                                    {...props}
                                    format="(###) ###-####"
                                    allowEmptyFormatting={false}
                                    value={values[name] || ""}
                                    onValueChange={(values) => {
                                      setFieldValue(name, values.value);
                                    }}
                                    autoComplete="off"
                                    role="presentation"
                                  />
                                ) : type === "dobText" ? (
                                  <PatternFormat
                                    className={`modal__form-el-field ${
                                      touched[name] && errors[name]
                                        ? "error"
                                        : ""
                                    }`}
                                    key={name}
                                    type={type}
                                    name={name}
                                    disabled={disabled}
                                    placeholder={placeholder}
                                    {...props}
                                    format="##-##-####"
                                    allowEmptyFormatting={false}
                                    value={values[name] || ""}
                                    onValueChange={(values) => {
                                      setFieldValue(name, values.value);
                                    }}
                                    autoComplete="off"
                                    role="presentation"
                                  />
                                ) : type === "fieldArray" ? (
                                  <div className="flex flex-row">
                                    <FieldArray name="notifications">
                                      {({ insert, remove, push }) => (
                                        <div className=" ">
                                          {values.notifications?.length > 0 &&
                                            values.notifications.map(
                                              (notification, index) => (
                                                <div className="" key={index}>
                                                  <div className="flex mt-2 gap-x-4 items-center">
                                                    <div className="">
                                                      <BellIcon
                                                        className={"bell-icon"}
                                                      />
                                                    </div>
                                                    <div className="edit-modal-text flex  w-32">
                                                      {index === 0
                                                        ? "Default Reminder"
                                                        : `Reminder ${
                                                            index + 1
                                                          }`}
                                                    </div>
                                                    <Field
                                                      className={`modal__form-el-select $`}
                                                      name={`notifications.${index}.number_of`}
                                                      placeholder="Number"
                                                      type="number"
                                                      min="1"
                                                      value={
                                                        notification.number_of
                                                      }
                                                    />
                                                    <div className="">
                                                      <SingleSelect
                                                        name={`notifications.${index}.duration`}
                                                        className={`single-select-notification`}
                                                        options={nameOptions}
                                                        placeholder="Duration"
                                                        value={
                                                          notification.duration
                                                        }
                                                      />
                                                    </div>
                                                    <div className="">
                                                      {index !== 0 && (
                                                        <CloseIcon
                                                          className={
                                                            "bell-icon"
                                                          }
                                                          onClick={() =>
                                                            remove(index)
                                                          }
                                                        />
                                                      )}
                                                    </div>
                                                    {index ===
                                                      values.notifications
                                                        .length -
                                                        1 && (
                                                      <div className="">
                                                        <button
                                                          className="add-notification-button"
                                                          onClick={() =>
                                                            push({
                                                              preference: "",
                                                              duration: "",
                                                              number_of: "",
                                                            })
                                                          }
                                                        >
                                                          Add Notification
                                                        </button>
                                                      </div>
                                                    )}
                                                  </div>
                                                </div>
                                              )
                                            )}
                                        </div>
                                      )}
                                    </FieldArray>
                                  </div>
                                ) : type === "checkBox" ? (
                                  <div
                                    className={`${className} modal__form-el`}
                                    key={name}
                                  >
                                    <Text
                                      type="label"
                                      className="modal__form-el-label mb-2"
                                    >
                                      <Checkbox
                                        className="mr-3"
                                        key={name}
                                        type={type}
                                        disabled={disabled}
                                        name={name}
                                        onChange={(e) => {
                                          e.target.checked
                                            ? setFieldValue(name, true)
                                            : setFieldValue(name, false);
                                        }}
                                        checked={values[name]}
                                      />
                                      {helperTitle}
                                    </Text>
                                    {touched[name] && errors[name] && (
                                      <Text
                                        type={"error"}
                                        className={"error mt-2"}
                                      >
                                        {errors[name]}
                                      </Text>
                                    )}
                                  </div>
                                ) : type === "textarea" ? (
                                  <TextArea
                                    className="modal__form-el-field-textarea"
                                    name={name}
                                    placeholder={placeholder}
                                    value={values[name]}
                                    onChange={(e) =>
                                      setFieldValue(name, e.target.value)
                                    }
                                    style={{
                                      resize: "none",
                                    }}
                                  />
                                ) : type === "text" ? (
                                  <Field
                                    className={`modal__form-el-field ${
                                      touched[name] && errors[name]
                                        ? "error"
                                        : ""
                                    }`}
                                    key={name}
                                    name={name}
                                    disabled={disabled}
                                    placeholder={placeholder}
                                    value={values[name]}
                                    role="presentation"
                                    autoComplete="off"
                                  />
                                ) : type === "providerEmails" ? (
                                  <Field
                                    className={`modal__form-el-field ${
                                      touched[name] && errors[name]
                                        ? "error"
                                        : ""
                                    }`}
                                    key={name}
                                    name={name}
                                    disabled={disabled}
                                    placeholder={placeholder}
                                    value={values[name] || null}
                                    role="presentation"
                                    autoComplete="off"
                                    onChange={onChange}
                                    onKeyDown={onKeyDown}
                                  />
                                ) : (
                                  <Field
                                    className={`modal__form-el-field ${
                                      touched[name] && errors[name]
                                        ? "error"
                                        : ""
                                    }`}
                                    key={name}
                                    type={type}
                                    name={name}
                                    disabled={disabled}
                                    placeholder={placeholder}
                                    {...props}
                                    value={values[name] || null}
                                    role="presentation"
                                    autoComplete="off"
                                  />
                                )}

                                {touched[name] && errors[name] && (
                                  <Text type={"error"} className={"error"}>
                                    {errors[name]}
                                  </Text>
                                )}
                              </div>
                            </Fragment>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {additionalBody ? additionalBody : ""}
              <div className="flex justify-end gap-5  modal__form-footer">
                {cancelButtonText && (
                  <div className="">
                    <Button
                      loading={loading}
                      className="cancel-button"
                      onClick={() => handleCancel()}
                    >
                      {cancelButtonText}
                    </Button>
                  </div>
                )}
                {submitButtonText && (
                  <div className="inline-block">
                    <Button
                      className="submit-button"
                      htmlType="submit"
                      loading={loading}
                      disabled={submitLoading}
                    >
                      {!submitLoading ? (
                        submitButtonText
                      ) : (
                        <Bars
                          height="25"
                          width="25"
                          color="#ffffff"
                          ariaLabel="bars-loading"
                          wrapperStyle={{}}
                          wrapperClass=" justify-center"
                          visible={true}
                        />
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </Form>
          </div>
        </Modal>
      )}
    </Formik>
  );
};
