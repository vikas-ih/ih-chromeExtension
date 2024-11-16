import React, { useState, useEffect } from 'react';
import { Table as AntTable } from 'antd';
// import { classNames } from 'src/utilities';
import { Bars } from 'react-loader-spinner';
import { classNames } from '../../utilities';

export const Table = ({
  className,
  rowClassName,
  columns,
  rowKey,
  data,
  loading,
  onRowClick,
  additionalPatientInfo,
  handleReset = null,
  remainderPatientAppts = null,
}) => {
  const [dataSource, setDataSource] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);

  // Set Data
  useEffect(() => {
    setDataSource(data);
  }, [data]);

  // Add Actions and Icon
  useEffect(() => {
    setTableColumns([...columns]);
  }, [columns]);

  const isMobileView = window.innerWidth <= 1260;

  return (
    <div className={classNames('table', className ? className : '')}>
      <AntTable
        columns={tableColumns}
        rowKey={rowKey}
        rowClassName={rowClassName}
        sortDirections={['ascend', 'descend', 'ascend']}
        showSorterTooltip={false}
        dataSource={dataSource}
        showHeader={isMobileView ? false : true}
        loading={{
          indicator: (
            <>
              <div className="absolute inset-60 grid place-items-center">
                <Bars
                  height="25"
                  width="25"
                  color="#00D090"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass="pt-1 sm:pt-2 flex justify-center items-center"
                  visible={true}
                />
              </div>
            </>
          ),
          spinning: loading,
        }}
        pagination={false}
        locale={{
          emptyText: 'No Data',
        }}
        onChange={() => null}
        onRow={onRowClick ? onRowClick : () => null}
      />
      {additionalPatientInfo && (
        <div className="text-center mt-4">
          {remainderPatientAppts}{' '}
          {remainderPatientAppts === 1 ? 'appointment' : 'appointments'} hidden
          with filters.
          <span
            id="clear_filter_patientSearch"
            onClick={() => handleReset('patientReset')}
            className="text-[#00d090] cursor-pointer hover:underline ml-1"
          >
            Clear filters
          </span>
        </div>
      )}
    </div>
  );
};
