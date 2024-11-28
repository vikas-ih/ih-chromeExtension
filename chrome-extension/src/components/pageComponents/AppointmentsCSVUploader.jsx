import { InboxOutlined, SaveOutlined } from '@ant-design/icons';
import { Alert, Button, Modal, Result, Steps, Table, Upload } from 'antd';
import { useEffect, useState } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Papa from 'papaparse';
import { useDispatch, useSelector } from 'react-redux';
// import { syncAppointments } from 'src/modules/ambient_solo/store/actions/appointments';
import {
  getCSVColumnMappings,
  uploadCSVAction,
} from 'src/store/actions/appointment.action';
import { showToastSuccess } from 'src/utilities/toast';
import XLSX from 'xlsx';
import './AppointmentsCSVUploader.scss';

const { Step } = Steps;
const { Dragger } = Upload;

const schema = {
  columns: [
    { name: 'Created Date Time', key: 'created_date_time', data_type: 'date' },
    { name: 'Start Date Time', key: 'start_date_time', data_type: 'date' },
    { name: 'Start Date', key: 'start_date', data_type: 'date' },
    { name: 'Start Time', key: 'start_time', data_type: 'time' },
    { name: 'Provider', key: 'provider', data_type: 'string' },
    { name: 'Patient', key: 'patient', data_type: 'string' },
    {
      name: 'Patient First Name',
      key: 'patient_first_name',
      data_type: 'string',
    },
    {
      name: 'Patient Last Name',
      key: 'patient_last_name',
      data_type: 'string',
    },
    { name: 'Phone Number', key: 'phone_number', data_type: 'string' },
    { name: 'Email', key: 'email', data_type: 'string' },
    { name: 'Appointment Type', key: 'appointment_type', data_type: 'string' },
    {
      name: 'Appointment Status',
      key: 'appointment_status',
      data_type: 'string',
    },
    { name: 'Birth Date', key: 'birth_date', data_type: 'date' },
    { name: 'Sex', key: 'sex', data_type: 'string' },
    {
      name: 'Primary Address 1',
      key: 'primary_address_1',
      data_type: 'string',
    },
    {
      name: 'Primary Address 2',
      key: 'primary_address_2',
      data_type: 'string',
    },
    { name: 'City', key: 'city', data_type: 'string' },
    { name: 'State', key: 'state', data_type: 'string' },
    { name: 'Zip', key: 'zip', data_type: 'string' },
    {
      name: 'Appointment Notes',
      key: 'appt_notes',
      data_type: 'string',
    },
  ],
};

function formatTime(time) {
  if (!time) return '';

  const timeString = String(time);

  // Extract AM/PM indicator
  const period = timeString.match(/[APap][Mm]/)
    ? timeString.match(/[APap][Mm]/)[0].toUpperCase()
    : '';

  // Remove any non-digit characters, keeping the colon if present
  const cleanTime = timeString.replace(/[^\d:]/g, '');

  let formattedTime = '';

  if (cleanTime.includes(':')) {
    // If the time already contains a colon, just use it as is
    formattedTime = cleanTime;
  } else if (cleanTime.length === 3 || cleanTime.length === 4) {
    const hours = cleanTime.slice(0, -2);
    const minutes = cleanTime.slice(-2);
    formattedTime = `${hours}:${minutes}`;
  } else {
    // If the format is unexpected, return the original string
    return timeString;
  }

  // Append the period (AM/PM) if it exists
  return period ? `${formattedTime} ${period}` : formattedTime;
}

