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
            {props.formStatus} Add Job
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
              />
            </div>

            {/* <div class="form-group">
              <label for="image_file">Image</label>
              <input
                type="file"
                class="form-control-file"
                name="image_file"
                id="image_file"
                onChange={props.inputFileOnChangeHandler}
              />
              <small class="text-muted">
                The file must be an image in jpg, jpeg, png, or gif format.
              </small>
            </div> */}

            <div className="form-group">
              <label for="category_id">Category</label>
              <select
                name="category_id"
                id="category_id"
                className="form-control"
                onChange={props.inputOnChangeHandler}
                value={props.category_id}
              >
                <option value="1">1</option>
                <option value="2">2</option>
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
                <option value="1">1</option>
                <option value="2">2</option>
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
              />
            </div>

            {/* <div className="form-group">
              <label for="stock">Stock</label>
              <input
                type="number"
                name="stock"
                id="stock"
                className="form-control"
                value={props.stock}
                onChange={props.inputOnChangeHandler}
              />
            </div> */}
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
              type="submit"
              class="btn btn-success btn-raised ml-2"
              disabled={props.buttonDisabled}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default ModalJob;

// import React from 'react';

// const ModalJob = props => (
//   <div
//     class="modal fade"
//     id="modalFormJob"
//     tabindex="-1"
//     role="dialog"
//     aria-labelledby="modalFormJobLabel"
//     aria-hidden="true"
//   >
//     <div class="modal-dialog" role="document">
//       <div class="modal-content">
//         <div class="modal-header">
//           <h5 class="modal-title" id="modalFormJobLabel">
//             {props.formStatus} Product Item
//           </h5>
//           <button
//             type="button"
//             id="closeModalForm"
//             class="close"
//             data-dismiss="modal"
//             aria-label="Close"
//           >
//             <span aria-hidden="true">&times;</span>
//           </button>
//         </div>
//         <form onSubmit={props.onSubmitHandler}>
//           <div class="modal-body">
//             <div className="form-group">
//               <label for="name">Name</label>

//               <input
//                 type="text"
//                 name="name"
//                 id="name"
//                 className="form-control"
//                 value={props.name}
//                 onChange={props.inputOnChangeHandler}
//               />
//             </div>
//           </div>

//           <div class="modal-footer">
//             <button
//               type="button"
//               class="btn btn-danger btn-raised"
//               data-dismiss="modal"
//               //   onClick={props.cancelButtonHandler}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               class="btn btn-primary btn-raised ml-2"
//               //   disabled={props.buttonDisabled}
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   </div>
// );

// export default ModalJob;
