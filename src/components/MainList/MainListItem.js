import React from 'react';
import { connect } from 'react-redux'
import { selectRecipe } from '../../actions/recipes'
import WHLink from '../WHLink'

class MainListItem extends React.Component {
    render() {
        return (
            <li
                className={`recipe list-item ${this.props.active ? 'active' : ''} `}
                onClick={() => this.props.dispatch(selectRecipe(this.props.element))}
            >
                <div className={this.props.element.isCustom ? 'generalBg' : this.props.element.professions[0] + 'Bg'}>
                    {this.props.element.craft &&
                        <h6>
                            <WHLink {...this.props.element.craft}/>
                        </h6>
                    }

                    <ul>
                        {this.props.element.reagents.map((reagent) => (
                            <li key={reagent.blizzardId}>
                                <WHLink {...reagent}/>
                            </li>
                        ))
                        }
                    </ul>
                </div>
            </li>)
    }
};
  
export default connect()(MainListItem);