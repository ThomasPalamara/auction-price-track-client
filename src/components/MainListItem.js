import React from 'react';
import { selectRecipe } from '../actions/recipes'

class MainListItem extends React.Component {
    componentDidUpdate(){
    }
    render() {
        return (
            <li
                className={`recipe list-item ${this.props.active ? 'active' : ''} `}
                onClick={() => this.props.dispatch(selectRecipe(this.props.element))}
            >
                <div className={this.props.element.isCustom ? 'generalBg' : this.props.element.professions[0] + 'Bg'}>
                    {this.props.element.craft &&
                        <h6>
                            <a
                                href="javascript:(void)"
                                data-wowhead={`item=${this.props.element.craft.blizzardId}`}
                            >{this.props.element.craft.name}</a>
                        </h6>
                    }

                    <ul>
                        {this.props.element.reagents.map((reagent) => (
                            <li key={reagent.blizzardId}>
                                <a
                                    href="javascript:(void)"
                                    data-wowhead={`item=${reagent.blizzardId}`}
                                >{reagent.name}</a>
                            </li>
                        ))
                        }
                    </ul>
                </div>
            </li>)
    }
};

export default MainListItem;