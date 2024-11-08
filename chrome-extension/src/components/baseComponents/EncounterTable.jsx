import React, { useState, useEffect } from "react";
import { Table as AntTable } from "antd";
import { classNames } from "src/utilities";

export const EncounterTable = ({
  className,
  rowClassName,
  ClassName,
  columns,
  rowKey,
  data,
  loading,
  onRowClick,
  onRow,
  dataSource,
  pagination,
  onCreateEncounter,
  setSearchFilters,
  setStartDate,
  setEndDate,
}) => {
  const [tableColumns, setTableColumns] = useState([]);

  useEffect(() => {
    // Here you can set the width for each column
    const modifiedColumns = columns.map((column) => ({
      ...column,
      width: 2000, // Set your desired width here
    }));
    setTableColumns(modifiedColumns);
  }, [columns]);
 
  return (
    <div className={classNames("", className ? className : "")}>
      <AntTable
        columns={tableColumns}
        rowKey={rowKey}
        onRow={onRow}
        rowClassName={rowClassName}
        dataSource={dataSource}
        loading={loading}
        pagination={false}
        showHeader={false}
        className="cursor-pointer"
        locale={{
          emptyText: (
            <div className="flex flex-col justify-center items-center">
              <span className="text-center mb-3 ">
                {setStartDate && setEndDate && setSearchFilters
                  ? "No Data"
                  : ""}
              </span>
              {/* {setStartDate && setEndDate && (
                        <Button onClick={onCreateEncounter} type={"button"}
                         className="flex gap-2 items-center"
                         >
                           <AddAiIcon/> Add Encounter
                        </Button>
                        )} */}
            </div>
          ),
        }}
        onChange={() => null}
        // onRow={onRowClick ? onRowClick : () => null}
      />
    </div>
  );
};
