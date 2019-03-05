/* eslint-disable jsx-a11y/anchor-is-valid */
/* Important for Wowhead API */
import React from 'react';
import PropTypes from 'prop-types';

const WHLink = ({ blizzardId, name, quantity }) => (
  <a
    href=""
    onClick={e => e.preventDefault()}
    data-wowhead={`item=${blizzardId}`}
  >
    <span>
      {name}
    </span>
    {quantity > 1 && (
      <span className="quantity">
        {`x ${quantity}`}
      </span>
    )}
  </a>
);

WHLink.propTypes = {
  blizzardId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number,
};

WHLink.defaultProps = { quantity: 1 };

export default WHLink;
