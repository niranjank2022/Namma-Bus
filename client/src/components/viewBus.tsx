import React from "react";

export default function ViewBus() {
  return (
    <>
      {/* Button to trigger modal */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#largeModal"
      >
        Open Large Modal
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="largeModal"
        tabIndex={-1}
        aria-labelledby="largeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="largeModalLabel">Large Modal</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h2>Content goes here!</h2>
              <p>This modal takes up most of the screen.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
