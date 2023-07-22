import React from 'react';
import classes from './Range.module.css'
const Range = (props) => {

    return (
        <div className={`${props.classes}`}>
            <input
                type={props.type}
                id={props.id} 
                name={props.name} 
                value={props.value} 
                checked={props.checked} 
                min={props.min}
                max={props.max}
                onChange={props.onChange}/>
            <label className={`${classes['input-btn']}`} htmlFor={props.id}>{props.label || props.children}</label>
        </div>

    );
};

export default Range;