/* eslint-disable arrow-body-style */
/* Just for dev since I want to keep my console.logs at reach */
import React from 'react';
import PriceCoinDisplay from 'components/PriceCoinDisplay';
import PropTypes from 'prop-types';
import capitalize from 'functions/capitalize';


const CustomTooltip = ({ payload, active }) => {
  // console.log(active);
  if (active) {
    const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    // console.log(payload);
    // console.log(payload[0].dataKey);
    // console.log(payload[0].payload);
    // console.log(payload[0].payload[payload[0].datakey]);
    // const { payload, label } = this.props;
    const date = new Date(payload[0].payload.timestamp);
    return (
      <div className="custom-tooltip">
        <strong>{date.toLocaleDateString('en-GB', dateOptions)}</strong>
        <table>
          <tbody>
            {payload.map((e) => {
              // console.log(e);
              // console.log(e.dataKey);
              // console.log(e.payload[e.dataKey]);

              return (
                <tr key={e.dataKey}>
                  <td>
                    {`${capitalize(e.dataKey)} :`}
                  </td>
                  <td>{`${(e.payload[e.dataKey] / 10000).toFixed(2)}g`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

      </div>
    );
  }

  return null;
};

CustomTooltip.propTypes = {
  payload: PropTypes.arrayOf(PropTypes.object),
  active: PropTypes.bool,
};

CustomTooltip.defaultProps = {
  payload: undefined,
  active: undefined,
};

export default CustomTooltip;
