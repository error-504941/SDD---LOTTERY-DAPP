import React, {useState} from 'react';
import classes from './Tools.module.css'
import Range from '../../../components/Input/Range';
const Tools = (props) => {
   
    const getDurationRange = (e) =>{
        props.onDuration(e.target.value);
    }
    const getPriceRange = (e) =>{
        props.onPrice(e.target.value);
    }
    return (
        <div className={`${classes.flex} ${props.disabled ? classes.disabled : null}`} >
        <span className={classes.title}>Range durata lotteria (min)</span>
            <Range
                classes="slider"
                type="range"
                id="range"
                min="5"
                max="60"
                value={props.duration}
                onChange={getDurationRange}
            >
            <span className="output">{props.duration}</span>
            </Range>
            <span className={classes.title}>Range costo biglietto (ETH)</span>
            <Range
                classes="slider"
                type="range"
                id="range"
                min="1"
                max="10"
                value={props.price}
                onChange={getPriceRange}
            >
            <span className="output">{props.price}</span>
        </Range>
        </div>
    );
};

export default Tools;