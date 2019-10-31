import React from 'react';

const ModalJob = props => (
  <div
    class="modal fade"
    id="modalFormJob"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalFormJobLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalFormJobLabel">
            {props.formStatus} Job
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
              <label for="name">Name Job</label>
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

            <div className="form-group">
              <label for="category_id">Category</label>
              <select
                name="category_id"
                id="category_id"
                className="form-control"
                onChange={props.inputOnChangeHandler}
                value={props.category_id}
              >
                {/* {props.job.map(job => (
                  <option value="1">{job.category}</option>
                ))} */}
                {props.dataCategory.map(dataCategory => (
                  <option value={Number(dataCategory.id)}>
                    {dataCategory.category}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label for="company_id">Company</label>
              <select
                name="company_id"
                id="company_id"
                className="form-control"
                onChange={props.inputOnChangeHandler}
                value={props.company_id}
              >
                {props.dataCompany.map(dataCompany => (
                  <option value={Number(dataCompany.id)}>
                    {dataCompany.name}
                  </option>
                ))}
                {/* <option value="1">1</option> */}
              </select>
            </div>

            <div className="form-group">
              <label for="salary">Salary</label>
              <input
                type="number"
                name="salary"
                id="salary"
                className="form-control"
                value={props.salary}
                onChange={props.inputOnChangeHandler}
                required
              />
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger btn-raised"
              data-dismiss="modal"
              //   onClick={props.cancelButtonHandler}
            >
              Cancel
            </button>
            <button
              disabled={props.buttonDisabled}
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

export default ModalJob;
