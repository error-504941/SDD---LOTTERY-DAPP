import React from 'react';
import classes  from './HeaderIcon.module.css'
const HeaderIcon = (props) => {
    return (
        <div className={`${props.className} ${!props.group && classes.globBtn}`} onClick={props.onClick}>
            <i className={`${props.icons} ${classes.sizeIcon} ${props.centerIcon != undefined  && classes.centerIcon}`}></i>
            {props.children}
        </div>
    );
};

export default HeaderIcon;