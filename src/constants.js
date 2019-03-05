/* eslint-disable import/prefer-default-export */
/* Disabled until more constants */
import PropTypes from 'prop-types';

export const apiURL = 'https://auction-price-track-server.herokuapp.com/api';

export const recipePropTypes = PropTypes.shape({
  professions: PropTypes.arrayOf(PropTypes.string),
  isCustom: PropTypes.bool,
  type: PropTypes.string,
  craft: PropTypes.shape({
    blizzardId: PropTypes.number,
    quantity: PropTypes.number,
    name: PropTypes.string,
    name_fr: PropTypes.string,
  }),
  reagents: PropTypes.arrayOf(PropTypes.shape({
    blizzardId: PropTypes.number,
    quantity: PropTypes.number,
    name: PropTypes.string,
    name_fr: PropTypes.string,
  })),
});
