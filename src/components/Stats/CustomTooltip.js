import React from "react";
import PriceCoinDisplay from "components/PriceCoinDisplay"
import PropTypes from 'prop-types';


class CustomTooltip extends React.Component {

  render() {
    const { active } = this.props;

    if (active) {
      const { payload, label } = this.props;
      return (
        <div className="custom-tooltip">
        <PriceCoinDisplay price={this.props.payload[0].payload.value}/>
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
