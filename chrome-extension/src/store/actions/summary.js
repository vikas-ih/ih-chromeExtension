import {
  summaryDetailsSlice,
  summaryDetailsLoading,
  summaryListSlice,
  summaryListLoading,
  summaryRegenerationLoading,
  summaryExportLoading,
  icd10SummaryLoading,
  icd10SummarySlice,
  summaryRatingSlice,
  cptCodesSummarySlice,
  cptCodesSummaryLoading,
} from "../slice/summary.slice";
// import { createFHIRClient } from "src/modules/EHR/lib/fhir";
// import { getCurrentPractitionerSettings } from "src/store/actions/practitioner.action";// check
import { AxiosAmbient } from "../../lib";
import { getEncounter, listEncounters } from "../slice/encounter.slice";
import { showToastSuccess } from "../../utilities/toast";
import { showToastError } from "../../utilities/errortoast";
import { getAuthHeaders, getAuthHeadersPdf } from "../apiConfig";

// List summaries by desc order for an encounter
export const listSummaries = (
  encounter_id,
  encounter_phase,
  type,
  accessToken
) => {
  return async (dispatch) => {
    if (type === "icd-10") {
      dispatch(icd10SummaryLoading(true));
    } else if (type === "cpt") {
      dispatch(cptCodesSummaryLoading(true));
    } else {
      dispatch(summaryListLoading(true));
    }

    const headers = getAuthHeaders(accessToken);

    const params = {
      encounter_id: encounter_id,
      encounter_phase: encounter_phase,
      type: type,
    };
    const result = await AxiosAmbient.get(`/summaries`, { headers, params });
    const response = result?.data;
    if (result?.status === 200) {
      if (type === "icd-10") {
        const summary =
          response?.summaries?.length && response?.summaries[0]?.summary_json
            ? JSON.parse(response?.summaries[0]?.summary_json)
            : [];
        dispatch(icd10SummarySlice(summary));
      } else if (type === "cpt") {
        const summary =
          response?.summaries?.length && response?.summaries[0]?.summary_json
            ? JSON.parse(response?.summaries[0]?.summary_json)
            : [];
        dispatch(cptCodesSummarySlice(summary));
      } else {
        dispatch(summaryListSlice(response?.summaries));
      }
    } else {
      showToastError("Failed to load summaries for encounter");
    }

    if (type === "icd-10") {
      dispatch(icd10SummaryLoading(false));
    } else if (type === "cpt") {
      dispatch(cptCodesSummaryLoading(false));
    } else {
      dispatch(summaryListLoading(false));
    }
  };
};

// Get generated summary for an encounter
export const getSummary = (summary_id, accessToken) => {
  return async (dispatch) => {
    dispatch(summaryDetailsLoading(true));
    const headers = getAuthHeaders(accessToken);

    const result = await AxiosAmbient.get(`/summaries/${summary_id}`, {
      headers,
    });
    const response = result?.data;
    if (result?.status === 200) {
      dispatch(summaryDetailsSlice(response));
      
    } else if (result?.status === 404) {
      dispatch(summaryDetailsSlice(""));
    } else {
      showToastError("Failed to load summary");
    }

    dispatch(summaryDetailsLoading(false));
  };
};

export const updateSummary = (
  encounter_id,
  encounter_phase,
  summary_json,
  version,
  lastUpdatedSummaryRef,
  editableSummaryRef,
  setEditedSummary,
  setIsSaving,
  accessToken
) => {
  return async (dispatch) => {
   const headers = getAuthHeaders(accessToken);
    const data = {
      summary_json: summary_json,
      version: version,
    };
    const params = {
      encounter_phase: encounter_phase,
    };
    const result = await AxiosAmbient.put(
      `/summaries/version?encounter_id=${encounter_id}`,
      data,
      { headers, params }
    );
    if (result?.status === 200) {
      const response = result?.data;
      editableSummaryRef.current.version = response?.version;
      editableSummaryRef.current.updated_at = response?.updated_at;
      lastUpdatedSummaryRef.current = response;
      setEditedSummary((prev) => ({
        ...prev,
        version: response?.version,
        updated_at: response?.updated_at,
      }));
      setIsSaving(false);
    } else {
      showToastError("Failed to update summary");
    }
  };
};

