import React from 'react';
import { connect } from 'react-redux';

const ReagentListItem = (props) => (
    <li className="recipe list-item">
        <div>
        {console.log(props)}
            <ul>
                {props.element.map((item) => (
                    <li>
                        <a
                            href="javascript(void)"
                            data-wowhead={`item=${item}`}
                            key={item}
                        >item</a>
                    </li>
                ))}
            </ul>
        </div>
    </li>
)


export default connect()(ReagentListItem);