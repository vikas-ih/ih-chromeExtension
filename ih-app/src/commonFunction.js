// import moment from 'moment';
// import { AURA_ONLY_APPOINTMENT_TYPE } from './constants';

export const classNames = (...classes) => {
  return classes.join(' ').split(/\s+/).filter(Boolean).join(' ');
};

// export const profileName = (name) => {
//   let result = '';
//   let processedName = name ? name.split(' ') : 'NA';
//   processedName.length < 2
//     ? (result = processedName[0].charAt(0))
//     : (result = processedName[0].charAt(0) + processedName[1].charAt(0));
//   return result.toUpperCase();
// };

// export const getAppointmentAllStartDateFilter = (startDate) => {
//   return startDate
//     ? startDate
//     : startDate === ''
//       ? ''
//       : moment().subtract(10, 'years').format('YYYY-MM-DD');
// };

// export const getAppointmentAllEndDateFilter = (endDate) => {
//   return endDate
//     ? endDate
//     : endDate === ''
//       ? ''
//       : moment().add(10, 'years').format('YYYY-MM-DD');
// };

// export const isAuraOnlyAppointmentType = (
//   appointmentTypeId,
//   appointmentTypes = []
// ) => {
//   let isAuraOnlyAppointment = false;

//   for (let index = 0; index < appointmentTypes.length; index++) {
//     if (
//       appointmentTypes[index].label === AURA_ONLY_APPOINTMENT_TYPE &&
//       appointmentTypes[index].value === appointmentTypeId
//     ) {
//       isAuraOnlyAppointment = true;
//       break;
//     }
//   }

//   return isAuraOnlyAppointment;
// };
