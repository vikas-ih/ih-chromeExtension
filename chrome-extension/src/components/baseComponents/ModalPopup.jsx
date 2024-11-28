import React, { useEffect, useState, useMemo } from 'react';
import './ModalPopup.scss';
import CustomDropdown from './CustomDropdown';
// import { storeInLocal } from 'src/lib/storage';
import { SwapRightOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { CalendarIcon, CalendarRangeIcon } from "../../icons";
import { storeInLocal } from '../../lib/storage';

const ModalPopup = ({
  currentDate,
  handleMonthChange,
  handleYearChange,
  renderCalendar,
  onChangeHandler,
  isfilterOn,
  dateValue,
  setFilterValue,
  filterValue,
  resetDateFilter,
  setResetDateFilter,
  selectDates,
  setSelectDates,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setSelectedFilters,
  selectedFilters,
}) => {
  const isMobile = window.innerWidth < 1260;
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { currentPractitioner } = useSelector(
    (state) => state?.practitionerState
  );
  const monthNames = useMemo(
    () => [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    []
  );

  const formatDate = (date) => {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${date?.getDate()} ${monthNames[date?.getMonth()]}`;
  };

  const handleDateRangeSelect = (startDate, endDate) => {
    setSelectDates([startDate, endDate]);
    setSelectedFilters('');
    if (startDate && endDate) {
      const formattedDateRange = `${formatDate(startDate)} - ${formatDate(endDate)}`;
      setSelectedFilters(formattedDateRange);
      onChangeHandler(null, 'dateRange', [startDate, endDate]);
      setDropdownVisible(false);
      localStorage.setItem(
        `${currentPractitioner?.org_uuid}_selectedFilters`,
        formattedDateRange
      );
      localStorage.setItem(
        `${currentPractitioner?.org_uuid}_startDate`,
        formatDate(startDate)
      );
      localStorage.setItem(
        `${currentPractitioner?.org_uuid}_endDate`,
        formatDate(endDate)
      );
    } else if (startDate) {
      localStorage.setItem(
        `${currentPractitioner?.org_uuid}_startDate`,
        formatDate(startDate)
      );
      localStorage.removeItem(`${currentPractitioner?.org_uuid}_endDate`);
      setEndDate('');
      setDropdownVisible(true);
    }
    localStorage.setItem(
      `${currentPractitioner?.org_uuid}_selectDates`,
      JSON.stringify([startDate, endDate])
    );
  };

  const handleDateFilter = (value) => {
    setFilterValue({
      ...filterValue,
      startDate: '',
      endDate: '',
      datefilter: value,
    });
    setSelectDates([null, null]);
    localStorage.removeItem(`${currentPractitioner?.org_uuid}_startDate`);
    localStorage.removeItem(`${currentPractitioner?.org_uuid}_endDate`);
    setSelectedFilters(value);
    onChangeHandler(value, 'datefilter', value);
    setDropdownVisible(false);
    localStorage.setItem(
      `${currentPractitioner?.org_uuid}_selectedFilters`,
      value
    );
    localStorage.removeItem(`${currentPractitioner?.org_uuid}_selectDates`);
    if (selectedFilters) {
      localStorage.removeItem(`${currentPractitioner?.org_uuid}_startDate`);
      localStorage.removeItem(`${currentPractitioner?.org_uuid}_endDate`);
    }
  };

  useEffect(() => {
    const storedDates = localStorage.getItem(
      `${currentPractitioner?.org_uuid}_selectDates`
    );
    const storedFilters = localStorage.getItem(
      `${currentPractitioner?.org_uuid}_selectedFilters`
    );

    if (storedDates) {
      try {
        const parsedDates = JSON.parse(storedDates);
        setSelectDates(parsedDates);
      } catch (error) {
        console.error('Error parsing stored dates:', error);
      }
    } else if (storedFilters) {
      setSelectedFilters(storedFilters);
      localStorage.setItem(
        `${currentPractitioner?.org_uuid}_selectedFilters`,
        storedFilters
      );
    } else {
      setSelectedFilters('Today');
      localStorage.setItem(
        `${currentPractitioner?.org_uuid}_selectedFilters`,
        'Today'
      );
    }
  }, []);

  useEffect(() => {
    if (!isfilterOn) {
      setSelectedFilters('Today');
      setSelectDates([null, null]);
    }
  }, [isfilterOn]);

  useEffect(() => {
    if (resetDateFilter) {
      setSelectedFilters('Today');
      setResetDateFilter(false);
      localStorage.removeItem(`${currentPractitioner?.org_uuid}_startDate`);
      localStorage.removeItem(`${currentPractitioner?.org_uuid}_endDate`);
    }
  }, [resetDateFilter, setResetDateFilter]);

  const currentMonth = useMemo(() => {
    const month = new Date(currentDate);
    month.setMonth(month.getMonth());
    return month;
  }, [currentDate]);

  const nextMonth = useMemo(() => {
    const month = new Date(currentDate);
    month.setMonth(month.getMonth() + 1);
    return month;
  }, [currentDate]);

  const handlePrevMonthClick = (e) => {
    e.preventDefault();
    handleMonthChange(-1);
  };

  const handleNextMonthClick = (e) => {
    e.preventDefault();
    handleMonthChange(1);
  };

  const handlePrevYearClick = (e) => {
    e.preventDefault();
    handleYearChange(-1);
  };

  const handleNextYearClick = (e) => {
    e.preventDefault();
    handleYearChange(1);
  };

  const filterButtons = useMemo(
    () => [
      'Today',
      'Tomorrow',
      'Next 7 days',
      'Yesterday',
      'Past 7 days',
      'All time',
    ],
    []
  );

  useEffect(() => {
    if (dateValue) {
      storeInLocal(`${currentPractitioner?.org_uuid}_dateValue`, dateValue);
    }
  }, [dateValue]);

  const menu = useMemo(
    () => (
      <div className="custom-date-range-picker">
        <div className="buttons">
          <div className="button-row">
            {filterButtons.map((filter) => (
              <button
                type="button"
                key={filter}
                onClick={() => handleDateFilter(filter)}
                className={
                  localStorage.getItem(
                    `${currentPractitioner?.org_uuid}_selectedFilters`
                  ) &&
                  localStorage.getItem(
                    `${currentPractitioner?.org_uuid}_selectedFilters`
                  ) === filter
                    ? 'selected'
                    : ''
                }
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className={isMobile ? 'px-5' : 'px-14'}>
          <div
            className={`${isMobile ? 'w-full' : 'w-4/12'} py-3 px-3 outline-1 outline-[#00d091] font-sans h-15 flex items-center rounded-xl outline-none`}
          >
            <input
              type="text"
              className="w-20 outline-none"
              placeholder="Start date"
              value={
                localStorage.getItem(
                  `${currentPractitioner?.org_uuid}_startDate`
                )
                  ? localStorage.getItem(
                      `${currentPractitioner?.org_uuid}_startDate`
                    )
                  : 'Start date'
              }
              readOnly
            />
            <div className="mr-2">
              <SwapRightOutlined />
            </div>
            <input
              type="text"
              className="w-20 outline-none"
              placeholder="End date"
              value={
                localStorage.getItem(`${currentPractitioner?.org_uuid}_endDate`)
                  ? localStorage.getItem(
                      `${currentPractitioner?.org_uuid}_endDate`
                    )
                  : 'End date'
              }
              readOnly
            />
            <div className="mr-2">
              <CalendarRangeIcon />
            </div>
          </div>
        </div>
        <div className="calendars">
          <div className="calendar top-calendar">
            <div className="month-year">
              <div className="btn-first">
                <button type="button" onClick={handlePrevYearClick}>
                  &lt;&lt;
                </button>
                <button type="button" onClick={handlePrevMonthClick}>
                  &lt;
                </button>
              </div>
              <span>
                {monthNames[currentMonth.getMonth()]}{' '}
                {currentMonth.getFullYear()}
              </span>
            </div>
            <div className="mt-4">
              {renderCalendar(currentMonth, handleDateRangeSelect, selectDates)}
            </div>
          </div>
          <div className="calendar bottom-calendar">
            <div className="secmonth-year">
              <span>
                {monthNames[nextMonth.getMonth()]} {nextMonth.getFullYear()}
              </span>
              <div className="btn-datefilter">
                <button type="button" onClick={handleNextMonthClick}>
                  &gt;
                </button>
                <button type="button" onClick={handleNextYearClick}>
                  &gt;&gt;
                </button>
              </div>
            </div>
            <div className="mt-4">
              {renderCalendar(nextMonth, handleDateRangeSelect, selectDates)}
            </div>
          </div>
        </div>
      </div>
    ),
    [
      selectedFilters,
      currentDate,
      selectDates,
      handleDateFilter,
      handlePrevYearClick,
      handlePrevMonthClick,
      handleNextMonthClick,
      handleNextYearClick,
      monthNames,
      currentMonth,
      nextMonth,
      renderCalendar,
      handleDateRangeSelect,
    ]
  );

  let hideTimeout = null;

  const handleMouseEnter = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    hideTimeout = setTimeout(() => {
      setDropdownVisible(false);
    }, 250);
  };

  return (
    <div
      className="h-10 rounded-xl cursor-pointer mr-2 bg-white drop-shadow-sm flex items-center tree-dropdown"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CustomDropdown
        overlay={menu}
        visible={dropdownVisible}
        onVisibleChange={setDropdownVisible}
      >
        <button
          type="button"
          className="ml-1 flex items-center whitespace-nowrap"
        >
          <div className="Calendericon">
            <CalendarIcon
              className={
                dateValue === 'Custom' ? 'text-black' : 'mr-2 text-black'
              }
            />
          </div>
          <div className="mt-1 text-xs" id="DateFilter">
            {localStorage.getItem(
              `${currentPractitioner?.org_uuid}_selectedFilters`
            )
              ? localStorage.getItem(
                  `${currentPractitioner?.org_uuid}_selectedFilters`
                )
              : 'Today'}
          </div>
        </button>
      </CustomDropdown>
    </div>
  );
};

export default ModalPopup;
