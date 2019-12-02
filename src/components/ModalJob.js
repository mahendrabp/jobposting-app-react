import React from 'react';
import { Input } from 'reactstrap';
import { connect } from 'react-redux';

const ModalJob = props => (
  <div
    class="modal fade"
    id="modalFormJob"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalFormJobLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="modalFormJobLabel">
            {props.formStatus} Pekerjaan
          </h5>
          <button
            type="button"
            id="closeModalForm"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form onSubmit={props.onSubmitHandler}>
          <div className="modal-body">
            <div className="form-group">
              <label for="name">Nama Pekerjaan</label>
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
              <label for="description">Diskripsi</label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={props.description}
                onChange={props.inputOnChangeHandler}
                required
                minLength="100"
              />
            </div>
            <div className="form-group">
              <label for="location">Lokasi</label>
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
              <label for="category_id">Kategori</label>
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
                  <option value={Number(dataCategory.id)} key={dataCategory.id}>
                    {dataCategory.category}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label for="company_id">Perusahaan</label>
              <select
                name="company_id"
                id="company_id"
                className="form-control"
                onChange={props.inputOnChangeHandler}
                value={props.company_id}
              >
                {props.dataCompany.map(dataCompany => (
                  <option value={Number(dataCompany.id)} key={dataCompany.id}>
                    {dataCompany.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label for="salary">Gaji</label>
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

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger btn-raised"
              data-dismiss="modal"
              onClick={props.cancelButtonHandler}
            >
              Batal
            </button>
            <button
              disabled={props.buttonDisabled}
              type="submit"
              className="btn btn-success btn-raised ml-2"
            >
              Simpan
            </button>
          </div>
          <div>{console.log(props.company.company)}</div>
          {props.addJobInvalid}
        </form>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  company: state.company
});
export default connect(mapStateToProps)(ModalJob);

// export default ModalJob;
