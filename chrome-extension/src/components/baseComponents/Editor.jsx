/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
import { Dropdown } from 'antd';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { listDotPhraseOverrides } from '../../store/actions/settings';
import '../../styles/encounter.scss';
import { useFeatureEntitlements } from '@frontegg/react';
import { getSummaryEvidenceForSelectedText } from 'src/modules/ambient_solo/services/summaryEvidence.js';
import { showToastError } from 'src/utilities/errortoast';
import { ProIcon } from 'src/icons/Pro.icon';
import { LockIcon } from 'src/icons/Lock.icon';
import { isEmpty } from 'lodash';
import { LoadingBar } from 'src/components/baseComponents/LoadingBar';
import { UpgradeToProTooltip } from '../Payments/UpgradeToProTooltip';
// import AuraEvidenceSourceTooltip from './AuraEvidenceSourceTooltip';
// import CopySection from './CopySection';

const Editor = forwardRef(
  (
    {
      value,
      onChange,
      className,
      enableDotPhrases = false,
      readOnly = false,
      handleDictation,
      triggerShowSummaryEvidence,
      encounterId,
    },
    ref
  ) => {
    const quillRef = useRef(null);
    const divRef = useRef(null);
    const cursorPositionRef = useRef(null);
    const copySectionRef = useRef(null);
    const selectedTextRef = useRef('');
    const { isEntitled: isEncountersNoteHistoryEnabled } =
      useFeatureEntitlements('encounters-note-evidence');
    const { isEntitled: isDictationEnabled } =
      useFeatureEntitlements('dictation');
    const [showEvidenceSummaryLoading, setShowEvidenceSummaryLoading] =
      useState(false);
    const [hoveredElement, setHoveredElement] = useState(null);

    const [showDropdown, setShowDropdown] = useState(false);
    const [showLinkedEvidenceTooltip, setShowLinkedEvidenceTooltip] =
      useState(false);
    const [showCopyTooltip, setShowCopyTooltip] = useState(false);
    const [selectedTextForLinkedEvidence, setSelectedTextForLinkedEvidence] =
      useState('');
    const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
    const [linkedEvidenceTooltipPosition, setLinkedEvidenceTooltipPosition] =
      useState({
        x: 0,
        y: 0,
      });
    const [copyTooltipPosition, setCopyTooltipPosition] = useState({
      x: 0,
      y: 0,
    });
    const [copiedSectionText, setCopiedSectionText] = useState('');

    const [menu, setMenu] = useState(<></>);

    const dispatch = useDispatch();

    const { dotPhraseOverridesList } = useSelector(
      (state) => state?.settingsState
    );

    useEffect(() => {
      if (enableDotPhrases) {
        dispatch(listDotPhraseOverrides());
      }
    }, []);

    useEffect(() => {
      let menuItems = [
        {
          label: 'Copy',
          key: 'copy',
          onClick: copyToClipboard,
        },
        {
          label: 'Paste',
          key: 'paste',
          onClick: insertFromClipboard,
        },
      ];

      if (isEncountersNoteHistoryEnabled) {
        menuItems.push({
          label: (
            <div className="flex items-center">
              <span className="mr-2">Show Source</span>
              <ProIcon />
            </div>
          ),
          key: 'show-evidence',
          onClick: showEvidenceForSelectedText,
        });
      } else {
        menuItems.push({
          label: (
            <div className="flex items-center text-gray-500 cursor-not-allowed">
              <UpgradeToProTooltip>
                <span className="mr-2">Show Source</span>
                <LockIcon />
              </UpgradeToProTooltip>
            </div>
          ),
          key: 'show-evidence',
          onClick: () => {},
        });
      }

      if (isDictationEnabled) {
        menuItems.push({
          label: (
            <div className="flex items-center">
              <span className="mr-2">Dictate</span>
              <ProIcon />
            </div>
          ),
          key: 'dictate',
          onClick: () => {
            handleDictation();
          },
        });
      } else {
        menuItems.push({
          label: (
            <div className="flex items-center text-gray-500 cursor-not-allowed">
              <UpgradeToProTooltip>
                <span className="mr-2">Dictate</span>
                <LockIcon />
              </UpgradeToProTooltip>
            </div>
          ),
          key: 'dictate',
          onClick: () => {},
        });
      }

      const submenuItems = dotPhraseOverridesList.map((dotPhrase, index) => ({
        label: dotPhrase.title,
        key: `sub-${dotPhrase.title} ${index}`,
        onClick: () => insertText(dotPhrase.template),
      }));

      if (dotPhraseOverridesList.length > 0) {
        submenuItems.push({
          key: 'divider1',
          type: 'divider',
        });
      }

      submenuItems.push({
        label: 'Create a new dot phrase',
        key: 'create-dot-phrase',
        onClick: () => window.open('/setting', '_blank'),
      });

      menuItems.push({
        label: 'Insert dot phrase',
        key: 'dot-phrases',
        children: submenuItems,
      });

      setMenu({ items: menuItems });
    }, [dotPhraseOverridesList]);

    const showEvidenceForSelectedText = async (e) => {
      const text = selectedTextRef.current;
      if (e.stopPropagation) {
        e.stopPropagation();
        e.preventDefault();
      }

      analytics.track('Clicked On Show Source', {});
      setShowEvidenceSummaryLoading(true);
      // Add API call code here
      const result = await getSummaryEvidenceForSelectedText(encounterId, text);
      if (!isEmpty(result?.evidences)) {
        triggerShowSummaryEvidence(result?.evidences);
      } else {
        showToastError("Couldn't find evidence. Please try again");
      }
      setShowEvidenceSummaryLoading(false);
      resetLinkedEvidenceTooltip();
    };

    const resetLinkedEvidenceTooltip = () => {
      setShowLinkedEvidenceTooltip(false);
      setLinkedEvidenceTooltipPosition({ x: 0, y: 0 });
      setSelectedTextForLinkedEvidence('');
    };

    const insertText = (template) => {
      const editor = quillRef.current.getEditor();
      let position = cursorPositionRef.current;
      if (!position) {
        position = editor.getLength(); // insert at the end if no cursor position
      }

      // Capture the current scroll position
      const scrollPosition = editor.root.scrollTop;

      editor.insertText(position, template);
      const newPosition = position + template.length;
      editor.setSelection(newPosition, 0);

      // Restore the scroll position
      setTimeout(() => {
        editor.root.scrollTop = scrollPosition;
      }, 0);

      setShowDropdown(false);
    };

    const handleSelectionChange = (range) => {
      if (range) {
        cursorPositionRef.current = range.index;
      }
    };

    const handleMouseOver = (event) => {
      const target = event.target;

      // Check if the clicked element is a <strong> tag
      if (target.tagName === 'STRONG') {
        setShowCopyTooltip(true);
        setCopyTooltipPosition({ x: event.pageX, y: event.pageY });
        setHoveredElement(target);

        // getting the complete section Text and storing it in state
        const currentText = target.outerHTML;
        const currentPosInValue = value.indexOf(currentText);
        let endingPosition = value.indexOf('<p><strong', currentPosInValue - 2);

        if (endingPosition === -1) {
          endingPosition = value.length - 1;
        }
        const sectionTextToCopy = value.substring(
          currentPosInValue,
          endingPosition
        );
        setCopiedSectionText(sectionTextToCopy);
      }
    };

    const handleMouseOut = (event) => {
      const target = event.target;
      const copySection = copySectionRef?.current;
      if (
        hoveredElement &&
        target.tagName === 'STRONG' &&
        (!copySection || !hoveredElement.contains(copySection))
      ) {
        setShowCopyTooltip(false);
      }
    };

    const handleTooltipMouseOver = () => {
      // Keep the tooltip visible when mouse enters the tooltip itself
      setShowCopyTooltip(true);
    };
    const handleTooltipMouseOut = (event) => {
      const relatedTarget = event.relatedTarget;

      // Hide the tooltip only if the mouse leaves both the tooltip and the <strong> element
      if (!relatedTarget || !hoveredElement.contains(relatedTarget)) {
        setShowCopyTooltip(false);
      }
    };
    const handleRightClick = (event) => {
      event.preventDefault();
      const editor = quillRef.current.getEditor();
      const selection = editor.getSelection();
      const currentCursorPosition = editor.getSelection()?.index;
      cursorPositionRef.current = currentCursorPosition;

      if (selection) {
        const text = editor.getText(selection.index, selection.length);
        selectedTextRef.current = text; // Store the selected text
        setSelectedTextForLinkedEvidence(text);
      } else {
        selectedTextRef.current = ''; // Reset if no selection
      }
      resetLinkedEvidenceTooltip();
      setShowDropdown(true);
      setDropdownPosition({ x: event.pageX, y: event.pageY });
      cursorPositionRef.current = editor.getSelection()?.index;
      setSelectedTextForLinkedEvidence(text);
    };

    const handleClickOnEditor = (event) => {
      event.preventDefault();

      // dont do any action if clicked on show source button
      const eventTarget = event.target;
      if (eventTarget.className.includes('show-source-action')) {
        return;
      }

      const editor = quillRef.current.getEditor();
      const selection = editor.getSelection();
      const currentCursorPosition = editor.getSelection()?.index;
      cursorPositionRef.current = currentCursorPosition;

      if (selection) {
        const selectedText = editor.getText(selection.index, selection.length);
        if (selectedText) {
          selectedTextRef.current = selectedText;
          setShowLinkedEvidenceTooltip(true);
          setLinkedEvidenceTooltipPosition({ x: event.pageX, y: event.pageY });
          cursorPositionRef.current = editor.getSelection()?.index;
        } else {
          resetLinkedEvidenceTooltip();
        }
      } else {
        selectedTextRef.current = '';
      }
    };

    const insertFromClipboard = () => {
      navigator.clipboard
        .readText()
        .then((clipText) => {
          insertText(clipText); // Reuse the insertText function
        })
        .catch((err) => {
          console.error('Failed to read from clipboard', err);
        });
    };

    const copyToClipboard = () => {
      const text = selectedTextRef.current;
      if (text) {
        navigator.clipboard
          .writeText(text)
          .then(() => {})
          .catch((err) => {
            console.error('Failed to copy text to clipboard', err);
          });
      }
    };

    useEffect(() => {
      if (enableDotPhrases) {
        const editor = divRef.current;
        if (editor) {
          editor.addEventListener('contextmenu', handleRightClick);
          editor.addEventListener('mouseover', handleMouseOver);
          editor.addEventListener('mouseout', handleMouseOut);
        }

        return () => {
          if (editor) {
            editor.removeEventListener('contextmenu', handleRightClick);
            editor.removeEventListener('mouseover', handleMouseOver);
            editor.removeEventListener('mouseout', handleMouseOut);
          }
        };
      }
    }, [hoveredElement]);

    useEffect(() => {
      const editor = divRef.current;

      // disabled curently for https://linear.app/insight-health-ai/issue/IH-1339/show-source-ui-ux
      const SHOW_EVIDENCE_ENABLED = false;

      if (editor && SHOW_EVIDENCE_ENABLED) {
        editor.addEventListener('click', handleClickOnEditor, true);
      }

      return () => {
        if (editor) {
          editor.removeEventListener('click', handleClickOnEditor, true);
        }
      };
    }, []);

    useImperativeHandle(ref, () => ({
      getQuillInstance: () => quillRef.current?.getEditor(),
      insertText: (text) => {
        const editor = quillRef.current?.getEditor();
        if (editor) {
          const currentSelection = editor.getSelection();
          if (currentSelection) {
            const selectedText = editor.getText(
              currentSelection.index,
              currentSelection.length
            );
            if (selectedText) {
              if (editor.getText(currentSelection.index - 1, 1) === ' ') {
                editor.deleteText(
                  currentSelection.index - 1,
                  currentSelection.length + 1
                );
                currentSelection.index = currentSelection.index - 1;
              } else {
                editor.deleteText(
                  currentSelection.index,
                  currentSelection.length
                );
              }
            }
          }
          const position = currentSelection
            ? currentSelection.index
            : cursorPositionRef.current ?? editor.getLength();
          editor.insertText(position, text);
          const newPosition = position + text.length;
          editor.setSelection(newPosition, 0);
          editor.focus();
        }
      },
      setFocus: () => {
        const editor = quillRef.current?.getEditor();
        if (editor) {
          editor.focus();
        }
      },
    }));

    return (
      <>
        {showEvidenceSummaryLoading && (
          <div className="absolute top-[35%] left-[35%]">
            {' '}
            <LoadingBar />
          </div>
        )}
        <div
          ref={divRef}
          className={`${showEvidenceSummaryLoading ? 'opacity-50' : ''}`}
        >
          <ReactQuill
            onChangeSelection={handleSelectionChange}
            ref={quillRef}
            theme="snow"
            modules={{ toolbar: [] }}
            formats={[
              'background',
              'bold',
              'color',
              'font',
              'code',
              'italic',
              'link',
              'size',
              'strike',
              'script',
              'blockquote',
              'header',
              'indent',
              'align',
              'direction',
              'code-block',
              'formula',
              'image',
              'video',
            ]}
            value={value}
            onChange={onChange}
            className={className}
            readOnly={readOnly}
          />

          {enableDotPhrases && showDropdown && (
            <Dropdown
              menu={menu}
              open={showDropdown}
              onOpenChange={(visible) => setShowDropdown(visible)}
              trigger={['contextMenu']}
              overlayClassName="custom-dropdown"
              getPopupContainer={() => document.body}
              overlayStyle={{
                position: 'fixed',
                left: `${dropdownPosition.x}px`,
                top: `${dropdownPosition.y}px`,
              }}
            >
              <div></div>
            </Dropdown>
          )}
        </div>
        {/* <AuraEvidenceSourceTooltip
          showLinkedEvidenceTooltip={showLinkedEvidenceTooltip}
          linkedEvidenceTooltipPosition={linkedEvidenceTooltipPosition}
          isEncountersNoteHistoryEnabled={isEncountersNoteHistoryEnabled}
          showEvidenceForSelectedText={showEvidenceForSelectedText}
          resetLinkedEvidenceTooltip={resetLinkedEvidenceTooltip}
        /> */}
        {/* <CopySection
          showCopyTooltip={showCopyTooltip}
          copyTooltipPosition={copyTooltipPosition}
          onMouseOver={handleTooltipMouseOver}
          onMouseLeave={handleTooltipMouseOut}
          encounterId={encounterId}
          copiedSectionText={copiedSectionText}
          copySectionRef={copySectionRef}
        /> */}
      </>
    );
  }
);

export default Editor;
