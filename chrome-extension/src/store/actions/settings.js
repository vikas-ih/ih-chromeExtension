// import { FronteggContext } from '@frontegg/rest-api';
import { AxiosAmbient, Axios } from "../../lib";

// import {
//   getAppointmentByFilterSlice,
//   getAppointmentsByStatusSlice,
// } from 'src/store';
import {
  childOrganizationsSlice,
  dotPhraseOverridesCreateLoadingSlice,
  dotPhraseOverridesDeleteLoadingSlice,
  dotPhraseOverridesListLoading,
  dotPhraseOverridesListSlice,
  dotPhraseOverridesUpdateLoadingSlice,
  practitionersByOrgsLoadingSlice,
  practitionersByOrgsSlice,
  selectedDotPhraseOverridesSlice,
  templateListLoading,
  templateListSlice,
  templateOverridesListLoading,
  templateOverridesListSlice,
} from "../slice/settings";

// import { getCurrentPractitionerSettings } from 'src/store/actions/practitioner.action';

import { showToastSuccess } from "../../utilities/toast";
import { showToastError } from "../../utilities/errortoast";
import { getAuthHeaders, getAuthHeadersPdf } from "../apiConfig";

export const listTemplates = (encounterPhase, org_uuid = null, accessToken) => {
  return async (dispatch) => {
    dispatch(templateListLoading(true));
    // dispatch(getAppointmentsByStatusSlice([]));
    // dispatch(getAppointmentByFilterSlice([]));
    const headers = getAuthHeaders(accessToken);

    const params = {
      encounter_phase: encounterPhase,
    };
    if (org_uuid) {
      params.org_uuid = org_uuid;
    }
    const result = await AxiosAmbient.get(`/templates`, { headers, params });
    const response = result?.data;
    if (result?.status === 200) {
      dispatch(templateListSlice(response.templates));
    } else {
      showToastError("Failed to load templates");
    }

    dispatch(templateListLoading(false));
  };
};

export const listTemplateOverrides = (
  encounterPhase,
  all_templates = false,
  accessToken
) => {
  return async (dispatch) => {
    dispatch(templateOverridesListLoading(true));
    // dispatch(getAppointmentsByStatusSlice([]));
    // dispatch(getAppointmentByFilterSlice([]));
    const headers = getAuthHeaders(accessToken);

    const params = {
      encounter_phase: encounterPhase,
    };
    if (all_templates === true) {
      params.all = true;
    }
    const result = await AxiosAmbient.get(`/template_overrides`, {
      headers,
      params,
    });
    const response = result?.data;
    if (result?.status === 200) {
      dispatch(templateOverridesListSlice(response.templates));
    } else {
      showToastError("Failed to load templates");
    }

    dispatch(templateOverridesListLoading(false));
  };
};

export const createTemplateOverride = (
  encounter_phase,
  data,
  callBack = null,
  accessToken
) => {
  return async (dispatch) => {
    const headers = getAuthHeaders(accessToken);

    const params = {
      encounter_phase: encounter_phase,
    };
    const result = await AxiosAmbient.post(`/template_overrides`, data, {
      headers,
      params,
    });
    const response = result?.data;
    if (result?.status === 201) {
      showToastSuccess("Template created successfully");
      dispatch(listTemplateOverrides());
      // dispatch(getCurrentPractitionerSettings());
      callBack?.();
    } else {
      showToastError("Failed to create template");
    }
  };
};

export const updateTemplateOverride = (
  encounter_phase,
  template_overrides_id,
  data,
  callBack = null,
  accessToken
) => {
  return async (dispatch) => {
    const headers = getAuthHeaders(accessToken);

    const params = {
      encounter_phase: encounter_phase,
    };
    const result = await AxiosAmbient.put(
      `/template_overrides/${template_overrides_id}`,
      data,
      { headers, params }
    );
    const response = result?.data;
    if (result?.status === 200) {
      showToastSuccess("Template updated");
      dispatch(listTemplateOverrides());
      // dispatch(getCurrentPractitionerSettings());

      callBack?.();
    } else {
      showToastError("Failed to update template");
    }
  };
};

export const changeCustomTemplate = (
  encounter_phase,
  template_overrides_id,
  data,
  accessToken
) => {
  return async (dispatch) => {
    const headers = getAuthHeaders(accessToken);

    const params = {
      encounter_phase: encounter_phase,
    };
    const result = await AxiosAmbient.put(
      `/template_overrides/${template_overrides_id}`,
      data,
      { headers, params }
    );
    const response = result?.data;
    if (result?.status === 200) {
      showToastSuccess(`Template changed to ${response?.name}`);
      // dispatch(getCurrentPractitionerSettings());
    } else {
      showToastError("Failed to update template");
    }
  };
};

export const changePrebuiltTemplate = (
  encounter_phase,
  template_id,
  accessToken
) => {
  return async (dispatch) => {
    const headers = getAuthHeaders(accessToken);

    const data = {
      template_id: template_id,
    };
    const params = {
      encounter_phase: encounter_phase,
    };
    const result = await AxiosAmbient.post(`/templates/change`, data, {
      headers,
      params,
    });
    const response = result?.data;
    if (result?.status === 200) {
      showToastSuccess(`Template changed to ${response?.name}`);
      // dispatch(getCurrentPractitionerSettings());
    } else {
      showToastError("Failed to update template");
    }
  };
};

