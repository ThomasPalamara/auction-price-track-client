import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectRecipe } from '../../actions/recipes';
import WHLink from '../WHLink';
import { recipePropTypes } from '../../constants';

// TODO Maybe dispatching should be done in MainList via a prop function pushing the element up.
// This way no need to connect this componenet just for the dispatch function. Need to decide if it would be useful or not.
const MainListItem = ({ element, active, dispatch }) => (
  <li
    role="button"
    className={`recipe list-item ${active ? 'active' : ''} `}
    onClick={() => dispatch(selectRecipe(element))}
    onKeyDown={e => (e.keycode === 13 ? dispatch(selectRecipe(element)) : '')}
  >
    <div className={element.isCustom ? 'generalBg' : `${element.professions[0]}Bg`}>
      <i className={`professionIcon ${element.professions[0]}Icon`} />
      {element.craft && (
        <h6>
          <WHLink {...element.craft} />
        </h6>
      )}

      <ul>
        {element.reagents.map(reagent => (
          <li key={reagent.blizzardId}>
            <WHLink {...reagent} />
          </li>
        ))
        }
      </ul>
    </div>
  </li>
);

MainListItem.propTypes = {
  active: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  element: recipePropTypes.isRequired,
};

export default connect()(MainListItem);
