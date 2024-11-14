import React, { forwardRef, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../style/encounter.scss";
import CopySection from "./CopySection";

const EditorMobile = forwardRef(
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
    const copySectionRef = useRef(null);
    const selectedTextRef = useRef("");
    const [showEvidenceSummaryLoading, setShowEvidenceSummaryLoading] =
      useState(false);
    const [showCopyTooltip, setShowCopyTooltip] = useState(false);
    const [copyTooltipPosition, setCopyTooltipPosition] = useState({
      x: 0,
      y: 0,
    });
    const [copiedSectionText, setCopiedSectionText] = useState("");
    const [hoveredElement, setHoveredElement] = useState(null);

     const handleMouseOver = (event) => {
       const target = event.target;

       // Check if the clicked element is a <strong> tag
       if (target.tagName === "STRONG") {
         setShowCopyTooltip(true);
         setCopyTooltipPosition({ x: event.pageX, y: event.pageY });
         setHoveredElement(target);

         // getting the complete section Text and storing it in state
         const currentText = target.outerHTML;
         const currentPosInValue = value.indexOf(currentText);
         let endingPosition = value.indexOf(
           "<p><strong",
           currentPosInValue - 2
         );

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
        target.tagName === "STRONG" &&
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

    useEffect(() => {
      const editor = divRef.current;
      if (editor) {
        // editor.addEventListener("contextmenu", handleRightClick);
        editor.addEventListener("mouseover", handleMouseOver);
        editor.addEventListener("mouseout", handleMouseOut);
      }

      return () => {
        if (editor) {
          // editor.removeEventListener("contextmenu", handleRightClick);
          editor.removeEventListener("mouseover", handleMouseOver);
          editor.removeEventListener("mouseout", handleMouseOut);
        }
      };
    }, [hoveredElement]);
    return (
      <>
        {/* {showEvidenceSummaryLoading && (
        <div className="absolute top-[35%] left-[35%]">
          {" "}
          <LoadingBar />
        </div>
      )} */}
        <div
          ref={divRef}
          className={`${showEvidenceSummaryLoading ? "opacity-50" : ""}`}
        >
          <ReactQuill
            //   onChangeSelection={handleSelectionChange}
            ref={quillRef}
            theme="snow"
            modules={{ toolbar: [] }}
            formats={[
              "background",
              "bold",
              "color",
              "font",
              "code",
              "italic",
              "link",
              "size",
              "strike",
              "script",
              "blockquote",
              "header",
              "indent",
              "align",
              "direction",
              "code-block",
              "formula",
              "image",
              "video",
            ]}
            value={value}
            onChange={onChange}
            className={className}
            readOnly={readOnly}
          />

          {/* {enableDotPhrases && showDropdown && (
          <Dropdown
            menu={menu}
            open={showDropdown}
            onOpenChange={(visible) => setShowDropdown(visible)}
            trigger={["contextMenu"]}
            overlayClassName="custom-dropdown"
            getPopupContainer={() => document.body}
            overlayStyle={{
              position: "fixed",
              left: `${dropdownPosition.x}px`,
              top: `${dropdownPosition.y}px`,
            }}
          >
            <div></div>
          </Dropdown>
        )} */}
        </div>

        <CopySection
          showCopyTooltip={showCopyTooltip}
          copyTooltipPosition={copyTooltipPosition}
          onMouseOver={handleTooltipMouseOver}
          onMouseLeave={handleTooltipMouseOut}
          encounterId={encounterId}
          copiedSectionText={copiedSectionText}
          copySectionRef={copySectionRef}
        />
      </>
    );
  }
);

export default EditorMobile;
