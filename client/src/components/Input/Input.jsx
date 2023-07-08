import React from 'react';
import classes from './Input.module.css'
const Input = (props) => {
    return (
        <div className={classes.input}>
            <input 
                type="radio" 
                id={props.id} 
                name={props.name} 
                value={props.value} 
                checked={props.checked} 
                onChange={props.onChange}/>
            <label className={`${classes['input-btn']}`} htmlFor={props.id}>{props.label}</label>
        </div>

    );
};

export default Input;