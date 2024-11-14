/* eslint-disable react/prop-types */
// import { showToastError } from '../../../../utilities/errortoast';
// import { showToastInfo, showToastSuccess } from '../../../../utilities/toast';
import { CopiesIcon } from '../../icons';
import { showToastError } from '../../utilities/errortoast';
import { showToastInfo, showToastSuccess } from '../../utilities/toast';

const CopySection = ({
  showCopyTooltip,
  copyTooltipPosition,
  onMouseOver,
  onMouseLeave,
  copiedSectionText,
  encounterId = null,
  copySectionRef,
}) => {
  if (!showCopyTooltip) {
    return null;
  }
  const handleClick = () => {
    // analytics.track(
    //   'Clicked Copy Section In Aura Encounters In Visit Section',
    //   {
    //     transcription: encounterId,
    //   }
    // );

    if (!copiedSectionText || copiedSectionText?.trim() === '') {
      showToastInfo('No data available to copy');
      return;
    }

    try {
      const medicalConversation =
        typeof copiedSectionText === 'string'
          ? copiedSectionText
              ?.replace(/<p>/g, '')
              .replace(/```/g, '')
              .replace(/<\/p>/g, '\n')
              .replace(/<strong style="color: rgb\(0, 208, 145\);">/g, '| ')
              .replace(/<\/strong>/g, '')
              .replace(/<strong>/g, '')
              .replace(/<br>/g, '\n')
              .replace(/\n\n+/g, '\n\n') // Remove leading whitespace before '|' character
              .replace(/^\|+/gm, '')
              .trim()
          : copiedSectionText;

      const tempElement = document.createElement('div');
      tempElement.innerHTML = medicalConversation;
      document.body.appendChild(tempElement);
      const range = document.createRange();
      range.selectNode(tempElement);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      document.body.removeChild(tempElement);
      showToastSuccess('Copied to clipboard');
    } catch (error) {
      console.error('Error copying medical notes:', error);
      showToastError('Failed to copy medical notes');
    }
  };

  return (
    <span
      // eslint-disable-next-line react/no-unknown-property
      overlayClassName="custom-tooltip copy-tooltip"
      className="copy-tooltip flex cursor-pointer shadow-lg linked-evidence-float-button bg-[#00D090] hover:bg-[#059669] font-normal p-3 rounded-xl focus:outline-none focus:shadow-outline z-50"
      style={{
        position: 'fixed',
        left: `${copyTooltipPosition?.x - 2}px`,
        top: `${copyTooltipPosition?.y - 8}px`,
      }}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
      ref={copySectionRef}
    >
      <CopiesIcon /> <span className="text-white text-[12px]">Copy Section</span>
    </span>
  );
};

export default CopySection;
