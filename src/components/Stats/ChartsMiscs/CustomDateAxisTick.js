/* eslint-disable arrow-body-style */
/* Just for dev since I want to keep my console.logs at reach */
import React from 'react';
import PropTypes from 'prop-types';


const CustomAxisLabel = (props) => {
  const { x, y, payload } = props;
  // if (active) {
  //   const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  // console.log(payload);
  // console.log(payload[0].dataKey);
  // console.log(payload[0].payload);
  // console.log(payload[0].payload[payload[0].datakey]);
  // const { payload, label } = this.props;
  // const date = new Date(payload[0].payload.timestamp);
  const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'};
  const date = new Date(payload.value);
  console.log(payload);
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={0} textAnchor="end" fill="#666">{date.toLocaleDateString('en-GB', dateOptions)}</text>
    </g>
  );
  // }

  // return null;
};

CustomAxisLabel.propTypes = {
  payload: PropTypes.arrayOf(PropTypes.object),
};

CustomAxisLabel.defaultProps = {
  payload: undefined,
};

export default CustomAxisLabel;
