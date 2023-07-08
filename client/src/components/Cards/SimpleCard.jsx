import React from 'react';

import classes from './SimpleCard.module.css';

const SimpleCard = (props) => {
  return (

          <div 
              onClick={props.onClick}
              className={`${classes.card} ${props.className ? props.className : ''}`} 
              data-label={props.title}>
            <h3 className={classes['card__header']}>
              {props.title}
              {props.icons && <i className={props.icons} style={{  
                position: "relative",
                left: "15px"}} ></i>}
            </h3>
            {props.children}
        </div>
  );
};

export default SimpleCard;
