import React from "react";
import PriceCoinDisplay from "components/PriceCoinDisplay"
import PropTypes from 'prop-types';


class CustomTooltip extends React.Component {

  render() {
    
    const { active } = this.props;
console.log(active);
    if (active) {
      const { payload } = this.props;
    console.log(payload);
      console.log(payload[0].dataKey);
// console.log(payload[0].payload);
// console.log(payload[0].payload[payload[0].datakey]);
      // const { payload, label } = this.props;
      return (
        <div className="custom-tooltip">
        <PriceCoinDisplay price={payload[0].payload[payload[0].dataKey]}/>
        </div>
      );
    }

    return null;
  }
};

CustomTooltip.propTypes = {
  payload: PropTypes.array,
  label: PropTypes.string,
}

export default CustomTooltip;
//<PriceCoinDisplay price={payload[0].payload[payload[0].datakey]}/>