export const AppointmentsCSVUploader = ({ visible, setVisible }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [csvData, setCSVData] = useState([]);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState(null);
  const [csvUploadedToS3, setCsvUploadedToS3] = useState(true);
  const [missingColumns, setMissingColumns] = useState([]);
  const [missingColumnsError, setMissingColumnsError] = useState(false);
  const dispatch = useDispatch();
  const { currentPractitioner } = useSelector(
    (state) => state?.practitionerState
  );
  const { csvColumnMappings, csvColumnMappingsLoading } = useSelector(
    (state) => state.appointmentState
  );

  // Fetch CSV column mappings when the modal is opened
  useEffect(() => {
    if (visible) {
      dispatch(getCSVColumnMappings(currentPractitioner?.org_uuid));
    }
  }, [visible]);

  const handleClose = () => {
    setCurrentStep(0);
    setCSVData([]);
    setUploadProgress(0);
    setVisible(false);
    setMissingColumns([]);
    setMissingColumnsError(false);
  };

  const getRecords = (jsonData) => {
    let appointments = [];
    let rowNumber = 2; // Start row number from 2 to avoid header row
    for (const record of jsonData) {
      appointments.push({
        row_number: rowNumber,
        appt_notes: record.appt_notes?.trim() || '',
        appointment: {
          appointment_status: record.appointment_status || '',
          created_time: record.created_date_time || '',
          start_time: record.start_date_time
            ? record.start_date_time
            : record.start_date + ' ' + formatTime(record.start_time) || '',
          practitioner_name: record.provider?.trim() || '',
          condition_name: record.appointment_type || '',
        },
        patient: {
          birth_date: record.birth_date || '',
          name: record.patient
            ? record.patient?.trim()
            : record.patient_first_name?.trim() +
                ' ' +
                record.patient_last_name?.trim() || '',
          gender: record.sex || '',
          address: {
            line_1: record.primary_address_1 || '',
            line_2: record.primary_address_2 || '',
            city: record.city || '',
            state: record.state || '',
            zip: String(record.zip || ''),
          },
          phone: record.phone_number ? String(record.phone_number).trim() : '',
          email: record.email?.trim() || '',
        },
      });
      rowNumber++;
    }
    return appointments;
  };

  const handleCSVUpload = async (file) => {
    try {
      let schemaCopy = JSON.parse(JSON.stringify(schema));

      if (Object.keys(csvColumnMappings).length != 0) {
        for (const column of schemaCopy.columns) {
          if (
            csvColumnMappings[column.name] &&
            csvColumnMappings[column.name] !== ''
          ) {
            column.name = csvColumnMappings[column.name];
          }
        }
      }

      const fileType = file.type === 'text/csv' ? 'CSV' : 'Excel';

      analytics.track(
        `Selected A ${fileType} File For Bulk Upload Appointments`,
        {}
      );
      setFile(file); // Store the file for later use

      let jsonData = [];
      if (file.type === 'text/csv') {
        const csvContent = await file.text(); // Read the file content as text

        // Parse CSV to JSON
        const parsedData = Papa.parse(csvContent, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: 'greedy',
          transformHeader: (header) => header.trim(),
        });

        // Map parsed data to schema dynamically
        jsonData = parsedData.data.map((row) => {
          const rowJson = {};
          schemaCopy.columns.forEach((column) => {
            rowJson[column.key] = row[column.name];
          });
          return rowJson;
        });
      } else if (
        file.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'application/vnd.ms-excel'
      ) {
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const parsedData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          raw: true,
          cellDates: true,
        });

        const formatExcelValue = (value, columnName) => {
          if (typeof value === 'string') return value.trim(); // Return trimmed string as-is
          if (typeof value !== 'number') return ''; // Return empty string for non-numeric, non-string values

          // Check if the column is likely to contain dates
          const dateColumns = [
            'created_date_time',
            'start_date_time',
            'start_date',
            'start_time',
            'birth_date',
          ].map(
            (key) => schemaCopy.columns.find((col) => col.key === key)?.name
          );

          const isLikelyDate = dateColumns.some((col) =>
            columnName.toLowerCase().includes(col.toLowerCase())
          );

          if (!isLikelyDate) {
            // For non-date columns, return the number as a string
            return String(value);
          }

          const date = XLSX.SSF.parse_date_code(value);

          // Check if the original value included time
          const hasTime = Math.floor(value) !== value;

          if (hasTime) {
            // Format as MM/DD/YY HH:MM:SS
            const dateStr = `${String(date.m).padStart(2, '0')}/${String(date.d).padStart(2, '0')}/${String(date.y).slice(-2)}`;
            const timeStr = `${String(date.H).padStart(2, '0')}:${String(date.M).padStart(2, '0')}:${String(date.S).padStart(2, '0')}`;

            // Skip the date part if it's "01/00/00"
            return dateStr === '01/00/00' ? timeStr : `${dateStr} ${timeStr}`;
          } else {
            // Format as M/D/YYYY
            return `${date.m}/${date.d}/${date.y}`;
          }
        };

        // Convert Excel values to appropriate string format
        const headers = parsedData[0].map((header) => header.trim());
        const convertedData = parsedData
          .slice(1)
          .map((row, rowIndex) => {
            if (row.length === 0) {
              return null; // Return null for empty rows
            }
            return row.map((cell, cellIndex) =>
              formatExcelValue(cell, headers[cellIndex])
            );
          })
          .filter((row) => row !== null);

        // Use convertedData instead of parsedData in the rest of your code
        jsonData = convertedData.map((row) => {
          const rowJson = {};
          headers.forEach((header, index) => {
            const column = schemaCopy.columns.find(
              (col) => col.name === header
            );
            if (column) {
              rowJson[column.key] = row[index];
            }
          });
          return rowJson;
        });
      }

      const requiredColumns = [
        'created_date_time',
        'provider',
        'phone_number',
        'email',
        'appointment_type',
        'appointment_status',
        'birth_date',
      ];

      const firstRow = jsonData[0];

      // Check for date/time and patient columns
      const dateTimeColumns = firstRow['start_date_time']
        ? ['start_date_time']
        : ['start_date', 'start_time'];
      const patientColumns = firstRow['patient']
        ? ['patient']
        : ['patient_first_name', 'patient_last_name'];

      const allRequiredColumns = [
        ...requiredColumns,
        ...dateTimeColumns,
        ...patientColumns,
      ];

      const missingColumns = allRequiredColumns.filter(
        (key) => firstRow[key] === undefined
      );

      if (missingColumns.length > 0) {
        const missingColumnNames = missingColumns.reduce((acc, key) => {
          const specialCases = {
            start_date_time: 'Start Date Time or Start Date & Start Time',
            start_date: 'Start Date Time or Start Date & Start Time',
            start_time: 'Start Date Time or Start Date & Start Time',
            patient: 'Patient or Patient First Name & Patient Last Name',
            patient_first_name:
              'Patient or Patient First Name & Patient Last Name',
            patient_last_name:
              'Patient or Patient First Name & Patient Last Name',
          };

          const columnName =
            specialCases[key] ||
            schemaCopy.columns.find((column) => column.key === key)?.name;
          return columnName && !acc.includes(columnName)
            ? [...acc, columnName]
            : acc;
        }, []);

        setMissingColumns(missingColumnNames);
        setMissingColumnsError(true);
      }

      setCSVData(jsonData);

      handleNext();
    } catch (error) {
      console.error('Error reading file:', error);
    }
    return false; // Prevent upload
  };

  const generateColumns = () => {
    if (!csvData || csvData.length === 0) {
      return [];
    }
    const firstRow = csvData[0];
    const columnsToHideIfNotPresent = [
      'patient',
      'patient_first_name',
      'patient_last_name',
      'start_date_time',
      'start_date',
      'start_time',
      'appt_notes',
    ];

    return schema.columns
      .map((column) => {
        if (
          columnsToHideIfNotPresent.includes(column.key) &&
          firstRow[column.key] === undefined
        ) {
          return null;
        }
        return {
          title: column.name === 'Sex' ? 'Gender' : column.name,
          dataIndex: column.key,
          key: column.key,
        };
      })
      .filter(Boolean); // Remove null entries
  };
  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const resetProgress = () => {
    setUploadProgress(0);
    setCurrentStep(1);
    analytics.track(
      'Failed To Calculate Time Needed To Upload CSV File For Bulk Upload Appointments',
      {}
    );
  };
  const startProgress = (dryRunResult) => {
    const totalCreation = dryRunResult.created;
    const totalUpdation = dryRunResult.updated;
    const totalSkipped = dryRunResult.skipped;

    const totalRecords = totalCreation + totalUpdation + totalSkipped;
    const intervalDuration =
      totalCreation * 1000 + totalUpdation * 250 + totalSkipped * 100;
    const progressIncrement = 100 / totalRecords;

    const timer = setInterval(() => {
      setUploadProgress((prevProgress) =>
        Math.min(prevProgress + progressIncrement, 100)
      );
    }, intervalDuration);
    return timer;
  };

  const uploadToS3 = async (file, key) => {
    showToastSuccess('Uploading file...');

    const base64File = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]); // Extract base64 part
      reader.onerror = reject;
      reader.readAsDataURL(file); // [<mediatype>][;base64],<data>
    });

    const params = {
      s3_key: key,
      body: base64File,
      content_type: file.type,
    };

    await dispatch(uploadCSVAction(params));
    setCsvUploadedToS3(true);
  };

  const handleSubmit = async () => {
    analytics.track('Submitted CSV File For Bulk Upload Appointments', {});
    setCsvUploadedToS3(false);

    const appointments = getRecords(csvData);

    const date = new Date();
    const s3_key =
      `${date.getUTCFullYear()}/${('0' + (date.getUTCMonth() + 1)).slice(
        -2
      )}/${('0' + date.getUTCDate()).slice(-2)}/` +
      `${date.getTime()}` +
      `.${file.name.split('.').pop()}`;

    const syncAppointmentsPayload = {
      s3_key: s3_key,
      appointments: appointments,
    };

    // Make the actual upload call.
    dispatch(syncAppointments(syncAppointmentsPayload)).then(async (result) => {
      // clearInterval(timer);

      if (result) {
        analytics.track(
          'Successfully Uploaded CSV File For Bulk Upload Appointments',
          {}
        );
        await uploadToS3(file, s3_key);
        setCurrentStep(2);
      } else {
        resetProgress();
        setCsvUploadedToS3(true);
      }
    });
  };

  const steps = [
    {
      title: 'Upload file',
      content: (
        <>
          <div className="flex-container items-center justify-center">
            <div className="w-3/4 items-center justify-center pt-12">
              <Dragger
                accept=".csv,.xlsx,.xls"
                beforeUpload={handleCSVUpload}
                height={250}
              >
                <p className="ant-upload-drag-icon text-xs">
                  <InboxOutlined />
                </p>
                <p className="text-xs ant-upload-text">
                  Click or drag CSV, XLSX, or XLS file to this area to upload
                </p>
              </Dragger>
            </div>
          </div>
        </>
      ),
    },
    {
      title: 'Preview changes',
      content: (
        <>
          {missingColumnsError ? (
            <div className="flex justify-center items-center h-64 mt-12">
              <Alert
                message="Uploaded file is missing the following required column(s)"
                description={
                  <>
                    <div>
                      <ul
                        style={{ listStyleType: 'disc', paddingLeft: '20px' }}
                      >
                        {missingColumns.map((column, index) => (
                          <li key={index}>{column}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 font-medium">
                      <p>
                        Please contact{' '}
                        <a href="mailto:help@insighthealth.ai">
                          help@insighthealth.ai
                        </a>{' '}
                        for support.
                      </p>
                    </div>
                  </>
                }
                type="error"
                showIcon
              />
            </div>
          ) : (
            <>
              <Table
                dataSource={csvData}
                columns={generateColumns()}
                pagination={false}
              />
              <div className="text-xs">Total Rows: {csvData.length}</div>
            </>
          )}
        </>
      ),
    },
    {
      title: 'Result',
      content: (
        <>
          <Result
            status="success"
            title="Upload Complete"
            subTitle="An email summary will be sent to you shortly."
          />
          {uploadResult?.errors && (
            <div className="flex flex-col items-center">
              <Table
                dataSource={uploadResult.errors.map((error, index) => ({
                  key: index,
                  reason: error,
                }))}
                pagination={false}
              >
                <Table.Column
                  title="Reason for skipping"
                  dataIndex="reason"
                  key="reason"
                  className="text-xs"
                />
              </Table>
            </div>
          )}
        </>
      ),
    },
  ];

  return (
    <Modal
      open={visible}
      onCancel={handleClose}
      footer={null}
      width="85vw"
      className="csv-uploader text-xs"
    >
      <Steps current={currentStep}>
        {steps.map((step) => (
          <Step key={step.title} title={step.title} />
        ))}
      </Steps>
      <>
        <div className="steps-action flex justify-right mb-2">
          {currentStep === 1 &&
            !missingColumnsError &&
            (csvUploadedToS3 ? (
              <Button
                type="primary"
                onClick={handleSubmit}
                icon={<SaveOutlined />}
              >
                Submit
              </Button>
            ) : (
              <Spin indicator={<LoadingOutlined spin />} size="large" />
            ))}
        </div>
        <div className="steps-content">{steps[currentStep].content}</div>
      </>
    </Modal>
  );
};

export default AppointmentsCSVUploader;
