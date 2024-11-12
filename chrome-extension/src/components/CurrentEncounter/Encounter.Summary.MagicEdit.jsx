import { Drawer, Input, Tooltip, Dropdown, Menu } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { regenerateSummary } from '../../store/actions/summary';
import { Button } from '../baseComponents';
import TemplateSelectDropdown from '../Settings/Settings.TemplateDropdown';
import { AmbientloadIcon, ExpandIcon, MagicIcon } from 'src/icons';
import {
  formatOptions,
  verbosityOptions,
  DEFAULT_FORMAT,
  DEFAULT_VERBOSITY,
} from '../baseComponents/CurrentTranscript';

import { ButtonGroup } from '../baseComponents/ButtonGroup';
import { useFeatureEntitlements } from '@frontegg/react';
const { TextArea } = Input;

export const EncounterSummaryMagicEdit = ({
  isMagicEditingRef,
  encounterDetails,
  encounterPhase,
  searchFilters,
  schedulepage,
  restrictTemplates,
}) => {
  const dispatch = useDispatch();

  const { isEntitled: hasGlobalNoteFormatEnabled } = useFeatureEntitlements(
    'global-note-format-preference'
  );

  const { isSummaryRegenerationLoading } = useSelector(
    (state) => state?.summaryState
  );

  // Keep drawer open if regeneration API is stil in-flight.
  const [drawerVisible, setDrawerVisible] = useState(
    isSummaryRegenerationLoading
  );

  const [customInstructions, setCustomInstructions] = useState('');
  const [workingTemplate, setWorkingTemplate] = useState('');
  const isSmallScreen = window.innerWidth <= 1450;
  const isMobileView = window.innerWidth <= 1260;

  const [selectedSummaryVerbosity, setSummaryVerbosity] = useState();
  const [selectedSummaryFormat, setSummaryFormat] = useState();
  const summaryVerbosity = useMemo(() => {
    if (selectedSummaryVerbosity) {
      return selectedSummaryVerbosity;
    }

    if (encounterDetails?.summary_verbosity) {
      return encounterDetails.summary_verbosity;
    }

    if (workingTemplate?.body?.verbosity) {
      return workingTemplate.body.verbosity;
    }

    return DEFAULT_VERBOSITY;
  }, [selectedSummaryVerbosity, encounterDetails, workingTemplate]);

  const summaryFormat = useMemo(() => {
    if (selectedSummaryFormat) {
      return selectedSummaryFormat;
    }

    if (encounterDetails?.summary_format) {
      return encounterDetails.summary_format;
    }

    if (workingTemplate?.body?.format) {
      return workingTemplate.body.format;
    }

    return DEFAULT_FORMAT;
  }, [selectedSummaryFormat, encounterDetails, workingTemplate]);

  const lastEncounterId = useRef(encounterDetails?.encounter_id);
  useEffect(() => {
    if (lastEncounterId.current !== encounterDetails?.encounter_id) {
      setSummaryVerbosity(undefined);
      setSummaryFormat(undefined);
      lastEncounterId.current = encounterDetails?.encounter_id;
    }
  }, [encounterDetails]);

  const onClick = () => {
    setDrawerVisible(true);
    isMagicEditingRef.current = true;
    // if (schedulepage) {
    //   analytics.track(
    //     'Clicked Magic Edit In Ambient Medical Conversation From VCA',
    //     {
    //       encounter: encounterDetails?.encounter_id,
    //     }
    //   );
    // } else {
    //   analytics.track(
    //     'Clicked Magic Edit In Ambient Medical Conversation From Aura',
    //     {
    //       encounter: encounterDetails?.encounter_id,
    //     }
    //   );
    // }
  };

  const onClose = () => {
    if (!isSummaryRegenerationLoading) {
      isMagicEditingRef.current = false;
      setDrawerVisible(false);
    }
  };

  const onSubmit = (mode = 'update') => {
    dispatch(
      regenerateSummary(
        encounterDetails?.encounter_id,
        encounterPhase,
        searchFilters,
        customInstructions,
        workingTemplate,
        summaryVerbosity,
        summaryFormat,
        null,
        mode
      )
    ).then((success) => {
      if (success) {
        setDrawerVisible(false);
        isMagicEditingRef.current = false;
      }
    });
  //   if (schedulepage) {
  //     analytics.track(
  //       'Clicked Regenerate Medical Conversation In Ambient From VCA',
  //       {
  //         encounter: encounterDetails?.encounter_id,
  //       }
  //     );
  //   } else {
  //     analytics.track(
  //       'Clicked Regenerate Medical Conversation In Ambient From Aura',
  //       {
  //         encounter: encounterDetails?.encounter_id,
  //       }
  //     );
  //   }
  // };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => onSubmit('overwrite')}>
        Regenerate from scratch
      </Menu.Item>
    </Menu>
  );

  let templateId;
  let templateOverridesId;

  if (encounterPhase == 'in-visit') {
    templateId = encounterDetails.in_visit_template_id;
    templateOverridesId = encounterDetails.in_visit_template_overrides_id;
  } else if (encounterPhase == 'pre-chart') {
    templateId = encounterDetails.pre_chart_template_id;
    templateOverridesId = encounterDetails.pre_chart_template_overrides_id;
  }

  return (
    <>
      <Tooltip title="Magic edit" placement="bottom">
        <div>
          <Button
            onClick={onClick}
            type={'button'}
            className="h-[35px]"
            id="magic icon"
          >
            {isSmallScreen ? (
              <div className="flex items-center cursor-pointer py-[1px] text-xs gap-2">
                <MagicIcon />
              </div>
            ) : isMobileView ? (
              <div className="flex items-center text-xs cursor-pointer gap-1">
                <MagicIcon />
              </div>
            ) : (
              <div className="flex items-center cursor-pointer py-[1px] text-xs gap-2">
                <MagicIcon />
                Magic edit
              </div>
            )}
          </Button>
        </div>
      </Tooltip>

      <Drawer
        title="Magic edit"
        placement="right"
        closable={true}
        onClose={onClose}
        open={drawerVisible}
        width={720}
        style={{ fontFamily: 'Poppins' }}
      >
        <div className="text-[#667085] mb-1">Note template</div>
        <TemplateSelectDropdown
          allowInlineEdit
          encounterPhase={encounterPhase}
          currentTemplate={workingTemplate}
          setCurrentTemplate={setWorkingTemplate}
          templateId={templateId}
          templateOverridesId={templateOverridesId}
          commitOnChange={false}
          fromIsSettings={false}
          restrictTemplates={restrictTemplates}
          isfromMagicEdit={true}
        />

        {encounterPhase === 'in-visit' && (
          <>
            <div className="mt-4">
              <div className="text-[#667085] mb-1">Note verbosity</div>
              <ButtonGroup
                options={verbosityOptions}
                value={summaryVerbosity}
                onChange={(value) => {
                  // analytics.track('Clicked Verbosity Option In Magic Edit', {
                  //   verbosity: value,
                  // });
                  setSummaryVerbosity(value);
                }}
              />
            </div>
            {!hasGlobalNoteFormatEnabled && (
              <div className="mt-4">
                <div className="text-[#667085] mb-1">Note format</div>
                <ButtonGroup
                  options={formatOptions}
                  value={summaryFormat}
                  onChange={(value) => {
                    // analytics.track('Clicked Format Option In Magic Edit', {
                      // format: value,/
                    // });
                    setSummaryFormat(value);
                  }}
                />
              </div>
            )}
          </>
        )}

        <div className="mt-4">
          <div className="text-[#667085] mb-1">Additional instructions</div>
          <div className="grid grid-cols-1 gap-4 mt-2 border border-[#d9d9d9] rounded-md">
            <TextArea
              bordered={false}
              rows={12}
              placeholder="Add additional instructions to be used to generate a new summary."
              value={customInstructions}
              onChange={(e) => setCustomInstructions(e.target.value)}
              style={{ resize: 'none', fontFamily: 'Poppins' }}
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <Dropdown.Button
            onClick={() => onSubmit('update')}
            placement="bottomLeft"
            overlay={menu}
            rootClassName="w-auto min-w-[120px] copy-all rounded-xl drop-shadow-sm flex bg-[#00D090] hover:bg-[#059669] text-white [&_.ant-btn-loading-icon]:text-white"
            loading={isSummaryRegenerationLoading}
            icon={<ExpandIcon fill={'#ffffff'} />}
          >
            <div className="flex items-center justify-center cursor-pointer gap-2 text-white w-full">
              {!isSummaryRegenerationLoading && (
                <>
                  <AmbientloadIcon />
                  <span>Regenerate</span>
                </>
              )}
            </div>
          </Dropdown.Button>
        </div>
      </Drawer>
    </>
  );
}
};