// regenerate summary for an encounter
export const regenerateSummary = (
  encounter_id,
  encounter_phase,
  searchFilters,
  custom_instruction,
  currentTemplate,
  summaryVerbosity,
  summaryFormat,
  from,
  mode = "update",
  accessToken
) => {
  return async (dispatch) => {
    dispatch(summaryRegenerationLoading(true));
   const headers = getAuthHeaders(accessToken);
    const data = {
      custom_instructions: custom_instruction,
      template_id: currentTemplate?.template_id,
      template_overrides_id: currentTemplate?.template_overrides_id,
      summary_verbosity: summaryVerbosity,
      summary_format: summaryFormat,
      mode: mode,
    };
    const params = {
      encounter_phase: encounter_phase,
    };
    try {
      const result = await AxiosAmbient.post(
        `/encounters/${encounter_id}/regenerate_summary`,
        data,
        { headers, params }
      );
      const response = result.data;
      if (result?.status === 200) {
        showToastSuccess("The updated summary will be available shortly.");
        from === "non-magic-edit"
          ? null
          : await dispatch(listEncounters({searchFilters, accessToken}));
        await dispatch(getEncounter({encounter_id, accessToken}));
        // dispatch(getCurrentPractitionerSettings());
        dispatch(summaryRegenerationLoading(false));
        return true;
      } else {
        showToastError("Failed to regenerate note");
      }
    } catch (error) {
      console.error("Error regenerating summary:", error);
      showToastError("An error occurred while regenerating the summary.");
    }
    dispatch(summaryRegenerationLoading(false));
    return false;
  };
};

// regenerate summary for an encounter
export const exportSummaryPDF = (
  encounter_id,
  encounter_phase,
  accessToken
) => {
  return async (dispatch) => {
    dispatch(summaryExportLoading(true));
    const headers = getAuthHeadersPdf(accessToken);
    const params = {
      encounter_phase: encounter_phase,
    };
    try {
      const result = await AxiosAmbient.post(
        `/encounters/${encounter_id}/export`,
        {},
        { headers, params, responseType: "blob" }
      ); // Add responseType: 'blob'
      const blob = new Blob([result.data], { type: "application/pdf" }); // Create the blob directly from result.data
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "summary.pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error exporting summary:", error);
      showToastError("An error occurred while exporting the summary.");
    }
    dispatch(summaryExportLoading(false));
    return false;
  };
};
// export const exportSummaryToEHR = async (summary, accessToken) => {
//   const client = await createFHIRClient();
//   const myDocumentReference = {
//     resourceType: "DocumentReference",
//     status: "current",
//     docStatus: "final",
//     type: {
//       coding: [
//         {
//           system: "http://loinc.org",
//           code: "11488-4",
//           display: "Consultation Note",
//         },
//       ],
//       text: "Consultation Note",
//     },
//     content: [
//       {
//         attachment: {
//           contentType: "text/plain",
//           data: `${btoa(unescape(encodeURIComponent(summary)))}`,
//         },
//       },
//     ],
//   };
//   const response = await client.create(myDocumentReference).catch((reason) => {
//     showToastError(`Failed to export note to EHR due to:  ${reason}`);
//   });

//   showToastSuccess("Successfully exported note to EHR.");

//   await importSummaryFromEHR(response);
// };

// export const importSummaryFromEHR = async (ehr_response, accessToken) => {
//   const client = await createFHIRClient();
//   const docReferenceBinaryIds = ehr_response.content.map(
//     (item) => item.attachment.url
//   );
//   const attachments = docReferenceBinaryIds
//     .filter((id) => !!id)
//     .map(async (id) => {
//       return await client.requestResource(id);
//     });
//   attachments.forEach(async (attachment) =>
//     console.log("DocumentReference attachmemnt", await attachment)
//   );
// };

export const getSummaryRating = (encounterId, accessToken) => {
  return async (dispatch) => {
    try {
     const headers = getAuthHeaders(accessToken);

      const response = await AxiosAmbient.get(
        `/summaries?encounter_id=${encounterId}`,
        { headers }
      );
      if (response?.status === 200) {
        const rating =
          response?.data?.summaries[0]?.summary_ratings === null
            ? 0
            : response?.data?.summaries[0]?.summary_ratings;
        dispatch(summaryRatingSlice(rating));
      }
    } catch (error) {
      showToastError("Error occurred");
    }
  };
};

export const summaryFeedbackAction = (
  summaryId,
  summaryRating,
  comment,
  accessToken
) => {
  return async (dispatch) => {
    try {
     const headers = getAuthHeaders(accessToken);
      const data = {
        summary_id: summaryId,
        score: summaryRating,
        comments: comment === undefined ? "" : comment,
      };
      const result = await AxiosAmbient.post("/summary_feedback", data, {
        headers,
      });
      if (result?.status === 200) {
        dispatch(summaryRatingSlice(summaryRating));
        showToastSuccess("Feedback submitted successfully");
      }
    } catch (error) {
      showToastError("Feedback submission failed");
    }
  };
};
