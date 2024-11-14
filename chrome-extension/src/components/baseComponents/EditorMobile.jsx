import React, { forwardRef, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../style/encounter.scss";


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
        const [showEvidenceSummaryLoading, setShowEvidenceSummaryLoading] =
          useState(false);
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
    </>
  );
}
);

export default EditorMobile;