export const deleteCustomTemplateAction = (
  encounter_phase,
  template_overrides_id,
  setIsModalVisible = null,
  setWorkingTemplate,
  nextWorkingTemplate,
  accessToken
) => {
  return async (dispatch) => {
    const headers = getAuthHeaders(accessToken);

    const params = {
      encounter_phase: encounter_phase,
    };
    await AxiosAmbient.delete(`/template_overrides/${template_overrides_id}`, {
      headers,
      params,
    })
      .then((response) => {
        if (response?.status === 200) {
          showToastSuccess("Template deleted successfully");
          dispatch(listTemplateOverrides());
          // dispatch(getCurrentPractitionerSettings());
          setWorkingTemplate(nextWorkingTemplate);
        } else {
          showToastError("Failed to delete");
        }
      })
      .catch((e) => {
        showToastError("Failed to delete");
      })
      .finally(() => {
        setIsModalVisible();
      });
  };
};

export const listDotPhraseOverrides = (accessToken) => {
  return async (dispatch) => {
    dispatch(dotPhraseOverridesListLoading(true));
    const headers = getAuthHeaders(accessToken);

    const result = await AxiosAmbient.get(`/dot_phrase_overrides`, { headers });
    const response = result?.data;
    if (result?.status === 200) {
      dispatch(dotPhraseOverridesListSlice(response.dot_phrases));
    } else {
      showToastError("Failed to load dot phrases");
    }

    dispatch(dotPhraseOverridesListLoading(false));
  };
};

export const createDotPhraseOverride = (data, accessToken) => {
  return async (dispatch) => {
    dispatch(dotPhraseOverridesCreateLoadingSlice(true));
    const headers = getAuthHeaders(accessToken);

    const result = await AxiosAmbient.post(`/dot_phrase_overrides`, data, {
      headers,
    });
    const response = result?.data;
    if (result?.status === 201) {
      dispatch(selectedDotPhraseOverridesSlice(response));
      dispatch(listDotPhraseOverrides());
    } else {
      showToastError("Failed to create dot phrase");
    }
    dispatch(dotPhraseOverridesCreateLoadingSlice(false));
  };
};

export const updateDotPhraseOverride = (
  template_overrides_id,
  data,
  accessToken
) => {
  return async (dispatch) => {
    dispatch(dotPhraseOverridesUpdateLoadingSlice(true));
    const headers = getAuthHeaders(accessToken);

    const result = await AxiosAmbient.put(
      `/dot_phrase_overrides/${template_overrides_id}`,
      data,
      { headers }
    );
    const response = result?.data;
    if (result?.status === 200) {
      showToastSuccess("Dot phrase updated");
      dispatch(selectedDotPhraseOverridesSlice(response));
      dispatch(listDotPhraseOverrides());
    } else {
      showToastError("Failed to update dot phrase");
    }
    dispatch(dotPhraseOverridesUpdateLoadingSlice(false));
  };
};

export const deleteDotPhraseOverride = (
  template_overrides_id,
  setSubmitLoading,
  accessToken
) => {
  return async (dispatch) => {
    dispatch(dotPhraseOverridesDeleteLoadingSlice(true));
    const headers = getAuthHeaders(accessToken);

    const result = await AxiosAmbient.delete(
      `/dot_phrase_overrides/${template_overrides_id}`,
      { headers }
    );
    if (result?.status === 200) {
      showToastSuccess("Dot phrase deleted");
      dispatch(selectedDotPhraseOverridesSlice(null));
      dispatch(listDotPhraseOverrides());
      setSubmitLoading(false);
    } else {
      showToastError("Failed to delete dot phrase");
    }
    dispatch(dotPhraseOverridesDeleteLoadingSlice(false));
  };
};

export const getChildrenOrganizations = (parent_org_uuid, accessToken) => {
  return async (dispatch) => {
    const headers = getAuthHeaders(accessToken);

    const result = await Axios.get(
      `/v2/organization_children?org_uuid=${parent_org_uuid}`,
      {
        headers,
      }
    );
    const response = result?.data;
    if (result?.status === 200) {
      dispatch(childOrganizationsSlice(response));
    } else {
      showToastError("Failed to load sub-accounts");
    }
  };
};

export const getPractitionersByOrgs = (org_uuids, accessToken) => {
  return async (dispatch) => {
    dispatch(practitionersByOrgsLoadingSlice(true));
    const headers = getAuthHeaders(accessToken);

    const payload = {
      org_uuids: org_uuids,
    };
    const result = await Axios.post(`/v2/practitioners_by_org_uuids`, payload, {
      headers,
    });
    const response = result?.data;
    if (result?.status === 200) {
      dispatch(practitionersByOrgsSlice(response?.practitioners_data));
    } else {
      showToastError("Failed to load practitioners");
    }
    dispatch(practitionersByOrgsLoadingSlice(false));
  };
};
