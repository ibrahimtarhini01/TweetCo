import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div className={`rounded-full text-center py-4 `} key={alert.id}>
      <div
        className={`p-2 bg-${alert.alertType}-500 items-center text-${alert.alertType}-100 leading-none rounded-full flex `}
        role='alert'
      >
        <span
          className={`flex rounded-full bg-${alert.alertType}-300 uppercase px-2 py-1 text-xs font-bold mr-3`}
        >
          Error
        </span>
        <span className='font-semibold mr-2 text-left flex-auto'>
          {alert.message}
        </span>
      </div>
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
