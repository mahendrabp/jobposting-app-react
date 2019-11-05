import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getJobRedux } from '../redux/action/job';
class ButtonRedux extends Component {
  getData = () => {
    this.props.dispatch(
      getJobRedux({
        search: 'front',
        page: '1',
        limit: '5',
        location: '',
        sortby: '',
        orderby: ''
      })
    );
  };
  render() {
    return (
      <>
        <button onClick={this.getData}>GET DATA</button>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    job: state.job
  };
};
export default connect(mapStateToProps)(ButtonRedux);
