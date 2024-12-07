import { forwardRef } from "react";

const ModalStructure = forwardRef(
  ({ text, modaltitle, icon: Icon, children, btnClr, modalId }, ref) => {
    return (
      <>
        <button
          type="button"
          className={`btn btn-${modaltitle ? "success" : btnClr}`}
          data-bs-toggle="modal"
          data-bs-target={`#${modalId}`}
        >
          <div className="d-flex align-items-center">
            <Icon className={modaltitle ? "" : "icon"} />
            <div>{text}</div>
          </div>
        </button>

        <div
          ref={ref}
          className="modal fade"
          id={`${modalId}`}
          aria-labelledby={`${modalId}Label`}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-start">
              <div className="modal-header">
                <h1 className="modal-title fs-5 text-black" id={`${modalId}Label`}>
                  {modaltitle ? modaltitle : text}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body mutation">{children}</div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

//eslint error - used beacuse of forward ref
ModalStructure.displayName = "ModalStructure";

export default ModalStructure;
