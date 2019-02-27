import React from "react";
import PropTypes from 'prop-types';

const PriceCoinDisplay = (props) => {
    return(
    <div>
        <span>{props.price.toString().slice(0, -4).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} <i className="money-icon gold" /> </span>
        <span>{props.price.toString().slice(-4, -2)} <i className="money-icon silver" /> </span>
        <span>{props.price.toString().slice(-2)} <i className="money-icon copper" /> </span>
    </div>
)};

PriceCoinDisplay.propTypes = {
    price: PropTypes.number.isRequired,
  }

export default PriceCoinDisplay;