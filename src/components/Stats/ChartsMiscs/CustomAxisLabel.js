/* eslint-disable arrow-body-style */
/* Just for dev since I want to keep my console.logs at reach */
import React from 'react';
import PriceCoinDisplay from 'components/PriceCoinDisplay';
import PropTypes from 'prop-types';
import capitalize from 'functions/capitalize';


const CustomAxisLabel = (props) => {
  console.log(props);
  console.log(props.value);
  // if (active) {
  //   const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    // console.log(payload);
    // console.log(payload[0].dataKey);
    // console.log(payload[0].payload);
    // console.log(payload[0].payload[payload[0].datakey]);
    // const { payload, label } = this.props;
    // const date = new Date(payload[0].payload.timestamp);
    return (
      <div className="custom-tooltip">

      </div>
    );
  // }

  // return null;
};

// CustomTooltip.propTypes = {
//   payload: PropTypes.arrayOf(PropTypes.object),
//   active: PropTypes.bool,
// };

// CustomTooltip.defaultProps = {
//   payload: undefined,
//   active: undefined,
// };

export default CustomAxisLabel;
