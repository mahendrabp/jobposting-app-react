import React from 'react';

const ModalCompany = props => (
  <div
    class="modal fade"
    id="modalFormCompany"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalFormCompanyLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalFormCompanyLabel">
            {props.formStatus} Company
          </h5>
          <button
            type="button"
            id="closeModalForm"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form onSubmit={props.onSubmitHandler}>
          <div class="modal-body">
            <div className="form-group">
              <label for="name">Name Company</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                value={props.name}
                onChange={props.inputOnChangeHandler}
                required
              />
            </div>

            <div className="form-group">
              <label for="description">Description</label>
              <input
                type="text"
                name="description"
                id="description"
                className="form-control"
                value={props.description}
                onChange={props.inputOnChangeHandler}
                required
                minLength="100"
              />
            </div>
            <div className="form-group">
              <label for="location">Location</label>
              <input
                type="text"
                name="location"
                id="location"
                className="form-control"
                value={props.location}
                onChange={props.inputOnChangeHandler}
                required
              />
            </div>

            <div class="form-group">
              <label for="logo">Logo</label>
              <input
                type="file"
                class="form-control-file"
                name="logo"
                id="logo"
                onChange={props.inputFileOnChangeHandler}
                required
              />
              <small class="text-muted">
                File must be an image in jpg, jpeg, or png format
              </small>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger btn-raised"
              data-dismiss="modal"
              onClick={props.cancelButtonHandler}
            >
              Cancel
            </button>
            <button
              // disabled={props.buttonDisabled}
              type="submit"
              class="btn btn-success btn-raised ml-2"
            >
              Save
            </button>
          </div>

          {props.addJobInvalid}
        </form>
      </div>
    </div>
  </div>
);

export default ModalCompany;
