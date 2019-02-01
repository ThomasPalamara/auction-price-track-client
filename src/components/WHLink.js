import React from 'react';

const WHLink = (props) => (
        <a
            href=""
            onClick={e=>e.preventDefault()}
            data-wowhead={`item=${props.blizzardId}`}
        ><span>{props.name}</span>{props.quantity>1 && <span className="quantity">x{props.quantity}</span>}</a>
);

export default WHLink;