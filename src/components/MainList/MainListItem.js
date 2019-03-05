import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectRecipe } from '../../actions/recipes';
import WHLink from '../WHLink';
import { recipePropTypes } from '../../constants';

const MainListItem = ({ element, active, dispatch }) => (
  <li
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
    role="button"
    className={`recipe list-item ${active ? 'active' : ''} `}
    onClick={() => dispatch(selectRecipe(element))}
    onKeyDown={e => (e.keycode !== 13 ? e.preventDefault() : '')}
  >
    <div className={element.isCustom ? 'generalBg' : `${element.professions[0]}Bg`}>
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
